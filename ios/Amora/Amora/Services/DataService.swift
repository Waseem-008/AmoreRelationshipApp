import Foundation
import Supabase

class DataService {
    static let shared = DataService()
    
    private let supabase: SupabaseClient
    
    private init() {
        self.supabase = SupabaseClient(
            supabaseURL: URL(string: "YOUR_SUPABASE_URL")!,
            supabaseKey: "YOUR_SUPABASE_ANON_KEY"
        )
    }
    
    // MARK: - User Operations
    
    func getCurrentUserProfile() async throws -> User {
        let user = try await AuthService.shared.getCurrentUser()
        guard let userId = user?.id else {
            throw NSError(domain: "DataService", code: 1, userInfo: [NSLocalizedDescriptionKey: "No user ID"])
        }
        
        let response: User = try await supabase
            .from("users")
            .select()
            .eq("id", value: userId.uuidString)
            .single()
            .execute()
            .value
        
        return response
    }
    
    func updateUserProfile(intakeData: [String: Any]?, intakeCompleted: Bool? = nil) async throws {
        let user = try await AuthService.shared.getCurrentUser()
        guard let userId = user?.id else { throw NSError(domain: "DataService", code: 1) }
        
        var updates: [String: Any] = [:]
        if let intakeData = intakeData {
            updates["intake_data"] = intakeData
        }
        if let intakeCompleted = intakeCompleted {
            updates["intake_completed"] = intakeCompleted
        }
        
        try await supabase
            .from("users")
            .update(updates)
            .eq("id", value: userId.uuidString)
            .execute()
    }
    
    // MARK: - Pairing
    
    func generatePairingCode() async throws -> String {
        let code = String(format: "%06d", Int.random(in: 0...999999))
        let user = try await AuthService.shared.getCurrentUser()
        guard let userId = user?.id else { throw NSError(domain: "DataService", code: 1) }
        
        try await supabase
            .from("users")
            .update(["pairing_code": code])
            .eq("id", value: userId.uuidString)
            .execute()
        
        return code
    }
    
    func pairWithCode(_ code: String) async throws {
        let response = try await supabase.functions.invoke(
            "pair_users",
            options: FunctionInvokeOptions(body: ["code": code])
        )
        // Handle response
    }
    
    // MARK: - Sessions
    
    func startSession() async throws -> (sessionId: UUID, openAISession: [String: Any]) {
        let response = try await supabase.functions.invoke("start_session")
        
        // Parse response
        guard let data = response.data,
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let sessionIdString = json["session_id"] as? String,
              let sessionId = UUID(uuidString: sessionIdString),
              let openAISession = json["openai_session"] as? [String: Any]
        else {
            throw NSError(domain: "DataService", code: 2, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
        }
        
        return (sessionId, openAISession)
    }
    
    func endSession(sessionId: UUID, transcript: String, summary: String) async throws {
        try await supabase.functions.invoke(
            "process_memory",
            options: FunctionInvokeOptions(body: [
                "session_id": sessionId.uuidString,
                "transcript": transcript,
                "summary": summary
            ])
        )
    }
    
    // MARK: - Couple Data
    
    func getCoupleData() async throws -> Couple? {
        let userProfile = try await getCurrentUserProfile()
        guard let coupleId = userProfile.coupleId else { return nil }
        
        let response: Couple = try await supabase
            .from("couples")
            .select()
            .eq("id", value: coupleId.uuidString)
            .single()
            .execute()
            .value
        
        return response
    }
}
