# UX Contract
## Competency Assessment Scheduling Application

---

## 1. Purpose

This UX Contract defines **non‑negotiable UX rules** derived from the system’s conceptual model.

It exists to:
- Lock vocabulary
- Prevent scope creep
- Prevent implied certification authority
- Keep user mental models aligned

---

## 2. Vocabulary Contract (Hard Rules)

| Term | Meaning |
|----|----|
| Assessment Type | Definition of a competency |
| Scheduling Request | Administrative intent |
| Visit / Scheduled Slot | Real‑world assessment session |
| Booking | Attendance at a visit |
| Assessment Participation | Attempt of a specific assessment |
| Results Export | Output leaving the system |

### Forbidden Language
The UI MUST NOT use:
- Certified
- Qualified
- Credentialed
- Eligible
- System of Record

---

## 3. Entity → UX Ownership

### 3.1 Assessment Type
- Never appears on calendars
- Never shown as “scheduled”
- Always reusable definitions

✅ “Tree Climbing (Assessment Type)”  
❌ “Tree Climbing Session”

---

### 3.2 Scheduling Request
- Intent only
- No dates, times, or locations
- Pending until fulfilled

---

### 3.3 Visit (Scheduled Slot)
- Date, time, and location required
- **Capacity displayed only at Visit level**
- Never framed as an assessment itself

✅ “Oakland Yard – March 12, 9:00–3:00”

---

### 3.4 Booking
- One booking per participant per visit
- Displays visit info + assessment list
- Status‑driven UX

#### Booking States (UX‑Visible)
- Draft
- Scheduled
- Locked
- Completed
- Cancelled
- Exported

Once **Locked**, all edit controls must be disabled.

---

### 3.5 Assessment Participation
- Created only during or after a visit
- Outcome immutable after finalization
- Outcome labels strictly limited

✅ Pass / Fail / Incomplete  
❌ Certified / Qualified

---

### 3.6 Results Export
- Explicitly framed as outputs
- Read‑only
- No re‑import or edit flows

---

## 4. Role‑Based Guarantees

### Participants
- Cannot self‑schedule
- Cannot edit bookings
- Cannot see other participants
- Cannot infer certification status

### Evaluators
- Can record outcomes
- Cannot modify scheduling
- Cannot redefine assessments

### Admin / AC
- Full orchestration control
- Responsible for correctness and auditability

---

## 5. Explicit Anti‑Patterns (Forbidden)

- Calendars grouped by Assessment Type
- “Enroll” or “Register” CTAs
- Assessment‑level capacity indicators
- Editable results after completion
- Any UI implying certification authority

---

## 6. Design Review Checklist

Before approval:
- [ ] Correct entity names
- [ ] No forbidden language
- [ ] Visit‑level capacity only
- [ ] Locked state enforced
- [ ] No implied qualification logic

---

## 7. Contract Enforcement

This UX Contract:
- Overrides individual interpretation
- Must be referenced in design reviews
- Changes only with Product approval

---
``