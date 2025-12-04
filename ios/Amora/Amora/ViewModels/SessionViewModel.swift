import Foundation
import Combine

enum SessionMode {
    case voice
    case chat
}

@MainActor
class SessionViewModel: ObservableObject {
    @Published var isRecording = false
    @Published var mode: SessionMode = .voice
    @Published var timerDisplay = "00:00"
    @Published var audioLevel: CGFloat = 0.0
    @Published var chatInput = ""
    @Published var showSummary = false
    @Published var sessionSummary: String?
    
    private var sessionId: UUID?
    private var voiceService: RealtimeVoiceService?
    private var startTime: Date?
    private var timer: Timer?
    private var elapsedSeconds = 0
    
    private let maxDuration = 15 * 60 // 15 minutes in seconds
    
    func startSession() async {
        do {
            // Call backend to initialize session
            let (sessionId, openAISession) = try await DataService.shared.startSession()
            self.sessionId = sessionId
            
            // Initialize voice service
            if let clientSecret = openAISession["client_secret"] as? String {
                voiceService = RealtimeVoiceService(
                    sessionId: sessionId.uuidString,
                    clientSecret: clientSecret
                )
                
                try await voiceService?.connect()
            }
            
            // Start timer
            startTime = Date()
            startTimer()
            
        } catch {
            print("Error starting session: \(error)")
            // Fallback to chat mode
            switchToChatMode()
        }
    }
    
    func toggleRecording() {
        guard mode == .voice else { return }
        
        Task {
            if isRecording {
                voiceService?.stopRecording()
            } else {
                try? await voiceService?.startRecording()
            }
            isRecording.toggle()
        }
    }
    
    func sendChatMessage() {
        guard !chatInput.isEmpty else { return }
        
        // In a full implementation, this would send to a text-based completion endpoint
        // For MVP, we'll simulate it
        chatInput = ""
    }
    
    func endSession() {
        timer?.invalidate()
        voiceService?.disconnect()
        
        // Show summary
        Task {
            // In production, get real summary from backend
            sessionSummary = "Thank you for sharing today. We talked about your communication patterns and upcoming plans together."
            showSummary = true
            
            // Submit to backend
            if let sessionId = sessionId {
                try? await DataService.shared.endSession(
                    sessionId: sessionId,
                    transcript: "Session transcript...",
                    summary: sessionSummary ?? ""
                )
            }
        }
    }
    
    private func switchToChatMode() {
        mode = .chat
        isRecording = false
    }
    
    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            guard let self = self else { return }
            
            self.elapsedSeconds += 1
            self.updateTimerDisplay()
            
            // Warnings
            if self.elapsedSeconds == 12 * 60 {
                // 12 minute warning
                print("Soft warning: 12 minutes")
            } else if self.elapsedSeconds == 14 * 60 {
                // 14 minute warning
                print("Soft warning: 14 minutes")
            } else if self.elapsedSeconds >= self.maxDuration {
                // Hard cutoff at 15 minutes
                self.endSession()
            }
            
            // Simulate audio level (in production, get from RealtimeVoiceService)
            if self.isRecording {
                self.audioLevel = CGFloat.random(in: 0.3...0.9)
            } else {
                self.audioLevel = 0.0
            }
        }
    }
    
    private func updateTimerDisplay() {
        let minutes = elapsedSeconds / 60
        let seconds = elapsedSeconds % 60
        timerDisplay = String(format: "%02d:%02d", minutes, seconds)
    }
    
    deinit {
        timer?.invalidate()
    }
}
