# Architecture Overview

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         AppBar (Role Switcher)                   │
│  [CPOR] [Admin Clerk] [Participant] [Evaluator] [Supervisor]   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │   React Router          │
                    │   (Role-based routing)  │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
    ┌───▼───┐              ┌────▼────┐            ┌─────▼─────┐
    │ CPOR  │              │   AC    │            │Participant│
    │Screens│              │ Screens │            │  Screens  │
    └───┬───┘              └────┬────┘            └─────┬─────┘
        │                       │                        │
        │                       │                        │
    ┌───▼────────┐         ┌───▼────────┐         ┌────▼──────┐
    │Evaluator   │         │Admin/Super │         │  Shared   │
    │  Screens   │         │  Screens   │         │Components │
    └────────────┘         └────────────┘         └───────────┘
                                                         │
                                                    ┌────▼─────┐
                                                    │StatusChip│
                                                    │ DataGrid │
                                                    │  etc.    │
                                                    └──────────┘
```

## Data Flow

```
┌──────────────┐
│  Mock Data   │
│ (mockData.ts)│
└──────┬───────┘
       │
       │ Import
       │
┌──────▼────────────────────────────────────────────┐
│              Page Components                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Dashboard │  │  Forms   │  │  Detail  │       │
│  │  Views   │  │          │  │  Views   │       │
│  └──────────┘  └──────────┘  └──────────┘       │
└───────────────────────────────────────────────────┘
       │
       │ Render
       │
┌──────▼────────────────────────────────────────────┐
│           Shared Components                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │StatusChip│  │ DataGrid │  │  Cards   │       │
│  └──────────┘  └──────────┘  └──────────┘       │
└───────────────────────────────────────────────────┘
       │
       │ Styled with
       │
┌──────▼────────────────────────────────────────────┐
│         Engage2 Joule Theme                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Colors  │  │Typography│  │ Spacing  │       │
│  └──────────┘  └──────────┘  └──────────┘       │
└───────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── ThemeProvider (Joule Theme)
│   └── CssBaseline
│       └── RoleProvider (Context)
│           └── BrowserRouter
│               ├── AppBar
│               │   ├── Tabs (Role Switcher)
│               │   └── IconButtons (Notifications, Account)
│               │
│               └── Routes
│                   ├── /cpor/*
│                   │   ├── CPORDashboard
│                   │   │   └── DataGrid
│                   │   └── CreateRequest
│                   │       └── Form Components
│                   │
│                   ├── /ac/*
│                   │   ├── ACDashboard
│                   │   │   ├── DataGrid (Requests)
│                   │   │   └── DataGrid (Visits)
│                   │   └── ManageBookings
│                   │       ├── Visit Summary
│                   │       └── DataGrid (Bookings)
│                   │
│                   ├── /participant/*
│                   │   └── ParticipantDashboard
│                   │       └── Card Grid
│                   │
│                   ├── /evaluator/*
│                   │   ├── EvaluatorDashboard
│                   │   │   └── Card List
│                   │   └── ConductAssessments
│                   │       ├── Progress Bar
│                   │       └── Accordion List
│                   │
│                   └── /admin/*
│                       └── ResultsExport
│                           ├── Export Form
│                           └── DataGrid (History)
```

## State Management

```
┌─────────────────────────────────────────────────┐
│            RoleContext (Demo Only)              │
│  ┌───────────────────────────────────────────┐ │
│  │  currentRole: UserRole                    │ │
│  │  setCurrentRole: (role) => void           │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                      │
                      │ Consumed by
                      │
        ┌─────────────┴─────────────┐
        │                           │
    ┌───▼────┐                 ┌───▼────┐
    │ AppBar │                 │ Pages  │
    │        │                 │        │
    └────────┘                 └────────┘

┌─────────────────────────────────────────────────┐
│         Component Local State                   │
│  ┌───────────────────────────────────────────┐ │
│  │  Form values (useState)                   │ │
│  │  Loading states (useState)                │ │
│  │  Dialog open/close (useState)             │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Routing Structure

```
/
├── / (redirect to /cpor/dashboard)
│
├── /cpor
│   ├── /dashboard              → CPORDashboard
│   ├── /request/new            → CreateRequest
│   └── /request/:id            → CPORDashboard (simplified)
│
├── /ac
│   ├── /dashboard              → ACDashboard
│   ├── /request/:id            → ACDashboard (simplified)
│   └── /visit/:id/bookings     → ManageBookings
│
├── /participant
│   ├── /dashboard              → ParticipantDashboard
│   └── /visit/:id              → ParticipantDashboard (simplified)
│
├── /evaluator
│   ├── /dashboard              → EvaluatorDashboard
│   └── /visit/:id/conduct      → ConductAssessments
│
└── /admin
    └── /export                 → ResultsExport
```

## Entity Relationships

```
┌──────────────────┐
│ Scheduling       │
│   Request        │
│                  │
│ - id             │
│ - participants[] │◄────┐
│ - assessmentTypes│     │
│ - status         │     │
└──────────────────┘     │
                         │
                         │ Creates
                         │
┌──────────────────┐     │
│     Visit        │     │
│ (Scheduled Slot) │     │
│                  │     │
│ - id             │     │
│ - date/time      │     │
│ - location       │     │
│ - capacity       │◄────┘
│ - locked         │
└────────┬─────────┘
         │
         │ Contains
         │
┌────────▼─────────┐
│    Booking       │
│                  │
│ - id             │
│ - visitId        │
│ - participantId  │
│ - assessmentTypes│
│ - status         │
└────────┬─────────┘
         │
         │ Records
         │
┌────────▼─────────┐
│  Assessment      │
│ Participation    │
│                  │
│ - id             │
│ - bookingId      │
│ - assessmentType │
│ - outcome        │
│ - finalized      │
└────────┬─────────┘
         │
         │ Exported via
         │
┌────────▼─────────┐
│  Results Export  │
│                  │
│ - id             │
│ - scope          │
│ - format         │
│ - status         │
└──────────────────┘
```

## Design System Integration

```
┌─────────────────────────────────────────────────┐
│         Engage2 Joule Theme JSON                │
│  ┌───────────────────────────────────────────┐ │
│  │  colorSchemes (light/dark)                │ │
│  │  typography (IBM Plex Sans/Mono)          │ │
│  │  shape (borderRadius: 4/8/16/1000)        │ │
│  └───────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Processed by
                  │
┌─────────────────▼───────────────────────────────┐
│            theme.ts (createJouleTheme)          │
│  ┌───────────────────────────────────────────┐ │
│  │  MUI Theme Object                         │ │
│  │  - palette                                │ │
│  │  - typography                             │ │
│  │  - shape                                  │ │
│  │  - shadows (25 levels)                    │ │
│  └───────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Applied via
                  │
┌─────────────────▼───────────────────────────────┐
│              ThemeProvider                      │
│  ┌───────────────────────────────────────────┐ │
│  │  All MUI components styled automatically │ │
│  │  Custom components use theme tokens      │ │
│  │  sx prop for component-specific styles   │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Build & Development Flow

```
┌──────────────┐
│  Source Code │
│   (src/)     │
└──────┬───────┘
       │
       │ Vite Dev Server
       │ (Hot Module Replacement)
       │
┌──────▼───────┐         ┌──────────────┐
│  TypeScript  │────────►│  Type Check  │
│  Compiler    │         └──────────────┘
└──────┬───────┘
       │
       │ Transpile
       │
┌──────▼───────┐
│   ES Modules │
└──────┬───────┘
       │
       │ Bundle
       │
┌──────▼───────┐
│   Browser    │
│ (localhost)  │
└──────────────┘

Production Build:
┌──────────────┐
│  npm run     │
│    build     │
└──────┬───────┘
       │
       │ Vite Build
       │
┌──────▼───────┐
│  Optimized   │
│  dist/       │
│  - Minified  │
│  - Chunked   │
│  - Hashed    │
└──────────────┘
```

## Key Architectural Decisions

### 1. Single Page Application (SPA)
- React Router for client-side routing
- No page reloads between navigation
- Fast, app-like experience

### 2. Component-Based Architecture
- Reusable components (StatusChip, AppBar)
- Page-level components for each screen
- Separation of concerns

### 3. Context for Demo State
- RoleContext for role switching (demo only)
- Would be replaced with auth context in production
- Minimal global state

### 4. Mock Data Layer
- Centralized in mockData.ts
- Easy to replace with API calls
- Consistent data structure

### 5. Design System First
- Engage2 Joule theme as foundation
- All styling through theme tokens
- No hard-coded colors/spacing

### 6. TypeScript for Type Safety
- Strict type checking
- Interface definitions for all entities
- Better IDE support and refactoring

## Performance Considerations

### Current (MVP)
- All data loaded upfront (mock data)
- No lazy loading
- No code splitting
- Acceptable for demo purposes

### Production Recommendations
- Lazy load route components
- Code splitting by role
- Virtual scrolling for large tables
- API pagination
- Caching strategies

## Security Considerations

### Current (MVP)
- No authentication
- No authorization
- Role switching is UI-only
- Acceptable for demo purposes

### Production Requirements
- JWT or session-based auth
- Role-based access control (RBAC)
- API-level authorization
- Secure token storage
- HTTPS only

## Scalability Path

```
MVP (Current)
    │
    ├─► Add Backend API
    │   └─► REST or GraphQL
    │
    ├─► Add Authentication
    │   └─► JWT + Role Management
    │
    ├─► Add State Management
    │   └─► Redux/Zustand/TanStack Query
    │
    ├─► Add Real-time Features
    │   └─► WebSockets/Server-Sent Events
    │
    └─► Add Advanced Features
        ├─► Notifications
        ├─► Audit Logs
        ├─► Advanced Search
        └─► Bulk Operations
```

## Testing Strategy (Future)

```
Unit Tests
├── Component tests (React Testing Library)
├── Utility function tests
└── Type tests

Integration Tests
├── User flow tests
├── API integration tests
└── Route tests

E2E Tests
├── Critical path tests (Playwright/Cypress)
└── Cross-browser tests

Accessibility Tests
├── ARIA compliance
├── Keyboard navigation
└── Screen reader compatibility
```
