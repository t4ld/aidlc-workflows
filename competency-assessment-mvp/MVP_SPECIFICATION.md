# Competency Assessment Scheduling Application - MVP UI/UX Specification

## Overview

This MVP demonstrates the complete workflow for competency assessment scheduling across 5 roles with 11 screens, following the Engage2 MUI Joule design system.

## Design System Foundation

- Theme: Engage2 MUI Joule (IBM Plex Sans/Mono typography)
- Primary Color: #0067A3 (Blue)
- Secondary Color: #FFA100 (Orange)
- Border Radius: 8px (M) default
- Shadows: MUI elevation system
- Components: AppBar, StatusChip, FilterChip, GridToolbar, DataGrid

## Role-Based Navigation Structure

### AppBar Configuration

The AppBar provides role-switching for demo purposes:

```
[Engage Icon] Competency Assessment System
  [CPOR] [Admin Clerk] [Participant] [Evaluator] [Supervisor]
  [Notifications] [Account]
```

Active role is highlighted with primary color indicator.

---

## Screen Specifications

### 1. CPOR Dashboard

**Route**: `/cpor/dashboard`  
**Primary Entity**: Scheduling Request (list view)

**Layout**:

- AppBar (role: CPOR)
- Page Title: "Scheduling Requests"
- Primary Action: Button "Request Scheduling" (top right)
- Content: DataGrid

**DataGrid Columns**:
- Request ID (string, sortable)
- Status (StatusChip: Draft/Pending/Fulfilled/Cancelled)
- Participants Count (number)
- Assessment Types (comma-separated list, truncated)
- Submitted Date (date, sortable)
- Actions (IconButton: View Details)

**States**:
- Empty: "No scheduling requests yet. Click 'Request Scheduling' to create your first request."
- Loading: Skeleton rows
- Error: Alert with retry action

**Interactions**:
- Click row → Navigate to Request Detail (read-only for CPOR)
- Click "Request Scheduling" → Navigate to Create Scheduling Request

---

### 2. Create Scheduling Request

**Route**: `/cpor/request/new`  
**Primary Entity**: Scheduling Request (form)

**Layout**:
- AppBar
- Page Title: "Create Scheduling Request"
- Form Container (max-width: 800px, centered)
- Action Bar: Cancel | Submit

**Form Fields**:

1. **Participants** (required)
   - Autocomplete multi-select
   - Search by name/ID
   - Chip display for selected participants
   - Secondary action: "Upload CSV" button
   - Helper text: "Select participants who need assessment"

2. **Assessment Types** (required)
   - Checkbox group
   - Options: Tree Climbing, Pole Top Rescue, Bucket Operations, Confined Space Entry
   - Helper text: "Select all assessment types required"

3. **Context** (optional)
   - TextField multiline (4 rows)
   - Label: "Additional Context"
   - Helper text: "Provide any relevant scheduling context or constraints"

**Validation**:
- At least 1 participant required
- At least 1 assessment type required
- Submit button disabled until valid

**States**:
- Draft (form editing)
- Submitting (loading spinner on button)
- Success → Navigate to CPOR Dashboard with success snackbar

**Microcopy**:
- Submit button: "Submit Request"
- Success message: "Scheduling request submitted successfully"

---

### 3. AC Dashboard

**Route**: `/ac/dashboard`  
**Primary Entity**: Multiple (operational overview)

**Layout**:
- AppBar (role: Administrative Clerk)
- Page Title: "Operations Dashboard"
- Grid Layout (2 columns on desktop, 1 on mobile)

**Section 1: Pending Requests** (left/top)
- Card with header "Pending Scheduling Requests"
- DataGrid (compact)
- Columns: Request ID, Participants Count, Submitted Date, Actions
- Action: "Review" button → Navigate to Request Detail

**Section 2: Upcoming Visits** (right/bottom)
- Card with header "Upcoming Visits"
- DataGrid (compact)
- Columns: Visit Date, Location, Capacity (Used/Total), Status, Actions
- Action: "Manage" button → Navigate to Manage Bookings

**Section 3: Alerts** (full width, bottom)
- Alert banner (collapsible)
- Types:
  - Warning: "Visit #V-123 approaching capacity (18/20)"
  - Info: "Visit #V-456 locks in 2 days"
- Action: "View Visit" link

**States**:
- Empty sections show appropriate empty states
- Loading: Skeleton cards

---

### 4. Scheduling Request Detail

**Route**: `/ac/request/:id`  
**Primary Entity**: Scheduling Request (detail view)

**Layout**:
- AppBar
- Breadcrumb: Dashboard > Request #R-123
- Page Title: "Scheduling Request #R-123"
- Status Badge (top right)
- Content: 2-column layout

**Left Column: Request Summary**
- Card: "Request Information"
  - Request ID
  - Status (StatusChip)
  - Submitted By (CPOR name)
  - Submitted Date
  - Context (if provided)

**Right Column: Details**
- Card: "Participants" (count badge)
  - List with avatars/names
  - Scrollable if > 10

- Card: "Requested Assessment Types"
  - Chip list

**Action Bar** (bottom, sticky):
- Secondary: "Cancel Request"
- Primary: "Create Visit" | "Assign to Existing Visit"

**Interactions**:
- "Create Visit" → Navigate to Create Visit (pre-filled with participants)
- "Assign to Existing Visit" → Open dialog with visit selector

---

### 5. Create/Edit Visit

**Route**: `/ac/visit/new` or `/ac/visit/:id/edit`  
**Primary Entity**: Scheduled Slot (Visit)

**Layout**:
- AppBar
- Page Title: "Create Visit" or "Edit Visit #V-123"
- Form Container (max-width: 800px)
- Action Bar: Cancel | Save Draft | Schedule Visit

**Form Fields**:

1. **Date** (required)
   - DatePicker
   - Min: Today
   - Helper: "Select visit date"

2. **Start Time** (required)
   - TimePicker
   - Helper: "Visit start time"

3. **End Time** (required)
   - TimePicker
   - Validation: Must be after start time
   - Helper: "Visit end time"

4. **Location** (required)
   - Select dropdown
   - Options: Oakland Yard, Sacramento Training Center, Fresno Field Office
   - Helper: "Select visit location"

5. **Capacity** (required)
   - Number input
   - Min: 1, Max: 50
   - Helper: "Maximum participants for this visit"
   - Display: Current bookings count (if editing)

**Validation**:
- All fields required for "Schedule Visit"
- Capacity cannot be less than current bookings (if editing)
- No date/time conflicts at same location

**States**:
- Draft (can edit all fields)
- Scheduled (can edit if not locked)
- Locked (read-only, show lock reason + timestamp)

**Locked State Display**:
- All fields disabled
- Alert banner: "This visit is locked. Reason: Assessment in progress. Locked on: 2026-03-05 09:00 AM"
- Only "Back" button available

---

### 6. Manage Bookings

**Route**: `/ac/visit/:id/bookings`  
**Primary Entity**: Booking (list + management)

**Layout**:
- AppBar
- Breadcrumb: Dashboard > Visit #V-123 > Bookings
- Page Title: "Manage Bookings - Visit #V-123"
- Visit Summary Card (collapsible)
- DataGrid with toolbar

**Visit Summary** (top):
- Date, Time, Location
- Capacity: Progress bar (18/20) with color coding
  - Green: < 80%
  - Orange: 80-100%
  - Red: At capacity
- Status badge

**DataGrid**:
- Columns:
  - Participant Name
  - Booking Status (StatusChip: Draft/Scheduled/Locked/Completed/Cancelled)
  - Assessment Types (chip list)
  - Booked Date
  - Actions (if not locked)

**Toolbar**:
- Search participants
- Filter by status
- "Add Participants" button (if capacity available)

**Actions** (per row, if not locked):
- Edit assessment types
- Cancel booking

**Locked State**:
- All action buttons disabled
- Alert: "Bookings are locked. Reason: [reason]. Locked on: [timestamp]"
- DataGrid in read-only mode

**States**:
- Empty: "No bookings yet. Add participants to this visit."
- At capacity: Warning alert + "Add Participants" disabled

---

### 7. Participant Dashboard

**Route**: `/participant/dashboard`  
**Primary Entity**: Booking (participant view)

**Layout**:
- AppBar (role: Participant)
- Page Title: "My Upcoming Visits"
- Card grid (responsive)

**Visit Cards**:
Each card shows:
- Date (large, prominent)
- Time range
- Location
- Status badge
- Assessment types (chip list)
- "View Details" button

**Card States**:
- Upcoming (default styling)
- Today (highlighted with primary color border)
- Past (muted/disabled styling)

**Empty State**:
- Illustration
- "No upcoming visits scheduled"
- "You will be notified when visits are scheduled"

**Interactions**:
- Click card or "View Details" → Navigate to Visit Detail

---

### 8. Visit Detail (Participant Read-Only)

**Route**: `/participant/visit/:id`  
**Primary Entity**: Booking / Visit (read-only)

**Layout**:
- AppBar
- Breadcrumb: My Visits > Visit Details
- Page Title: "Visit Details"
- Content: Single column, card-based

**Card 1: Visit Information**
- Date (large)
- Time range
- Location (with map link icon)
- Status badge

**Card 2: Assessment Information**
- Section title: "Assessments to be Attempted"
- List of assessment types (with icons)
- Each item shows:
  - Assessment type name
  - Brief description (1 line)
  - No outcome or status

**Card 3: Instructions** (if provided)
- "What to Bring"
- "Arrival Instructions"
- Contact information

**No Edit Controls**:
- No buttons except "Back to My Visits"
- No status changes
- No cancellation option (must contact admin)

**Microcopy**:
- Neutral, procedural language
- "You are scheduled to attempt these assessments"
- Never: "You will be certified" or "You will be qualified"

---

### 9. Evaluator Dashboard

**Route**: `/evaluator/dashboard`  
**Primary Entity**: Visit (evaluator view)

**Layout**:
- AppBar (role: Evaluator)
- Page Title: "Today's Visits"
- Date selector (default: today)
- Card list

**Visit Cards**:
Each card shows:
- Time range (prominent)
- Location
- Participant count
- Assessment types summary
- Status: Not Started / In Progress / Completed
- "Conduct Assessments" button

**Empty State**:
- "No visits scheduled for [date]"
- Date selector to view other days

**Interactions**:
- Click "Conduct Assessments" → Navigate to Conduct Assessments screen

---

### 10. Conduct Assessments

**Route**: `/evaluator/visit/:id/conduct`  
**Primary Entity**: Assessment Participation

**Layout**:
- AppBar
- Page Title: "Conduct Assessments - Visit #V-123"
- Visit info bar (sticky top)
- Participant list (main content)
- Action bar (sticky bottom)

**Visit Info Bar**:
- Date, Time, Location
- Progress: "3 of 12 participants completed"

**Participant Cards** (accordion style):
Each participant card:
- Header: Participant name + completion status
- Expandable content:
  - Assessment Type selector (dropdown)
  - Outcome selector (radio buttons):
    - Pass
    - Fail
    - Incomplete
  - Notes field (optional, multiline)
  - "Save Participation" button

**Validation**:
- Assessment type required
- Outcome required
- Notes optional

**States per Participation**:
- Not Started (empty form)
- In Progress (partially filled)
- Saved (can edit)
- Finalized (read-only, locked icon)

**Action Bar**:
- "Save All" (saves all in-progress)
- "Finalize Visit" (makes all outcomes immutable)

**Finalize Confirmation Dialog**:
- Title: "Finalize Visit Assessments?"
- Message: "Once finalized, outcomes cannot be changed. Ensure all assessments are recorded correctly."
- Actions: Cancel | Finalize

**Post-Finalization**:
- All forms become read-only
- Success message: "Visit assessments finalized"
- "Return to Dashboard" button

---

### 11. Results Export

**Route**: `/admin/export` or `/ac/export` or `/supervisor/export`  
**Primary Entity**: Results Export / Handoff

**Layout**:
- AppBar (role-appropriate)
- Page Title: "Export Assessment Results"
- 2-column layout (form left, history right)

**Left Column: Export Form**

Card: "Configure Export"

1. **Scope** (required, radio group)
   - By Visit (opens visit selector)
   - By Participant (opens participant selector)
   - By Date Range (opens date range picker)

2. **Format** (required, radio group)
   - CSV
   - PDF
   - Email (shows email input field)

3. **Email Recipients** (if Email selected)
   - Chip input for multiple emails
   - Validation: valid email format

**Action Buttons**:
- "Preview" (shows preview dialog)
- "Export" (primary button)

**Right Column: Export History**

Card: "Recent Exports"

DataGrid:
- Columns:
  - Export ID
  - Scope (Visit/Participant/Date Range)
  - Format
  - Created Date
  - Created By
  - Status (StatusChip: Pending/Completed/Failed)
  - Actions (Download icon if completed)

**Export Process**:
1. Click "Export" → Show loading state
2. On success → Add to history table + download file (if CSV/PDF)
3. On email → Show success message "Email sent to [recipients]"
4. On failure → Show error alert with retry option

**Immutability**:
- Exports cannot be edited or deleted
- Failed exports can be retried (creates new export)
- History is permanent audit trail

**Microcopy**:
- "Export assessment participation outcomes"
- "Results are exported as recorded, not as certifications"
- Never: "Export qualifications" or "Export credentials"

---

## Cross-Cutting UI Patterns

### Status Chips

Using StatusChip component with 8px border radius:

**Scheduling Request**:
- Draft (gray)
- Pending (orange)
- Fulfilled (green)
- Cancelled (red outline)

**Visit**:
- Draft (gray)
- Scheduled (blue)
- Locked (orange)
- Completed (green)
- Cancelled (red outline)

**Booking**:
- Draft (gray)
- Scheduled (blue)
- Locked (orange)
- Completed (green)
- Cancelled (red outline)

**Assessment Participation**:
- Not Started (gray)
- In Progress (light blue)
- Pass (green)
- Fail (red)
- Incomplete (orange)

**Export**:
- Pending (orange)
- Completed (green)
- Failed (red)

### Loading States

- Skeleton loaders for tables (3-5 rows)
- Circular progress for buttons during actions
- Linear progress bar for page-level loading

### Error States

- Alert component (error severity)
- Error message + retry action
- Form field errors (helper text in red)

### Empty States

- Centered content with:
  - Icon (muted color)
  - Primary message (Typography h6)
  - Secondary message (Typography body2)
  - Optional CTA button

---

## Navigation Flow

```
CPOR:
Dashboard → Create Request → [Submit] → Dashboard

AC:
Dashboard → Request Detail → Create Visit → [Save] → Manage Bookings
Dashboard → Upcoming Visits → Manage Bookings

Participant:
Dashboard → Visit Detail → [Read Only]

Evaluator:
Dashboard → Conduct Assessments → [Finalize] → Dashboard

Admin/AC/Supervisor:
Dashboard → Export → [Export] → [Download/Email]
```

---

## Sample Demo Data

### Scheduling Requests
```json
[
  {
    "id": "R-001",
    "status": "Pending",
    "submittedBy": "John Smith (CPOR)",
    "submittedDate": "2026-03-01",
    "participants": ["Alice Johnson", "Bob Williams", "Carol Davis"],
    "assessmentTypes": ["Tree Climbing", "Pole Top Rescue"],
    "context": "Quarterly assessment cycle for Oakland crew"
  },
  {
    "id": "R-002",
    "status": "Fulfilled",
    "submittedBy": "Jane Doe (CPOR)",
    "submittedDate": "2026-02-28",
    "participants": ["David Brown", "Emma Wilson"],
    "assessmentTypes": ["Bucket Operations"],
    "context": null
  }
]
```

### Visits
```json
[
  {
    "id": "V-123",
    "date": "2026-03-12",
    "startTime": "09:00",
    "endTime": "15:00",
    "location": "Oakland Yard",
    "capacity": 20,
    "bookingsCount": 18,
    "status": "Scheduled",
    "locked": false
  },
  {
    "id": "V-124",
    "date": "2026-03-05",
    "startTime": "08:00",
    "endTime": "12:00",
    "location": "Sacramento Training Center",
    "capacity": 15,
    "bookingsCount": 15,
    "status": "Locked",
    "locked": true,
    "lockReason": "Assessment in progress",
    "lockedAt": "2026-03-05T08:00:00Z"
  }
]
```

### Bookings
```json
[
  {
    "id": "B-001",
    "visitId": "V-123",
    "participantName": "Alice Johnson",
    "participantId": "P-101",
    "assessmentTypes": ["Tree Climbing", "Pole Top Rescue"],
    "status": "Scheduled",
    "bookedDate": "2026-03-02"
  }
]
```

### Assessment Participations
```json
[
  {
    "id": "AP-001",
    "bookingId": "B-001",
    "participantName": "Alice Johnson",
    "assessmentType": "Tree Climbing",
    "outcome": "Pass",
    "notes": "Demonstrated proper technique and safety protocols",
    "evaluator": "Mike Evaluator",
    "completedAt": "2026-03-05T10:30:00Z",
    "finalized": true
  }
]
```

### Exports
```json
[
  {
    "id": "E-001",
    "scope": "Visit V-124",
    "format": "CSV",
    "createdBy": "Admin User",
    "createdAt": "2026-03-05T12:00:00Z",
    "status": "Completed",
    "downloadUrl": "/exports/E-001.csv"
  }
]
```

---

## Responsive Design

### Breakpoints (MUI default)
- xs: 0px (mobile)
- sm: 600px (tablet)
- md: 900px (desktop)
- lg: 1200px (large desktop)

### Mobile Adaptations
- AppBar: Hide role labels, show icons only
- DataGrid: Horizontal scroll or card view
- Forms: Single column layout
- Action bars: Stack buttons vertically

---

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators (2px primary color outline)
- Color contrast ratios meet WCAG AA
- Screen reader announcements for status changes
- Form validation messages announced

---

## Microcopy Guidelines

### Do Use:
- "Assessment participation"
- "Attempt assessment"
- "Record outcome"
- "Scheduled for assessment"
- "Assessment results"

### Never Use:
- "Certified"
- "Qualified"
- "Credentialed"
- "Eligible"
- "System of record"
- "Certification"
- "Qualification"

---

## Implementation Notes

1. Use React Router for navigation
2. Use React Context for role switching (demo only)
3. Use MUI X DataGrid for all tables
4. Use React Hook Form for form management
5. Use date-fns for date formatting
6. Mock API calls with setTimeout for demo
7. Store demo data in local state (no backend)

---

## Success Criteria

✅ All 11 screens implemented  
✅ Role-based navigation working  
✅ Locked state enforcement visible  
✅ Capacity displayed only at visit level  
✅ No forbidden language used  
✅ Engage2 design system applied consistently  
✅ Responsive on mobile/tablet/desktop  
✅ Demo data populates all screens  
✅ Navigation flows work end-to-end  
✅ Empty/loading/error states implemented
