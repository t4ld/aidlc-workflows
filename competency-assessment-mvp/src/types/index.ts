export type UserRole = 'cpor' | 'ac' | 'participant' | 'evaluator' | 'supervisor';

export type RequestStatus = 'Draft' | 'Pending' | 'Fulfilled' | 'Cancelled';
export type VisitStatus = 'Draft' | 'Scheduled' | 'Locked' | 'Completed' | 'Cancelled';
export type BookingStatus = 'Draft' | 'Scheduled' | 'Locked' | 'Completed' | 'Cancelled';
export type ParticipationOutcome = 'Pass' | 'Fail' | 'Incomplete';
export type ParticipationStatus = 'Not Started' | 'In Progress' | 'Pass' | 'Fail' | 'Incomplete';
export type ExportStatus = 'Pending' | 'Completed' | 'Failed';

export interface SchedulingRequest {
  id: string;
  status: RequestStatus;
  submittedBy: string;
  submittedDate: string;
  participants: string[];
  assessmentTypes: string[];
  context?: string;
}

export interface Visit {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  bookingsCount: number;
  status: VisitStatus;
  locked: boolean;
  lockReason?: string;
  lockedAt?: string;
}

export interface Booking {
  id: string;
  visitId: string;
  participantName: string;
  participantId: string;
  assessmentTypes: string[];
  status: BookingStatus;
  bookedDate: string;
}

export interface AssessmentParticipation {
  id: string;
  bookingId: string;
  participantName: string;
  participantId: string;
  assessmentType: string;
  outcome?: ParticipationOutcome;
  notes?: string;
  evaluator?: string;
  completedAt?: string;
  finalized: boolean;
}

export interface ResultsExport {
  id: string;
  scope: string;
  format: 'CSV' | 'PDF' | 'Email';
  createdBy: string;
  createdAt: string;
  status: ExportStatus;
  downloadUrl?: string;
  emailRecipients?: string[];
}
