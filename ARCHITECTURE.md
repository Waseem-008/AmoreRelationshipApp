# Amora MVP - Architecture Overview

This document provides a comprehensive view of the system architecture.

## System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        iOS["iOS App<br/>(SwiftUI)"]
        Admin["Admin Panel<br/>(React)"]
    end
    
    subgraph "Backend Layer - Supabase"
        Auth["Supabase Auth<br/>(Email/Password)"]
        Database["PostgreSQL<br/>+ pgvector"]
        Functions["Edge Functions<br/>(Deno)"]
        Storage["Storage<br/>(Optional)"]
    end
    
    subgraph "External Services"
        OpenAI["OpenAI API<br/>(GPT-4o Realtime)"]
        Embeddings["OpenAI Embeddings<br/>(text-embedding-3-small)"]
    end
    
    iOS -->|HTTPS| Auth
    iOS -->|HTTPS| Database
    iOS -->|HTTPS| Functions
    Admin -->|HTTPS| Auth
    Admin -->|HTTPS| Database
    
    Functions -->|API| OpenAI
    Functions -->|API| Embeddings
    Functions <-->|SQL| Database
    
    style iOS fill:#FF6B9D
    style Admin fill:#4A90E2
    style Database fill:#3ECF8E
    style OpenAI fill:#74AA9C
```

## Data Flow Diagrams

### Daily Session Flow

```mermaid
sequenceDiagram
    participant User as iOS App
    participant Auth as Supabase Auth
    participant Func as Edge Function
    participant DB as Database
    participant AI as OpenAI Realtime
    
    User->>Auth: Authenticate
    Auth-->>User: JWT Token
    
    User->>Func: POST /start_session
    Func->>DB: Fetch user profile & memory
    DB-->>Func: Memory context
    Func->>AI: Create realtime session
    AI-->>Func: Session ID + Client Secret
    Func-->>User: Session details
    
    User->>AI: WebSocket connection
    loop Voice Interaction
        User->>AI: Audio chunks
        AI-->>User: AI response audio
    end
    
    User->>Func: POST /process_memory
    Func->>AI: Extract memories from transcript
    AI-->>Func: Structured memories
    Func->>AI: Generate embeddings
    AI-->>Func: Vector embeddings
    Func->>DB: Store memories + embeddings
    DB-->>Func: Success
    Func-->>User: Session complete
```

### Partner Pairing Flow

```mermaid
sequenceDiagram
    participant A as User A (iOS)
    participant B as User B (iOS)
    participant Auth as Supabase Auth
    participant Func as pair_users Function
    participant DB as Database
    
    A->>Auth: Sign up
    Auth-->>A: Account created
    
    A->>DB: Generate pairing code
    DB-->>A: Code: 123456
    A->>B: Share code (SMS/Link)
    
    B->>Auth: Sign up
    Auth-->>B: Account created
    
    B->>Func: POST /pair_users<br/>{code: "123456"}
    Func->>DB: Find User A by code
    DB-->>Func: User A details
    Func->>DB: Create couple record
    DB-->>Func: Couple ID
    Func->>DB: Update both users
    DB-->>Func: Success
    Func-->>B: Pairing complete
    
    Note over A,B: Both users now see<br/>each other's status
```

## Database Schema

```mermaid
erDiagram
    USERS ||--o{ SESSIONS : has
    USERS ||--o| COUPLES : "partner in"
    COUPLES ||--o{ SESSIONS : "shared"
    COUPLES ||--o{ EXERCISE_REFLECTIONS : has
    USERS ||--o{ MEMORY_ENTRIES : "creates personal"
    COUPLES ||--o{ MEMORY_ENTRIES : "creates shared"
    USERS ||--o{ ANALYTICS_EVENTS : generates
    
    USERS {
        uuid id PK
        text email
        uuid couple_id FK
        jsonb intake_data
        boolean intake_completed
        timestamptz daily_completed_at
        int streak_count
        text pairing_code
    }
    
    COUPLES {
        uuid id PK
        uuid partner_a_id FK
        uuid partner_b_id FK
        jsonb weekly_exercise
        int shared_streak_weeks
        boolean partner_a_reflected
        boolean partner_b_reflected
    }
    
    SESSIONS {
        uuid id PK
        uuid user_id FK
        uuid couple_id FK
        text mode
        text summary
        text transcript
        int duration_seconds
        boolean fallback_triggered
    }
    
    MEMORY_ENTRIES {
        uuid id PK
        text type
        uuid user_id FK
        uuid couple_id FK
        jsonb content
        vector embedding
    }
    
    EXERCISE_REFLECTIONS {
        uuid id PK
        uuid user_id FK
        uuid couple_id FK
        text reflection_text
    }
```

## Component Architecture

### iOS App (MVVM)

```mermaid
graph LR
    subgraph "Views"
        AuthView["AuthenticationView"]
        HomeView["HomeView"]
        SessionView["SessionView"]
        IntakeView["IntakeFormView"]
    end
    
    subgraph "ViewModels"
        HomeVM["HomeViewModel"]
        SessionVM["SessionViewModel"]
        IntakeVM["IntakeFormViewModel"]
    end
    
    subgraph "Services"
        AuthService["AuthService"]
        DataService["DataService"]
        VoiceService["RealtimeVoiceService"]
        NotifService["NotificationService"]
    end
    
    subgraph "Models"
        User["User"]
        Couple["Couple"]
        Session["Session"]
    end
    
    HomeView --> HomeVM
    SessionView --> SessionVM
    IntakeView --> IntakeVM
    
    HomeVM --> DataService
    SessionVM --> VoiceService
    SessionVM --> DataService
    IntakeVM --> DataService
    
    DataService --> AuthService
    DataService --> User
    DataService --> Couple
    
    style AuthView fill:#FF6B9D
    style SessionView fill:#FF6B9D
    style VoiceService fill:#74AA9C
```

### Admin Panel

```mermaid
graph TB
    subgraph "Pages"
        Login["Login"]
        Dashboard["Dashboard"]
        Users["Users"]
        Couples["Couples"]
        Sessions["Sessions"]
    end
    
    subgraph "Components"
        Layout["Layout"]
        Table["DataTable"]
        Stats["StatCard"]
    end
    
    subgraph "Services"
        Supabase["Supabase Client"]
    end
    
    App["App.tsx"] --> Login
    App --> Layout
    Layout --> Dashboard
    Layout --> Users
    Layout --> Couples
    Layout --> Sessions
    
    Users --> Table
    Couples --> Table
    Sessions --> Table
    Dashboard --> Stats
    
    Dashboard --> Supabase
    Users --> Supabase
    Couples --> Supabase
    Sessions --> Supabase
    
    style Dashboard fill:#4A90E2
    style Supabase fill:#3ECF8E
```

## Technology Stack

### Backend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Database | PostgreSQL 15+ | Primary data store |
| Auth | Supabase Auth | User authentication |
| Functions | Deno (TypeScript) | Serverless compute |
| Vector DB | pgvector | Semantic memory search |
| Hosting | Supabase Cloud | Managed infrastructure |

### Frontend (Admin)

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | React 18 | UI library |
| Language | TypeScript | Type safety |
| Build Tool | Vite | Fast dev server |
| Styling | Tailwind CSS | Utility-first CSS |
| Routing | React Router v6 | Client-side routing |
| State | React Hooks | State management |

### Mobile (iOS)

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | SwiftUI | Declarative UI |
| Language | Swift 5.9+ | Type-safe language |
| Architecture | MVVM | Clean separation |
| Networking | Supabase-Swift | Backend SDK |
| Audio | AVFoundation | Audio capture/playback |
| State | Observation | Reactive updates |

### AI Services

| Service | Model | Purpose |
|---------|-------|---------|
| Voice AI | gpt-4o-realtime-preview | Real-time conversations |
| Text AI | gpt-4o | Memory extraction |
| Embeddings | text-embedding-3-small | Semantic search (1536d) |

## Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        HTTPS["HTTPS/TLS<br/>All traffic encrypted"]
        Auth["JWT Authentication<br/>Token-based auth"]
        RLS["Row Level Security<br/>Database-level isolation"]
        Validation["Input Validation<br/>Server-side checks"]
    end
    
    subgraph "Data Protection"
        Personal["Personal Memories<br/>Never shared"]
        Shared["Shared Themes<br/>High-level only"]
        Audit["Audit Logs<br/>Admin actions tracked"]
    end
    
    Client["Client Apps"] --> HTTPS
    HTTPS --> Auth
    Auth --> RLS
    Auth --> Validation
    
    RLS --> Personal
    RLS --> Shared
    Validation --> Audit
    
    style Personal fill:#FF6B9D
    style HTTPS fill:#3ECF8E
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        DevDB["Local Supabase"]
        DevAdmin["localhost:3000"]
        DevIOS["Xcode Simulator"]
    end
    
    subgraph "Staging"
        StageDB["Supabase Staging"]
        StageAdmin["Vercel Preview"]
        StageIOS["TestFlight Internal"]
    end
    
    subgraph "Production"
        ProdDB["Supabase Production"]
        ProdAdmin["Vercel Production"]
        ProdIOS["TestFlight / App Store"]
    end
    
    GitHub["GitHub Repository"] -->|Push to develop| StageDB
    GitHub -->|Push to develop| StageAdmin
    
    GitHub -->|Tag v*| ProdDB
    GitHub -->|Tag v*| ProdAdmin
    
    Developer["Developer"] -->|Test locally| DevDB
    Developer -->|Submit| ProdIOS
    
    style ProdDB fill:#3ECF8E
    style ProdAdmin fill:#4A90E2
```

## Performance Considerations

### Database Optimization

- **Indexes**: All foreign keys and frequently queried columns
- **Connection Pooling**: Supabase pooler for serverless functions
- **Query Optimization**: Select specific columns, not `SELECT *`
- **Vector Search**: HNSW index for fast similarity search

### Frontend Optimization

- **Code Splitting**: Lazy load routes and heavy components
- **Pagination**: Limit data fetching to 50 items per page
- **Caching**: React Query or SWR for API caching
- **Bundle Size**: Tree-shaking and minification

### Mobile Optimization

- **Lazy Loading**: Load data on-demand
- **Image Caching**: Cache profile images and assets
- **Background Tasks**: Use background queues for heavy operations
- **Memory Management**: Release unused resources

### Cost Management

| Service | Free Tier | Estimated Cost (100 couples) |
|---------|-----------|------------------------------|
| Supabase | 500MB DB, 2GB bandwidth | Free tier sufficient |
| OpenAI Realtime | $0.06/min audio | ~$150-200/month |
| Vercel | 100GB bandwidth | Free tier sufficient |
| Total | - | ~$160-210/month |

## Scaling Considerations

### Immediate (100-500 couples)
- Current architecture sufficient
- No changes needed
- Monitor Supabase metrics

### Medium (500-2,000 couples)
- Add caching layer (Redis)
- Optimize database queries
- Consider read replicas
- Implement rate limiting

### Large (2,000+ couples)
- Dedicated database instance
- CDN for static assets
- Background job queue
- Horizontal scaling of functions

## Monitoring & Observability

```mermaid
graph LR
    App["Application"] --> Logs["Logs"]
    App --> Metrics["Metrics"]
    App --> Errors["Errors"]
    
    Logs --> Supabase["Supabase Dashboard"]
    Metrics --> Analytics["PostHog/Mixpanel"]
    Errors --> Sentry["Sentry"]
    
    Supabase --> Alert["Alerts"]
    Analytics --> Dashboard["Analytics Dashboard"]
    Sentry --> Slack["Slack Notifications"]
    
    style Sentry fill:#FF6B9D
    style Analytics fill:#4A90E2
```

## Key Metrics to Track

1. **User Engagement**
   - Daily Active Users (DAU)
   - Session completion rate
   - Average session duration
   - Streak maintenance rate

2. **Technical Health**
   - API response times
   - Error rates by endpoint
   - Database query performance
   - OpenAI API latency

3. **Business Metrics**
   - Pairing success rate
   - Weekly exercise completion
   - User retention (D7, D30)
   - Churn rate

## Disaster Recovery

### Backup Strategy
- **Database**: Automated daily backups (Supabase)
- **Code**: Version controlled in Git
- **Secrets**: Stored in password manager
- **Recovery Time Objective (RTO)**: 4 hours
- **Recovery Point Objective (RPO)**: 24 hours

### Incident Response
1. Detect issue (monitoring alerts)
2. Assess impact and severity
3. Communicate to users if needed
4. Execute recovery plan
5. Post-mortem analysis

---

For more details on specific components, see:
- Backend: `backend/README.md`
- Admin: `admin-web/README.md`
- iOS: `ios/README.md`
