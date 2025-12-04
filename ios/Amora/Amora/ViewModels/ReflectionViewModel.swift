import Foundation

@MainActor
class ReflectionViewModel: ObservableObject {
    @Published var howItWent = ""
    @Published var whatLearned = ""
    @Published var partnerResponse = ""
    @Published var rating = 0
    @Published var isSubmitting = false
    @Published var errorMessage: String?
    
    var isValid: Bool {
        !howItWent.isEmpty && 
        !whatLearned.isEmpty && 
        !partnerResponse.isEmpty &&
        rating > 0
    }
    
    func submit() async -> Bool {
        isSubmitting = true
        errorMessage = nil
        
        do {
            let reflectionText = """
            How it went: \(howItWent)
            
            What I learned: \(whatLearned)
            
            Partner's response: \(partnerResponse)
            
            Rating: \(rating)/5
            """
            
            // Get user profile to find couple_id
            let userProfile = try await DataService.shared.getCurrentUserProfile()
            
            // Insert reflection into database
            // This would use Supabase client directly or a new DataService method
            // For now, we'll use a placeholder
            
            // In production:
            // try await DataService.shared.submitReflection(
            //     coupleId: userProfile.coupleId,
            //     text: reflectionText,
            //     rating: rating
            // )
            
            isSubmitting = false
            return true
        } catch {
            errorMessage = error.localizedDescription
            isSubmitting = false
            return false
        }
    }
}
