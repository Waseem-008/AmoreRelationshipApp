import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var viewModel = HomeViewModel()
    @State private var showSessionView = false
    @State private var showReflectionView = false
    @State private var showIntakeForm = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 8) {
                        Text("Today")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                        
                        Text(Date().formatted(date: .long, time: .omitted))
                            .foregroundColor(.secondary)
                    }
                    .padding(.top, 20)
                    
                    // Session Status Card
                    SessionStatusCard(
                        completed: viewModel.dailyCompleted,
                        partnerCompleted: viewModel.partnerCompleted
                    ) {
                        showSessionView = true
                    }
                    
                    // Streak Card
                    StreakCard(
                        personalStreak: viewModel.personalStreak,
                        sharedStreak: viewModel.sharedStreak
                    )
                    
                    // Weekly Exercise Card
                    if let exercise = viewModel.weeklyExercise {
                        WeeklyExerciseCard(exercise: exercise) {
                            showReflectionView = true
                        }
                    }
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationBarHidden(true)
        }
        .sheet(isPresented: $showSessionView) {
            SessionView()
        }
        .sheet(isPresented: $showReflectionView) {
            if let exercise = viewModel.weeklyExercise {
                ReflectionView(exercise: exercise)
            }
        }
        .sheet(isPresented: $showIntakeForm) {
            IntakeFormView()
        }
        .task {
            await viewModel.loadData()
            
            // Show intake form if not completed
            if let user = try? await DataService.shared.getCurrentUserProfile(),
               !user.intakeCompleted {
                showIntakeForm = true
            }
        }
    }
}

struct SessionStatusCard: View {
    let completed: Bool
    let partnerCompleted: Bool
    let onStart: () -> Void
    
    var body: some View {
        VStack(spacing: 16) {
            if completed {
                VStack(spacing: 8) {
                    Image(systemName: "checkmark.circle.fill")
                        .resizable()
                        .frame(width: 60, height: 60)
                        .foregroundColor(.green)
                    
                    Text("Session Complete")
                        .font(.title2)
                        .fontWeight(.semibold)
                    
                    Text("Come back tomorrow")
                        .foregroundColor(.secondary)
                }
                .padding(32)
            } else {
                Button(action: onStart) {
                    VStack(spacing: 12) {
                        Image(systemName: "mic.fill")
                            .resizable()
                            .frame(width: 50, height: 60)
                        
                        Text("Start Today's Session")
                            .font(.title3)
                            .fontWeight(.semibold)
                        
                        Text("10-15 minutes")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(32)
                    .foregroundColor(.white)
                    .background(
                        LinearGradient(
                            colors: [Color(hex: "FF6B9D"), Color(hex: "C06C84")],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .cornerRadius(20)
                }
            }
            
            // Partner Status
            HStack(spacing: 20) {
                StatusBadge(
                    label: "You",
                    completed: completed
                )
                StatusBadge(
                    label: "Partner",
                    completed: partnerCompleted
                )
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(20)
        .shadow(color: .black.opacity(0.1), radius: 10)
    }
}

struct StatusBadge: View {
    let label: String
    let completed: Bool
    
    var body: some View {
        HStack {
            Image(systemName: completed ? "checkmark.circle.fill" : "circle")
                .foregroundColor(completed ? .green : .gray)
            Text(label)
                .foregroundColor(.secondary)
        }
    }
}

struct StreakCard: View {
    let personalStreak: Int
    let sharedStreak: Int
    
    var body: some View {
        HStack(spacing: 32) {
            VStack {
                Text("\(personalStreak)")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(Color(hex: "FF6B9D"))
                
                Text("Your Streak")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Divider()
            
            VStack {
                Text("\(sharedStreak)")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(Color(hex: "C06C84"))
                
                Text("Shared Weeks")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(20)
        .shadow(color: .black.opacity(0.1), radius: 10)
    }
}

struct WeeklyExerciseCard: View {
    let exercise: WeeklyExercise
    let onReflect: () -> Void
    
    var body: some View {
        Button(action: onReflect) {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Image(systemName: "sparkles")
                        .foregroundColor(Color(hex: "FF6B9D"))
                    Text("This Week's Exercise")
                        .font(.headline)
                        .foregroundColor(.primary)
                }
                
                Text(exercise.title)
                    .font(.title3)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
                
                Text(exercise.description)
                    .foregroundColor(.secondary)
                    .font(.subheadline)
                
                HStack {
                    Spacer()
                    Text("Tap to reflect")
                        .font(.caption)
                        .foregroundColor(Color(hex: "FF6B9D"))
                    Image(systemName: "arrow.right.circle.fill")
                        .foregroundColor(Color(hex: "FF6B9D"))
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(Color(.systemBackground))
            .cornerRadius(20)
            .shadow(color: .black.opacity(0.1), radius: 10)
        }
        .buttonStyle(.plain)
    }
}
