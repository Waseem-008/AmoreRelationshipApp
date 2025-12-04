import Foundation
import AVFoundation

/// Service to handle OpenAI Realtime API voice streaming
/// Manages WebSocket connection, audio capture, and playback
@MainActor
class RealtimeVoiceService: NSObject, ObservableObject {
    @Published var isConnected = false
    @Published var isRecording = false
    @Published var errorMessage: String?
    
    private var webSocketTask: URLSessionWebSocketTask?
    private var audioEngine: AVAudioEngine?
    private var audioPlayer: AVAudioPlayerNode?
    
    private let sessionId: String
    private let clientSecret: String
    
    init(sessionId: String, clientSecret: String) {
        self.sessionId = sessionId
        self.clientSecret = clientSecret
        super.init()
    }
    
    // MARK: - Connection
    
    func connect() async throws {
        // OpenAI Realtime API WebSocket endpoint
        let url = URL(string: "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01")!
        
        var request = URLRequest(url: url)
        request.setValue("Bearer \(clientSecret)", forHTTPHeaderField: "Authorization")
        request.setValue("realtime=v1", forHTTPHeaderField: "OpenAI-Beta")
        
        let session = URLSession(configuration: .default)
        webSocketTask = session.webSocketTask(with: request)
        webSocketTask?.resume()
        
        isConnected = true
        
        // Start listening for messages
        Task {
            await receiveMessages()
        }
    }
    
    func disconnect() {
        webSocketTask?.cancel(with: .goingAway, reason: nil)
        stopRecording()
        isConnected = false
    }
    
    // MARK: - Audio Capture
    
    func startRecording() async throws {
        guard !isRecording else { return }
        
        // Request microphone permission
        let permission = await AVAudioApplication.requestRecordPermission()
        guard permission else {
            errorMessage = "Microphone permission denied"
            return
        }
        
        // Setup audio engine
        audioEngine = AVAudioEngine()
        guard let audioEngine = audioEngine else { return }
        
        let inputNode = audioEngine.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { [weak self] buffer, _ in
            Task { @MainActor in
                await self?.sendAudioChunk(buffer: buffer)
            }
        }
        
        try audioEngine.start()
        isRecording = true
    }
    
    func stopRecording() {
        audioEngine?.stop()
        audioEngine?.inputNode.removeTap(onBus: 0)
        isRecording = false
    }
    
    // MARK: - WebSocket Communication
    
    private func sendAudioChunk(buffer: AVAudioPCMBuffer) async {
        guard let webSocketTask = webSocketTask else { return }
        
        // Convert audio buffer to Data (PCM16)
        guard let channelData = buffer.floatChannelData else { return }
        let frameLength = Int(buffer.frameLength)
        var audioData = Data()
        
        for i in 0..<frameLength {
            let sample = Int16(channelData[0][i] * Float(Int16.max))
            withUnsafeBytes(of: sample.littleEndian) { audioData.append(contentsOf: $0) }
        }
        
        // Send as base64 JSON message
        let message: [String: Any] = [
            "type": "input_audio_buffer.append",
            "audio": audioData.base64EncodedString()
        ]
        
        guard let jsonData = try? JSONSerialization.data(withJSONObject: message),
              let jsonString = String(data: jsonData, encoding: .utf8) else { return }
        
        do {
            try await webSocketTask.send(.string(jsonString))
        } catch {
            print("Error sending audio: \(error)")
        }
    }
    
    private func receiveMessages() async {
        guard let webSocketTask = webSocketTask else { return }
        
        do {
            while isConnected {
                let message = try await webSocketTask.receive()
                
                switch message {
                case .string(let text):
                    handleMessage(text)
                case .data(let data):
                    if let text = String(data: data, encoding: .utf8) {
                        handleMessage(text)
                    }
                @unknown default:
                    break
                }
            }
        } catch {
            print("WebSocket error: \(error)")
            isConnected = false
        }
    }
    
    private func handleMessage(_ text: String) {
        guard let data = text.data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let type = json["type"] as? String else { return }
        
        switch type {
        case "response.audio.delta":
            // Audio chunk from AI
            if let audioDelta = json["delta"] as? String,
               let audioData = Data(base64Encoded: audioDelta) {
                playAudioChunk(audioData)
            }
            
        case "response.done":
            // Response complete
            print("Response complete")
            
        case "error":
            if let error = json["error"] as? [String: Any],
               let message = error["message"] as? String {
                errorMessage = message
            }
            
        default:
            break
        }
    }
    
    // MARK: - Audio Playback
    
    private func playAudioChunk(_ data: Data) {
        // Play audio using AVAudioPlayer or AVAudioEngine
        // Implementation would convert PCM16 data to playable format
        // For MVP, this is a simplified placeholder
    }
}
