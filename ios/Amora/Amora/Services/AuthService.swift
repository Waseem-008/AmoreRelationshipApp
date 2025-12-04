import Foundation
import Supabase

class AuthService {
    static let shared = AuthService()
    
    private let supabase: SupabaseClient
    
    private init() {
        // Replace with your Supabase credentials
        self.supabase = SupabaseClient(
            supabaseURL: URL(string: "YOUR_SUPABASE_URL")!,
            supabaseKey: "YOUR_SUPABASE_ANON_KEY"
        )
    }
    
    func signUp(email: String, password: String) async throws -> Session {
        let response = try await supabase.auth.signUp(email: email, password: password)
        guard let session = response.session else {
            throw NSError(domain: "AuthService", code: 1, userInfo: [NSLocalizedDescriptionKey: "No session returned"])
        }
        return session
    }
    
    func signIn(email: String, password: String) async throws -> Session {
        let response = try await supabase.auth.signIn(email: email, password: password)
        return response.session
    }
    
    func signOut() async throws {
        try await supabase.auth.signOut()
    }
    
    func getSession() async throws -> Session? {
        return try await supabase.auth.session
    }
    
    func getCurrentUser() async throws -> Supabase.User? {
        return try await supabase.auth.session?.user
    }
}
