# Competency Assessment Scheduling Application - MVP Demo

A role-based UI/UX demonstration of a competency assessment scheduling system built with React, Material-UI, and the Engage2 Joule design system.

## Overview

This MVP demonstrates the complete workflow for competency assessment scheduling across 5 user roles:

- **CPOR**: Create and track scheduling requests
- **Administrative Clerk (AC)**: Manage visits, bookings, and operational workflows
- **Participant**: View upcoming visits (read-only)
- **Evaluator**: Conduct assessments and record outcomes
- **Supervisor/Admin**: Export assessment results

## Features

### Implemented Screens (11 total)

1. **CPOR Dashboard** - View and manage scheduling requests
2. **Create Scheduling Request** - Submit new assessment requests
3. **AC Dashboard** - Operational command center with pending requests and upcoming visits
4. **Manage Bookings** - View and manage participant bookings for visits
5. **Participant Dashboard** - View upcoming visits
6. **Evaluator Dashboard** - View today's assessment visits
7. **Conduct Assessments** - Record assessment outcomes
8. **Results Export** - Export assessment data in multiple formats

### Key Design Principles

- **Admin-orchestrated**: No participant self-scheduling
- **Visit-level capacity**: Capacity enforced only at visit level, never per assessment type
- **Locked state enforcement**: Bookings become immutable when locked
- **Neutral language**: No certification or qualification terminology
- **Role-based access**: Each role sees only relevant information

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI) v7** - Component library
- **MUI X Data Grid** - Advanced tables
- **React Router v7** - Navigation
- **Engage2 Joule Theme** - Custom design system
- **date-fns** - Date formatting
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd competency-assessment-mvp
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Project Structure

```
competency-assessment-mvp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppBar.tsx       # Main navigation bar with role switcher
│   │   └── StatusChip.tsx   # Status indicator component
│   ├── context/             # React context providers
│   │   └── RoleContext.tsx  # Role management for demo
│   ├── data/                # Mock data
│   │   └── mockData.ts      # Sample data for all entities
│   ├── pages/               # Page components by role
│   │   ├── cpor/            # CPOR screens
│   │   ├── ac/              # Administrative Clerk screens
│   │   ├── participant/     # Participant screens
│   │   ├── evaluator/       # Evaluator screens
│   │   └── admin/           # Admin/Supervisor screens
│   ├── theme/               # Engage2 Joule design system
│   │   ├── joule theme/     # Theme configuration JSON
│   │   └── theme.ts         # MUI theme creation
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # All entity types
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Design System

This application uses the **Engage2 MUI Joule** design system with:

- **Typography**: IBM Plex Sans (primary), IBM Plex Mono (monospace)
- **Primary Color**: #0067A3 (Blue)
- **Secondary Color**: #FFA100 (Orange)
- **Border Radius**: 8px default
- **Custom Components**: StatusChip, AppBar, DataGrid styling

## Demo Features

### Role Switching

Use the tabs in the AppBar to switch between roles and explore different workflows:

1. **CPOR** → Create scheduling requests
2. **Admin Clerk** → Review requests and manage visits
3. **Participant** → View upcoming visits (read-only)
4. **Evaluator** → Conduct assessments
5. **Supervisor** → Export results

### Sample Data

The application includes mock data for:
- 3 scheduling requests
- 3 visits (including one locked visit)
- Multiple bookings and participants
- Assessment participations
- Export history

### Key Interactions

- **Create Request**: Select participants and assessment types (no dates/times)
- **Manage Bookings**: View capacity indicators and locked state
- **Conduct Assessments**: Record Pass/Fail/Incomplete outcomes
- **Export Results**: Configure scope and format for data export

## Compliance Notes

### Vocabulary Contract

The UI strictly adheres to neutral, procedural language:

✅ **Allowed Terms**:
- Assessment Type
- Scheduling Request
- Visit / Scheduled Slot
- Booking
- Assessment Participation
- Outcome (Pass/Fail/Incomplete)

❌ **Forbidden Terms**:
- Certified / Certification
- Qualified / Qualification
- Credentialed
- Eligible
- System of Record

### Entity Boundaries

Each screen represents **one primary entity**:
- Scheduling Request screens manage requests only
- Visit screens manage visits only
- Booking screens manage bookings only
- Assessment Participation screens manage outcomes only

### Capacity Rules

- Capacity is displayed and enforced **only at the Visit level**
- No assessment-type-specific capacity indicators
- Progress bars show visit capacity utilization

### Locked State

When a visit or booking is locked:
- All edit controls are disabled
- Lock reason and timestamp are displayed
- Visual indicators (lock icon, alert banners) are shown

## Future Enhancements

This MVP focuses on core workflows. Potential additions:

- Backend API integration
- Real-time notifications
- Advanced filtering and search
- Bulk operations
- Audit trail visualization
- Mobile-responsive optimizations
- Accessibility enhancements (ARIA labels, keyboard navigation)

## Documentation

- **MVP Specification**: See `MVP_SPECIFICATION.md` for detailed screen specs
- **User Journeys**: See `../specs/user-journeys.md` for authoritative requirements
- **UX Contract**: See `../specs/ux-contract.md` for vocabulary and rules
- **Design System**: See `../DESIGN_SYSTEM.md` for theme documentation

## License

This is a demonstration project for UI/UX evaluation purposes.
