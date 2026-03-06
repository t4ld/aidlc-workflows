# Product Requirements Document (PRD)
## Competency Assessment Scheduling Application

---

## 1. Purpose

This document defines the product requirements for the **Competency Assessment Scheduling Application**.

The application coordinates and records **Competency Assessment participation** by managing assessment definitions, visit scheduling, participant attendance, and assessment outcomes.

> **This application does not determine qualification status or certification validity.**  
> Qualification decisions and long‑term verification are handled outside the system.

---

## 2. Goals

### Primary Goals
- Enable **admin‑orchestrated scheduling**
- Support **visit‑based, multi‑assessment participation**
- Record **attendance and assessment outcomes**
- Provide **auditable exports** for downstream use
- Avoid tight coupling to legacy or paid systems

### Non‑Goals
- Acting as a system of record for qualifications
- Determining eligibility or certification validity
- Participant self‑scheduling
- Real‑time compliance adjudication

---

## 3. Roles

| Role | Description |
|----|----|
| CPOR | Initiates scheduling requests |
| Administrative Clerk (AC) | Orchestrates scheduling and validation |
| Supervisor | Oversees operational execution |
| Qualified Evaluator | Conducts assessments and records outcomes |
| Participant | Attends scheduled visits |
| Admin | Manages configuration and governance |

---

## 4. Conceptual Model

The system is **visit‑centric**, not assessment‑centric.

### 4.1 Core Entities

#### Assessment Type
- Definition of a competency
- Reusable across visits
- Never scheduled directly

#### Scheduling Request
- Administrative intent to schedule participants
- No date, time, or location
- Fulfilled by AC

#### Scheduled Slot (Visit)
- Real‑world assessment session
- Anchored to date, time, and location
- **Capacity is enforced at the Visit level**
- May include multiple assessment types

#### Booking
- A participant’s attendance at a Visit
- One booking per participant per visit
- Contains multiple