import SwiftUI

struct IntakeFormView: View {
    @Environment(\.dismiss) var dismiss
    @StateObject private var viewModel = IntakeFormViewModel()
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    Text("Help us understand your relationship better")
                        .font(.headline)
                        .foregroundColor(.primary)
                } header: {
                    Text("Getting Started")
                }
                
                // Question 1: Relationship Length
                Section("How long have you been together?") {
                    Picker("Duration", selection: $viewModel.relationshipLength) {
                        Text("Less than 6 months").tag("0-6 months")
                        Text("6 months - 1 year").tag("6-12 months")
                        Text("1-3 years").tag("1-3 years")
                        Text("3-5 years").tag("3-5 years")
                        Text("5+ years").tag("5+ years")
                    }
                    .pickerStyle(.menu)
                }
                
                // Question 2: Living Situation
                Section("Do you live together?") {
                    Picker("Living Situation", selection: $viewModel.livingTogether) {
                        Text("Yes").tag(true)
                        Text("No").tag(false)
                    }
                    .pickerStyle(.segmented)
                }
                
                // Question 3: Main Challenges
                Section("What are your main relationship challenges?") {
                    ForEach(IntakeFormViewModel.challengeOptions, id: \.self) { challenge in
                        MultiSelectRow(
                            title: challenge,
                            isSelected: viewModel.challenges.contains(challenge)
                        ) {
                            if viewModel.challenges.contains(challenge) {
                                viewModel.challenges.removeAll { $0 == challenge }
                            } else {
                                viewModel.challenges.append(challenge)
                            }
                        }
                    }
                }
                
                // Question 4: Goals
                Section("What are you hoping to achieve?") {
                    TextEditor(text: $viewModel.goals)
                        .frame(minHeight: 80)
                }
                
                // Question 5: Conflict Style
                Section("How do you typically handle conflicts?") {
                    Picker("Conflict Style", selection: $viewModel.conflictStyle) {
                        Text("Avoid/withdraw").tag("avoid")
                        Text("Discuss calmly").tag("discuss")
                        Text("Get heated/argue").tag("argue")
                        Text("Seek compromise").tag("compromise")
                        Text("Varies").tag("varies")
                    }
                    .pickerStyle(.menu)
                }
                
                // Question 6: Communication Patterns
                Section("How often do you have deep conversations?") {
                    Picker("Frequency", selection: $viewModel.deepConversationFrequency) {
                        Text("Daily").tag("daily")
                        Text("Few times a week").tag("weekly")
                        Text("Weekly").tag("once-week")
                        Text("Rarely").tag("rarely")
                    }
                    .pickerStyle(.menu)
                }
                
                // Question 7: Recent Positive Moment
                Section("Share a recent positive moment together") {
                    TextEditor(text: $viewModel.positiveMemory)
                        .frame(minHeight: 80)
                }
                
                // Question 8: Connection Definition
                Section("What does feeling connected mean to you?") {
                    TextEditor(text: $viewModel.connectionDefinition)
                        .frame(minHeight: 80)
                }
                
                // Question 9: Emotional Support
                Section("How supported do you feel emotionally?") {
                    Picker("Support Level", selection: $viewModel.emotionalSupport) {
                        ForEach(1...10, id: \.self) { level in
                            Text("\(level)").tag(level)
                        }
                    }
                    .pickerStyle(.segmented)
                }
                
                // Question 10: Time Together
                Section("How much quality time do you spend together per week?") {
                    Picker("Hours", selection: $viewModel.qualityTimeHours) {
                        Text("Less than 5 hours").tag("0-5")
                        Text("5-10 hours").tag("5-10")
                        Text("10-20 hours").tag("10-20")
                        Text("20+ hours").tag("20+")
                    }
                    .pickerStyle(.menu)
                }
                
                Section {
                    Button(action: submitIntake) {
                        if viewModel.isSubmitting {
                            ProgressView()
                        } else {
                            Text("Complete Setup")
                                .fontWeight(.semibold)
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .disabled(viewModel.isSubmitting || !viewModel.isValid)
                }
            }
            .navigationTitle("Tell Us About You")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
    
    private func submitIntake() {
        Task {
            let success = await viewModel.submit()
            if success {
                dismiss()
            }
        }
    }
}

struct MultiSelectRow: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Text(title)
                    .foregroundColor(.primary)
                Spacer()
                Image(systemName: isSelected ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(isSelected ? Color(hex: "FF6B9D") : .gray)
            }
        }
    }
}
