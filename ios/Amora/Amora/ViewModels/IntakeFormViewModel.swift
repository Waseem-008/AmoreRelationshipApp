import Foundation

@MainActor
class IntakeFormViewModel: ObservableObject {
    @Published var relationshipLength = "1-3 years"
    @Published var livingTogether = false
    @Published var challenges: [String] = []
    @Published var goals = ""
    @Published var conflictStyle = "discuss"
    @Published var deepConversationFrequency = "weekly"
    @Published var positiveMemory = ""
    @Published var connectionDefinition = ""
    @Published var emotionalSupport = 7
    @Published var qualityTimeHours = "10-20"
    
    @Published var isSubmitting = false
    @Published var errorMessage: String?
    
    static let challengeOptions = [
        "Communication",
        "Trust",
        "Intimacy",
        "Quality time",
        "Financial stress",
        "Different goals",
        "Conflict resolution",
        "Work-life balance"
    ]
    
    var isValid: Bool {
        !goals.isEmpty && 
        !positiveMemory.isEmpty && 
        !connectionDefinition.isEmpty &&
        !challenges.isEmpty
    }
    
    func submit() async -> Bool {
        isSubmitting = true
        errorMessage = nil
        
        do {
            let intakeData: [String: Any] = [
                "relationship_length": relationshipLength,
                "living_together": livingTogether,
                "challenges": challenges,
                "goals": goals,
                "conflict_style": conflictStyle,
                "deep_conversation_frequency": deepConversationFrequency,
                "positive_memory": positiveMemory,
                "connection_definition": connectionDefinition,
                "emotional_support": emotionalSupport,
                "quality_time_hours": qualityTimeHours,
                "completed_at": ISO8601DateFormatter().string(from: Date())
            ]
            
            try await DataService.shared.updateUserProfile(
                intakeData: intakeData,
                intakeCompleted: true
            )
            
            isSubmitting = false
            return true
        } catch {
            errorMessage = error.localizedDescription
            isSubmitting = false
            return false
        }
    }
}
