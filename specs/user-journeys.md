# User Journeys for Kiro UI/UX Design
## Competency Assessment Scheduling Application

---

## Purpose

This document defines **explicit user journeys** and translates them into **screen inventories and wireframe‑agnostic UI requirements** to guide **Kiro‑driven UI/UX design**.

It is authoritative. Kiro must design UI screens, states, and transitions **only** within the boundaries defined here, the PRD, and the UX Contract.

---

## Global UX Assumptions (Binding)

- The system is **admin‑orchestrated**, not self‑service
- Users interact through **role‑specific screens**
- No screen implies certification or qualification authority
- Capacity is enforced at the **Visit level** only
- Bookings become immutable once **Locked**
- Each screen represents **one primary entity**

---

# Screen Inventories & UI Requirements (Per Role)

---

## Role: CPOR

### CPOR Dashboard

**Purpose**  
Entry point for scheduling requests.

**UI Components**
- Table: Existing Scheduling Requests  
  - Columns: Request ID, Status, Submitted Date
- Primary CTA: `Request Scheduling`

**States**
- Empty (no requests yet)
- List (existing requests)

---

### Create Scheduling Request

**Primary Entity**: Scheduling Request

**Forms**
- Participant Selector  
  - Search  
  - Bulk upload (CSV)
- Assessment Type Selector (multi‑select)
- Optional Context Field (free text)

**Rules**
- No date, time, or location fields
- No capacity indicators
- Submit enabled only when required fields are complete

**States**
- Draft
- Submitted → Pending

---

## Role: Administrative Clerk (AC)

### AC Dashboard

**Purpose**  
Operational command center.

**UI Components**
- Table: Pending Scheduling Requests
- Table: Upcoming Visits
- Alerts:
  - Capacity conflicts
  - Upcoming lock windows

---

### Scheduling Request Detail

**Primary Entity**: Scheduling Request

**UI Components**
- Read‑only request summary
- Participant list
- Requested Assessment Types

**Actions**
- `Create Visit`
- `Assign to Existing Visit`

---

### Create / Edit Visit

**Primary Entity**: Scheduled Slot (Visit)

**Forms**
- Date
- Start Time / End Time
- Location
- Capacity

**Rules**
- Capacity applies **only** at the Visit level
- No assessment‑level capacity
- No outcome or certification fields

**States**
- Draft
- Scheduled
- Locked (read‑only except Admin override)

---

### Manage Bookings

**Primary Entity**: Booking

**UI Components**
- Table: Participants  
  - Columns: Name, Booking Status
- Inline status indicators

**Rules**
- One booking per participant per visit
- No edits once booking is Locked

---

## Role: Participant

### Participant Dashboard

**Purpose**  
Awareness and confirmation only.

**UI Components**
- Table: Upcoming Visits  
  - Date  
  - Location  
  - Status

**Rules**
- No edit actions
- No scheduling controls

---

### Visit Detail (Read‑Only)

**Primary Entity**: Booking / Visit

**UI Components**
- Visit summary (date, time, location)
- List: Assessments to be attempted
- Status badge

**Rules**
- Read‑only
- No qualification or certification language

---

## Role: Evaluator

### Evaluator Dashboard

**Purpose**  
Day‑of execution.

**UI Components**
- List: Today’s Visits

---

### Conduct Assessments

**Primary Entity**: Assessment Participation

**UI Components**
- Participant list
- For each participant:
  - Assessment Type selector
  - Outcome selector (Pass / Fail / Incomplete)
  - Notes field (optional)

**Rules**
- Outcomes immutable after finalization
- No scheduling or capacity controls

**States**
- In Progress
- Finalized

---

## Role: Supervisor

### Results Review Dashboard

**Purpose**  
Oversight and monitoring.

**UI Components**
- Filters:
  - Visit
  - Participant
  - Date range
- Table: Assessment Outcomes

**Rules**
- Read‑only
- No editing or export actions
- No qualification language

---

## Role: Admin / AC / Supervisor

### Results Export

**Primary Entity**: Results Export / Handoff

**Forms**
- Scope selector:
  - Visit
  - Participant
  - Date Range
- Format selector:
  - CSV
  - PDF
  - Email

**UI Components**
- Export history table  
  - Timestamp  
  - Scope  
  - Status

**Rules**
- Exports are immutable
- No re‑import or overwrite flows

---

# Cross‑Cutting UI States

## Booking Lifecycle States (UI‑Visible)

- Draft
- Scheduled
- Locked
- Completed
- Exported
- Cancelled

**Locked State Requirements**
- All edit controls disabled
- Reason and timestamp displayed

---

## Error & Edge States

- Capacity exceeded (Visit‑level only)
- Booking lock conflict
- Export failure (retry visible)

---

## Design Enforcement for Kiro

Kiro must:
- Generate screens **only** from this inventory
- Respect entity boundaries per screen
- Enforce locked and read‑only states visually
- Avoid all forbidden UX patterns defined in the UX Contract

---

## Success Criteria

A successful UI:
- Allows each role to complete tasks without ambiguity
- Makes Visit structure unmistakably clear
- Never implies certification or qualification authority

---
``