import SwiftUI

struct ReflectionView: View {
    let exercise: WeeklyExercise
    @Environment(\.dismiss) var dismiss
    @StateObject private var viewModel = ReflectionViewModel()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Exercise Details
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Image(systemName: "sparkles")
                                .foregroundColor(Color(hex: "FF6B9D"))
                            Text("This Week's Exercise")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                        
                        Text(exercise.title)
                            .font(.title2)
                            .fontWeight(.bold)
                        
                        Text(exercise.description)
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    
                    // Reflection Questions
                    VStack(alignment: .leading, spacing: 20) {
                        Text("Reflection")
                            .font(.title3)
                            .fontWeight(.semibold)
                        
                        // Question 1
                        VStack(alignment: .leading, spacing: 8) {
                            Text("How did it go?")
                                .font(.headline)
                            
                            TextEditor(text: $viewModel.howItWent)
                                .frame(minHeight: 100)
                                .padding(8)
                                .background(Color(.systemGray6))
                                .cornerRadius(8)
                        }
                        
                        // Question 2
                        VStack(alignment: .leading, spacing: 8) {
                            Text("What did you learn or notice?")
                                .font(.headline)
                            
                            TextEditor(text: $viewModel.whatLearned)
                                .frame(minHeight: 100)
                                .padding(8)
                                .background(Color(.systemGray6))
                                .cornerRadius(8)
                        }
                        
                        // Question 3
                        VStack(alignment: .leading, spacing: 8) {
                            Text("How did your partner respond?")
                                .font(.headline)
                            
                            TextEditor(text: $viewModel.partnerResponse)
                                .frame(minHeight: 100)
                                .padding(8)
                                .background(Color(.systemGray6))
                                .cornerRadius(8)
                        }
                        
                        // Rating
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Overall, how was the experience?")
                                .font(.headline)
                            
                            HStack(spacing: 12) {
                                ForEach(1...5, id: \.self) { rating in
                                    Button(action: { viewModel.rating = rating }) {
                                        Image(systemName: rating <= viewModel.rating ? "star.fill" : "star")
                                            .font(.title2)
                                            .foregroundColor(rating <= viewModel.rating ? Color(hex: "FF6B9D") : .gray)
                                    }
                                }
                            }
                        }
                    }
                    
                    // Submit Button
                    Button(action: submitReflection) {
                        if viewModel.isSubmitting {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Text("Submit Reflection")
                                .fontWeight(.semibold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(
                        LinearGradient(
                            colors: [Color(hex: "FF6B9D"), Color(hex: "C06C84")],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .foregroundColor(.white)
                    .cornerRadius(12)
                    .disabled(viewModel.isSubmitting || !viewModel.isValid)
                }
                .padding()
            }
            .navigationTitle("Weekly Reflection")
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
    
    private func submitReflection() {
        Task {
            let success = await viewModel.submit()
            if success {
                dismiss()
            }
        }
    }
}

struct ReflectionView_Previews: PreviewProvider {
    static var previews: some View {
        ReflectionView(exercise: WeeklyExercise(
            id: "ex_001",
            title: "The Gratitude Walk",
            description: "Take a 15-minute walk together without phones.",
            instructions: "Share 3 things you appreciate."
        ))
    }
}
