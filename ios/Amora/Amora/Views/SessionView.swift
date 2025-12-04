import SwiftUI

struct SessionView: View {
    @StateObject private var viewModel: SessionViewModel
    @Environment(\.dismiss) var dismiss
    
    init() {
        _viewModel = StateObject(wrappedValue: SessionViewModel())
    }
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: [Color(hex: "1a1a2e"), Color(hex: "16213e")],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            VStack(spacing: 40) {
                // Header
                VStack(spacing: 8) {
                    Text("Today's Session")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                    
                    // Timer
                    Text(viewModel.timerDisplay)
                        .font(.system(size: 48, weight: .bold, design: .rounded))
                        .foregroundColor(.white)
                        .monospacedDigit()
                }
                .padding(.top, 60)
                
                Spacer()
                
                // Waveform / Status Display
                if viewModel.isRecording {
                    WaveformView(amplitude: viewModel.audioLevel)
                        .frame(height: 200)
                        .padding(.horizontal, 40)
                } else {
                    Image(systemName: "waveform")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 100)
                        .foregroundColor(.white.opacity(0.3))
                }
                
                Spacer()
                
                // Mode Indicator
                if viewModel.mode == .chat {
                    HStack {
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.orange)
                        Text("Switched to chat mode")
                            .foregroundColor(.white)
                            .font(.subheadline)
                    }
                    .padding()
                    .background(Color.orange.opacity(0.2))
                    .cornerRadius(12)
                }
                
                // Controls
                VStack(spacing: 20) {
                    if viewModel.mode == .voice {
                        // Voice Controls
                        Button(action: { viewModel.toggleRecording() }) {
                            ZStack {
                                Circle()
                                    .fill(viewModel.isRecording ? Color.red : Color(hex: "FF6B9D"))
                                    .frame(width: 80, height: 80)
                                
                                Image(systemName: viewModel.isRecording ? "stop.fill" : "mic.fill")
                                    .font(.system(size: 30))
                                    .foregroundColor(.white)
                            }
                        }
                        
                        Text(viewModel.isRecording ? "Tap to pause" : "Tap to speak")
                            .foregroundColor(.white.opacity(0.7))
                            .font(.subheadline)
                    } else {
                        // Chat Input
                        HStack {
                            TextField("Type your message...", text: $viewModel.chatInput)
                                .textFieldStyle(.roundedBorder)
                            
                            Button(action: viewModel.sendChatMessage) {
                                Image(systemName: "paperplane.fill")
                                    .foregroundColor(.white)
                                    .padding(12)
                                    .background(Color(hex: "FF6B9D"))
                                    .clipShape(Circle())
                            }
                            .disabled(viewModel.chatInput.isEmpty)
                        }
                        .padding(.horizontal)
                    }
                    
                    // End Session Button
                    Button(action: { viewModel.endSession() }) {
                        Text("End Session")
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.white.opacity(0.2))
                            .cornerRadius(12)
                    }
                    .padding(.horizontal)
                }
                .padding(.bottom, 40)
            }
        }
        .navigationBarHidden(true)
        .onAppear {
            Task {
                await viewModel.startSession()
            }
        }
        .alert("Session Complete", isPresented: $viewModel.showSummary) {
            Button("Done") {
                dismiss()
            }
        } message: {
            Text(viewModel.sessionSummary ?? "Great session! See you tomorrow.")
        }
    }
}

struct WaveformView: View {
    let amplitude: CGFloat
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(0..<40) { index in
                RoundedRectangle(cornerRadius: 4)
                    .fill(Color(hex: "FF6B9D"))
                    .frame(width: 4)
                    .frame(height: calculateHeight(for: index))
                    .animation(.easeInOut(duration: 0.3), value: amplitude)
            }
        }
    }
    
    private func calculateHeight(for index: Int) -> CGFloat {
        let base: CGFloat = 20
        let variation = amplitude * CGFloat.random(in: 0.5...1.0) * 100
        return base + variation
    }
}
