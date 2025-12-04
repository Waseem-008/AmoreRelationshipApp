import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var appState: AppState
    @State private var pairingCode: String?
    @State private var showingPairInput = false
    
    var body: some View {
        NavigationView {
            List {
                Section("Account") {
                    if let email = appState.currentUser?.email {
                        HStack {
                            Text("Email")
                            Spacer()
                            Text(email)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                
                Section("Pairing") {
                    if pairingCode != nil {
                        HStack {
                            Text("Your Pairing Code")
                            Spacer()
                            Text(pairingCode!)
                                .font(.system(.title3, design: .monospaced))
                                .fontWeight(.bold)
                        }
                    } else {
                        Button("Generate Pairing Code") {
                            generateCode()
                        }
                    }
                    
                    Button("Enter Partner's Code") {
                        showingPairInput = true
                    }
                }
                
                Section {
                    Button("Sign Out", role: .destructive) {
                        signOut()
                    }
                }
            }
            .navigationTitle("Profile")
            .sheet(isPresented: $showingPairInput) {
                PairingInputView()
            }
        }
    }
    
    private func generateCode() {
        Task {
            do {
                pairingCode = try await DataService.shared.generatePairingCode()
            } catch {
                print("Error generating code: \(error)")
            }
        }
    }
    
    private func signOut() {
        Task {
            try? await appState.authService.signOut()
            await appState.checkAuth()
        }
    }
}

struct PairingInputView: View {
    @Environment(\.dismiss) var dismiss
    @State private var code = ""
    @State private var isLoading = false
    @State private var errorMessage: String?
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                Image(systemName: "link")
                    .resizable()
                    .frame(width: 60, height: 60)
                    .foregroundColor(Color(hex: "FF6B9D"))
                
                Text("Enter your partner's pairing code")
                    .font(.title3)
                    .multilineTextAlignment(.center)
                
                TextField("000000", text: $code)
                    .font(.system(.title, design: .monospaced))
                    .multilineTextAlignment(.center)
                    .keyboardType(.numberPad)
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding(.horizontal)
                
                if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .font(.caption)
                }
                
                Button(action: pair) {
                    if isLoading {
                        ProgressView()
                    } else {
                        Text("Pair")
                            .fontWeight(.semibold)
                    }
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color(hex: "FF6B9D"))
                .foregroundColor(.white)
                .cornerRadius(12)
                .padding(.horizontal)
                .disabled(isLoading || code.count != 6)
                
                Spacer()
            }
            .padding()
            .navigationTitle("Pair with Partner")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
    
    private func pair() {
        isLoading = true
        errorMessage = nil
        
        Task {
            do {
                try await DataService.shared.pairWithCode(code)
                dismiss()
            } catch {
                errorMessage = error.localizedDescription
            }
            isLoading = false
        }
    }
}
