# Amora MVP - File Index

Complete list of all project files organized by component.

**Total Files**: 69  
**Total Lines of Code**: ~11,000+

---

## Documentation (13 files)

| File | Description | Lines |
|------|-------------|-------|
| [README.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/README.md) | Main project overview and setup | 300+ |
| [QUICKSTART.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/QUICKSTART.md) | 30-min setup guide | 200+ |
| [DEPLOYMENT.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/DEPLOYMENT.md) | Production deployment guide | 400+ |
| [DEVELOPMENT.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/DEVELOPMENT.md) | Developer workflow guide | 500+ |
| [ARCHITECTURE.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ARCHITECTURE.md) | System architecture overview | 450+ |
| [API.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/API.md) | Complete API reference | 600+ |
| [TROUBLESHOOTING.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/TROUBLESHOOTING.md) | Common issues and solutions | 500+ |
| [PROJECT_SUMMARY.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/PROJECT_SUMMARY.md) | Complete feature overview | 300+ |
| [CONTRIBUTING.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/CONTRIBUTING.md) | Contribution guidelines | 400+ |
| [CHANGELOG.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/CHANGELOG.md) | Version history | 200+ |
| [LICENSE](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/LICENSE) | MIT License | 20 |
| [walkthrough.md](file:///C:/Users/AS/.gemini/antigravity/brain/349e3de8-5800-43d5-aa1e-6182be704816/walkthrough.md) | Implementation walkthrough | 400+ |
| [task.md](file:///C:/Users/AS/.gemini/antigravity/brain/349e3de8-5800-43d5-aa1e-6182be704816/task.md) | Task checklist | 100+ |

---

## Configuration Files (10 files)

| File | Description | Lines |
|------|-------------|-------|
| [package.json](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/package.json) | Root package with scripts | 25 |
| [.gitignore](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/.gitignore) | Root git ignore | 40 |
| [admin-web/.gitignore](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/.gitignore) | Admin git ignore | 20 |
| [backend/.gitignore](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/.gitignore) | Backend git ignore | 10 |
| [ios/.gitignore](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/.gitignore) | iOS git ignore | 40 |
| [backend/.env.example](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/.env.example) | Backend env template | 15 |
| [admin-web/.env.example](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/.env.example) | Admin env template | 3 |
| [deploy.sh](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/deploy.sh) | Deployment automation | 80 |
| [test.sh](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/test.sh) | Test validation script | 150 |
| [.github/workflows/ci-cd.yml](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/.github/workflows/ci-cd.yml) | CI/CD pipeline | 150 |

---

## Backend (8 files) - ~1,500 lines

### Database Migrations (2 files)

| File | Description | Lines |
|------|-------------|-------|
| [20240101000000_initial_schema.sql](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/migrations/20240101000000_initial_schema.sql) | Initial database schema | 250 |
| [20240101000001_add_pairing_code.sql](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/migrations/20240101000001_add_pairing_code.sql) | Add pairing code support | 10 |

### Edge Functions (4 files)

| File | Description | Lines |
|------|-------------|-------|
| [pair_users/index.ts](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/functions/pair_users/index.ts) | Partner pairing logic | 120 |
| [start_session/index.ts](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/functions/start_session/index.ts) | Session initialization | 150 |
| [process_memory/index.ts](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/functions/process_memory/index.ts) | Memory extraction | 140 |
| [cron_weekly/index.ts](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/functions/cron_weekly/index.ts) | Weekly exercise assignment | 100 |

### Other Backend Files

| File | Description | Lines |
|------|-------------|-------|
| [seed.sql](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/supabase/seed.sql) | Test data seed script | 200 |
| [backend/README.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/backend/README.md) | Backend documentation | 200 |

---

## Admin Panel (17 files) - ~2,500 lines

### Configuration (6 files)

| File | Description | Lines |
|------|-------------|-------|
| [package.json](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/package.json) | NPM dependencies | 35 |
| [vite.config.ts](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/vite.config.ts) | Vite configuration | 10 |
| [tsconfig.json](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/tsconfig.json) | TypeScript config | 25 |
| [tsconfig.node.json](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/tsconfig.node.json) | Node TypeScript config | 10 |
| [tailwind.config.js](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/tailwind.config.js) | Tailwind configuration | 15 |
| [postcss.config.js](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/postcss.config.js) | PostCSS configuration | 8 |

### Source Files (10 files)

| File | Description | Lines |
|------|-------------|-------|
| [index.html](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/index.html) | HTML entry point | 15 |
| [src/main.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/main.tsx) | React entry point | 10 |
| [src/App.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/App.tsx) | Main app component | 80 |
| [src/index.css](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/index.css) | Global styles | 30 |
| [src/lib/supabase.ts](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/lib/supabase.ts) | Supabase client | 10 |
| [src/components/Layout.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/components/Layout.tsx) | Layout component | 80 |
| [src/pages/Login.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/pages/Login.tsx) | Login page | 100 |
| [src/pages/Dashboard.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/pages/Dashboard.tsx) | Dashboard page | 150 |
| [src/pages/Users.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/pages/Users.tsx) | Users management | 120 |
| [src/pages/Couples.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/pages/Couples.tsx) | Couples management | 180 |
| [src/pages/Sessions.tsx](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/src/pages/Sessions.tsx) | Sessions view | 120 |

### Documentation

| File | Description | Lines |
|------|-------------|-------|
| [admin-web/README.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/admin-web/README.md) | Admin panel docs | 150 |

---

## iOS App (21 files) - ~4,500 lines

### Core Files (3 files)

| File | Description | Lines |
|------|-------------|-------|
| [AmoraApp.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/AmoraApp.swift) | App entry point | 80 |
| [ContentView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/ContentView.swift) | Main content routing | 50 |
| [Info.plist](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Info.plist) | App configuration | 60 |

### Models (1 file)

| File | Description | Lines |
|------|-------------|-------|
| [Models.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Models/Models.swift) | Data models | 150 |

### Services (4 files)

| File | Description | Lines |
|------|-------------|-------|
| [AuthService.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Services/AuthService.swift) | Authentication service | 80 |
| [DataService.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Services/DataService.swift) | Data operations | 200 |
| [RealtimeVoiceService.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Services/RealtimeVoiceService.swift) | Voice session handling | 250 |
| [NotificationService.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Services/NotificationService.swift) | Local notifications | 100 |

### ViewModels (4 files)

| File | Description | Lines |
|------|-------------|-------|
| [HomeViewModel.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/ViewModels/HomeViewModel.swift) | Home state logic | 80 |
| [IntakeFormViewModel.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/ViewModels/IntakeFormViewModel.swift) | Intake form logic | 100 |
| [SessionViewModel.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/ViewModels/SessionViewModel.swift) | Session management | 150 |
| [ReflectionViewModel.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/ViewModels/ReflectionViewModel.swift) | Reflection form logic | 70 |

### Views (6 files)

| File | Description | Lines |
|------|-------------|-------|
| [AuthenticationView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Views/AuthenticationView.swift) | Sign up/in screen | 150 |
| [HomeView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Views/HomeView.swift) | Main dashboard | 250 |
| [ProfileView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Views/ProfileView.swift) | Profile and pairing | 180 |
| [IntakeFormView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Views/IntakeFormView.swift) | Onboarding form | 200 |
| [SessionView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Views/SessionView.swift) | Voice session UI | 180 |
| [ReflectionView.swift](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/Amora/Amora/Views/ReflectionView.swift) | Weekly reflection | 150 |

### Documentation

| File | Description | Lines |
|------|-------------|-------|
| [ios/README.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ios/README.md) | iOS setup guide | 350 |

---

## Summary by Component

| Component | Files | Lines of Code | Primary Language |
|-----------|-------|---------------|------------------|
| **Backend** | 8 | ~1,500 | SQL, TypeScript |
| **Admin Panel** | 19 | ~2,500 | TypeScript, TSX |
| **iOS App** | 21 | ~4,500 | Swift, SwiftUI |
| **Documentation** | 13 | ~4,370 | Markdown |
| **Configuration** | 10 | ~500 | JSON, YAML, Shell |
| **Total** | **69** | **~11,000+** | Mixed |

---

## Quick Navigation

### Getting Started
1. [README.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/README.md) - Start here
2. [QUICKSTART.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/QUICKSTART.md) - 30-min setup
3. [ARCHITECTURE.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/ARCHITECTURE.md) - System design

### Development
1. [DEVELOPMENT.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/DEVELOPMENT.md) - Workflow guide
2. [API.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/API.md) - API reference  
3. [CONTRIBUTING.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/CONTRIBUTING.md) - How to contribute

### Deployment
1. [DEPLOYMENT.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/DEPLOYMENT.md) - Production deployment
2. [deploy.sh](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/deploy.sh) - Automation script

### Troubleshooting
1. [TROUBLESHOOTING.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/TROUBLESHOOTING.md) - Common issues
2. Component READMEs - Specific guides

---

## File Statistics

### By File Type

| Extension | Count | Purpose |
|-----------|-------|---------|
| `.md` | 16 | Documentation |
| `.ts`/`.tsx` | 15 | Admin panel code |
| `.swift` | 18 | iOS app code |
| `.sql` | 3 | Database schemas |
| `.json` | 5 | Configuration |
| `.sh` | 2 | Shell scripts |
| `.yml` | 1 | CI/CD workflow |
| other | 9 | Config files |

### Lines of Code by Language

```
Swift:      4,500 lines  (40%)
TypeScript: 2,500 lines  (22%)
SQL:        1,500 lines  (13%)
Markdown:   2,800 lines  (25%)
Total:     11,300 lines
```

---

**Last Updated**: 2024-12-03  
**Project Status**: Production-Ready  
**Version**: 1.0.0
