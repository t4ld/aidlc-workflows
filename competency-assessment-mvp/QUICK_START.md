# Quick Start Guide

## Installation & Running

```bash
# Navigate to the project
cd competency-assessment-mvp

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

## Demo Walkthrough

### 1. CPOR Workflow (Create Scheduling Request)

**Current Role**: CPOR (default on load)

1. Click **"Request Scheduling"** button
2. Select participants from dropdown (e.g., Alice Johnson, Bob Williams)
3. Check assessment types (e.g., Tree Climbing, Pole Top Rescue)
4. Optionally add context
5. Click **"Submit Request"**
6. Returns to dashboard showing the new request with "Pending" status

### 2. Administrative Clerk Workflow (Manage Operations)

**Switch Role**: Click **"Admin Clerk"** tab in AppBar

1. **AC Dashboard** shows:
   - Pending requests (left panel)
   - Upcoming visits (right panel)
   - Capacity alerts (bottom)

2. Click **"Manage"** on Visit #V-123:
   - View visit details (date, time, location)
   - See capacity progress bar (18/20)
   - View participant bookings table
   - Note: Visit #V-124 is locked (cannot edit)

### 3. Participant Workflow (View Visits)

**Switch Role**: Click **"Participant"** tab

1. **Participant Dashboard** shows upcoming visits as cards
2. Each card displays:
   - Date (large, prominent)
   - Time range
   - Location
   - Status badge
3. Click **"View Details"** (read-only, no edit controls)

### 4. Evaluator Workflow (Conduct Assessments)

**Switch Role**: Click **"Evaluator"** tab

1. **Evaluator Dashboard** shows today's visits
2. Click **"Conduct Assessments"** on Visit #V-124
3. For each participant:
   - Expand accordion
   - Select assessment type
   - Choose outcome (Pass/Fail/Incomplete)
   - Add optional notes
4. Click **"Finalize Visit"**
5. Confirm in dialog (outcomes become immutable)

### 5. Supervisor Workflow (Export Results)

**Switch Role**: Click **"Supervisor"** tab

1. **Results Export** screen shows:
   - Left: Export configuration form
   - Right: Export history table
2. Configure export:
   - Select scope (Visit/Participant/Date Range)
   - Select format (CSV/PDF/Email)
   - If Email: Add recipient addresses
3. Click **"Export"**
4. View in history table with download link

## Key Features to Explore

### Locked State Demonstration

Visit #V-124 is locked:
- Navigate to AC Dashboard → Click "Manage" on V-124
- Notice the warning alert with lock reason and timestamp
- All booking actions are disabled
- DataGrid is read-only

### Capacity Indicators

Visit #V-123 shows capacity management:
- Progress bar: 18/20 (90% full)
- Color coding: Green < 80%, Orange 80-100%, Red = full
- Capacity displayed only at visit level (never per assessment type)

### Status Chips

Observe different status colors throughout:
- **Gray**: Draft, Not Started
- **Orange**: Pending, Locked, Incomplete
- **Blue**: Scheduled, In Progress
- **Green**: Fulfilled, Completed, Pass
- **Red**: Fail
- **Red Outline**: Cancelled

### Neutral Language

Notice the absence of forbidden terms:
- ✅ "Assessment participation"
- ✅ "Attempt assessment"
- ✅ "Record outcome"
- ❌ Never: "Certified", "Qualified", "Credentialed"

## Mock Data Overview

### Scheduling Requests
- R-001: Pending (3 participants, 2 assessment types)
- R-002: Fulfilled (2 participants, 1 assessment type)
- R-003: Pending (4 participants, 2 assessment types)

### Visits
- V-123: Scheduled (Oakland Yard, 18/20 capacity)
- V-124: Locked (Sacramento, 15/15 capacity, assessment in progress)
- V-125: Scheduled (Fresno, 8/12 capacity)

### Participants
- Alice Johnson, Bob Williams, Carol Davis
- David Brown, Emma Wilson, Frank Miller
- Grace Lee, Henry Chen, Iris Martinez

### Assessment Types
- Tree Climbing
- Pole Top Rescue
- Bucket Operations
- Confined Space Entry

## Responsive Design

Try resizing your browser:
- **Desktop** (>900px): Full layout with side-by-side panels
- **Tablet** (600-900px): Stacked panels, abbreviated labels
- **Mobile** (<600px): Single column, horizontal scroll for tables

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Theme Not Loading
Ensure fonts are imported in `src/main.tsx`:
```typescript
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
```

## Next Steps

1. Review `MVP_SPECIFICATION.md` for detailed screen specifications
2. Explore `../specs/user-journeys.md` for authoritative requirements
3. Check `../DESIGN_SYSTEM.md` for design system documentation
4. Modify mock data in `src/data/mockData.ts` to test different scenarios

## Development Tips

### Adding New Screens
1. Create component in `src/pages/[role]/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/AppBar.tsx`

### Modifying Theme
Edit `src/theme/joule theme/theme.json` for colors, typography, etc.

### Adding Mock Data
Update `src/data/mockData.ts` with new entities

### Type Definitions
Add/modify types in `src/types/index.ts`

## Support

For questions or issues, refer to:
- MVP Specification document
- User Journeys document
- UX Contract document
- Design System documentation
