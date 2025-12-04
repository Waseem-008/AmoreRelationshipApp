import SwiftUI

@MainActor
class HomeViewModel: ObservableObject {
    @Published var dailyCompleted = false
    @Published var partnerCompleted = false
    @Published var personalStreak = 0
    @Published var sharedStreak = 0
    @Published var weeklyExercise: WeeklyExercise?
    @Published var isLoading = false
    
    private let dataService = DataService.shared
    
    func loadData() async {
        isLoading = true
        
        do {
            // Load user profile
            let userProfile = try await dataService.getCurrentUserProfile()
            personalStreak = userProfile.streakCount
            
            // Check if session completed today
            if let completedAt = userProfile.dailyCompletedAt {
                let calendar = Calendar.current
                dailyCompleted = calendar.isDateInToday(completedAt)
            }
            
            // Load couple data
            if let couple = try await dataService.getCoupleData() {
                sharedStreak = couple.sharedStreakWeeks
                weeklyExercise = couple.weeklyExercise
                
                // Check partner's completion (would need to query their user record)
                // Simplified for MVP
                partnerCompleted = false
            }
        } catch {
            print("Error loading data: \(error)")
        }
        
        isLoading = false
    }
}
