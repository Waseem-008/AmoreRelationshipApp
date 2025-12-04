import SwiftUI
import Supabase

@main
struct AmoraApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .onOpenURL { url in
                    handleDeepLink(url)
                }
                .task {
                    // Request notification permissions
                    _ = await NotificationService.shared.requestAuthorization()
                    
                    // Schedule notifications if authorized
                    NotificationService.shared.scheduleDailyReminder()
                    NotificationService.shared.scheduleWeekendExerciseReminder()
                }
        }
    }
    
    private func handleDeepLink(_ url: URL) {
        // Handle amora://pair?code=XXXXXX
        guard url.scheme == "amora",
              url.host == "pair",
              let components = URLComponents(url: url, resolvingAgainstBaseURL: true),
              let code = components.queryItems?.first(where: { $0.name == "code" })?.value else {
            return
        }
        
        // Pair with the code
        Task {
            try? await DataService.shared.pairWithCode(code)
            await appState.checkAuth()
        }
    }
}

// App State - Main state container
@MainActor
class AppState: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    
    let authService: AuthService
    let dataService: DataService
    
    init() {
        self.authService = AuthService.shared
        self.dataService = DataService.shared
        
        Task {
            await checkAuth()
        }
    }
    
    func checkAuth() async {
        do {
            let session = try await authService.getSession()
            isAuthenticated = session != nil
        } catch {
            isAuthenticated = false
        }
    }
}
