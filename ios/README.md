# Amora iOS App

Native iOS application for Amora relationship wellness platform.

## Requirements

- Xcode 15.0+
- iOS 17.0+
- Swift 5.9+
- Supabase account
- OpenAI API key (configured in backend)

## Features

### ✅ Implemented

- **Authentication**
  - Email/password sign up and sign in
  - Secure session management with Supabase Auth
  
- **Partner Pairing**
  - 6-digit code generation
  - Deep link support (`amora://pair?code=XXXXXX`)
  - Automatic pairing via code entry
  
- **Onboarding**
  - Comprehensive 10-question intake form
  - Personal and relationship data collection
  - Automatic memory initialization
  
- **Daily Sessions**
  - Voice-first UI with waveform visualization
  - OpenAI Realtime API integration
  - Automatic fallback to chat mode
  - 15-minute timer with soft warnings
  - Session summary display
  
- **Weekly Exercises**
  - Exercise assignment from backend
  - Reflection form with multiple questions
  - Rating system
  - Progress tracking
  
- **Home Dashboard**
  - Daily session status
  - Partner completion indicator
  - Personal and shared streak counters
  - Weekly exercise card
  
- **Notifications**
  - Local daily reminders (customizable time)
  - Weekend exercise reminders
  - Permission handling

## Setup Instructions

### 1. Install Dependencies

This project uses Swift Package Manager. Dependencies will be automatically resolved when you open the project in Xcode.

**Required Packages**:
- [supabase-swift](https://github.com/supabase-community/supabase-swift) - Supabase client for iOS

### 2. Configure Credentials

Update Supabase credentials in both service files:

**`Services/AuthService.swift`**:
```swift
self.supabase = SupabaseClient(
    supabaseURL: URL(string: "https://YOUR_PROJECT.supabase.co")!,
    supabaseKey: "YOUR_ANON_KEY"
)
```

**`Services/DataService.swift`**:
```swift
self.supabase = SupabaseClient(
    supabaseURL: URL(string: "https://YOUR_PROJECT.supabase.co")!,
    supabaseKey: "YOUR_ANON_KEY"
)
```

### 3. Configure App Settings

**Bundle Identifier**: Update in Xcode project settings
- Target → General → Bundle Identifier
- Example: `com.yourcompany.amora`

**Team & Signing**: 
- Target → Signing & Capabilities
- Select your Apple Developer team
- Enable "Automatically manage signing"

### 4. Permissions

Already configured in `Info.plist`:
- ✅ Microphone access for voice sessions
- ✅ Deep linking with `amora://` scheme
- ✅ Background audio capability

### 5. Build and Run

1. Open `Amora.xcodeproj` in Xcode
2. Select a simulator or connected device
3. Press ⌘R to build and run

## Architecture

### MVVM Pattern

```
Views/
├── AuthenticationView.swift      # Sign in/up
├── HomeView.swift                # Main dashboard
├── ProfileView.swift             # User profile & pairing
├── IntakeFormView.swift          # Onboarding questions
├── SessionView.swift             # Voice session UI
└── ReflectionView.swift          # Weekly reflection

ViewModels/
├── HomeViewModel.swift           # Home state management
├── IntakeFormViewModel.swift     # Form validation & submission
├── SessionViewModel.swift        # Session lifecycle & timer
└── ReflectionViewModel.swift     # Reflection form logic

Services/
├── AuthService.swift             # Authentication
├── DataService.swift             # Database operations
├── RealtimeVoiceService.swift    # OpenAI WebSocket
└── NotificationService.swift     # Local notifications

Models/
└── Models.swift                  # Data structures
```

### State Management

- **AppState**: Global app state (authentication, current user)
- **@StateObject**: View-owned state (ViewModels)
- **@EnvironmentObject**: Injected dependencies
- **@Published**: Reactive property updates

## Key Flows

### 1. First-Time User Flow
```
Sign Up → Intake Form → Home (unpaired) → Generate Code → Wait for Partner
```

### 2. Partner Pairing
```
User A: Generate Code → Share with Partner
User B: Enter Code (or tap deep link) → Paired!
```

### 3. Daily Session
```
Home → Start Session → Voice Recording → AI Conversation → Summary → Done
```

### 4. Weekly Exercise
```
Friday: Exercise Assigned → Weekend: Complete Together → Monday: Submit Reflection
```

## Deep Linking

The app supports deep links for pairing:

**Format**: `amora://pair?code=XXXXXX`

**Usage**:
1. User A generates a code
2. Share link via SMS, email, or QR code
3. User B taps link on iPhone
4. App opens and automatically pairs

**Testing in Simulator**:
```bash
xcrun simctl openurl booted "amora://pair?code=123456"
```

## Notifications

### Daily Session Reminder
- Default: 7:00 PM daily
- Customizable in future settings screen

### Weekend Exercise Reminder  
- Saturday 10:00 AM weekly
- Reminds to complete exercise

### Permission Handling
Requested automatically on first launch. If denied:
- Settings → Amora → Notifications → Enable

## Testing Checklist

- [ ] Sign up new user
- [ ] Complete intake form
- [ ] Generate pairing code
- [ ] Pair with test account
- [ ] Start voice session
- [ ] Test timer (observe 15-min cutoff)
- [ ] Test chat fallback
- [ ] View weekly exercise
- [ ] Submit reflection
- [ ] Verify streaks update
- [ ] Test deep link pairing
- [ ] Verify notifications appear

## Known Limitations (MVP)

- No audio recording storage
- Simplified chat mode (no full chat UI)
- No settings screen (notifications hardcoded)
- No profile editing after intake
- No unpair function in app (admin only)

## Next Steps

For production readiness:
1. Add settings screen (notification times, account management)
2. Implement proper error handling and retry logic
3. Add loading states for all async operations
4. Implement proper WebSocket reconnection
5. Add analytics events
6. Add Sentry for crash reporting
7. Localization support
8. Accessibility labels and VoiceOver support
9. UI polish and animations
10. Comprehensive testing suite

## Troubleshooting

**Build Errors**:
- Clean build folder: ⇧⌘K
- Delete derived data
- Restart Xcode

**Supabase Connection Issues**:
- Verify URL and anon key
- Check backend is deployed
- Test with Postman first

**Voice Not Working**:
- Check microphone permissions
- Test on real device (simulator has limitations)
- Verify OpenAI API key in backend

**Deep Links Not Working**:
- Reinstall app
- Verify URL scheme in Info.plist
- Check Associated Domains (if using universal links)

## Support

- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Supabase Swift SDK](https://github.com/supabase-community/supabase-swift)
- [OpenAI Realtime Docs](https://platform.openai.com/docs/guides/realtime)
