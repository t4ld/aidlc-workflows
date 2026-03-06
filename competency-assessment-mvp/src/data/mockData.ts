import {
  SchedulingRequest,
  Visit,
  Booking,
  AssessmentParticipation,
  ResultsExport,
} from '../types';

export const ASSESSMENT_TYPES = [
  'Tree Climbing',
  'Pole Top Rescue',
  'Bucket Operations',
  'Confined Space Entry',
];

export const LOCATIONS = [
  'Oakland Yard',
  'Sacramento Training Center',
  'Fresno Field Office',
];

export const mockRequests: SchedulingRequest[] = [
  {
    id: 'R-001',
    status: 'Pending',
    submittedBy: 'John Smith (CPOR)',
    submittedDate: '2026-03-01',
    participants: ['Alice Johnson', 'Bob Williams', 'Carol Davis'],
    assessmentTypes: ['Tree Climbing', 'Pole Top Rescue'],
    context: 'Quarterly assessment cycle for Oakland crew',
  },
  {
    id: 'R-002',
    status: 'Fulfilled',
    submittedBy: 'Jane Doe (CPOR)',
    submittedDate: '2026-02-28',
    participants: ['David Brown', 'Emma Wilson'],
    assessmentTypes: ['Bucket Operations'],
  },
  {
    id: 'R-003',
    status: 'Pending',
    submittedBy: 'John Smith (CPOR)',
    submittedDate: '2026-03-03',
    participants: ['Frank Miller', 'Grace Lee', 'Henry Chen', 'Iris Martinez'],
    assessmentTypes: ['Confined Space Entry', 'Pole Top Rescue'],
    context: 'New hire assessment requirements',
  },
];

export const mockVisits: Visit[] = [
  {
    id: 'V-123',
    date: '2026-03-12',
    startTime: '09:00',
    endTime: '15:00',
    location: 'Oakland Yard',
    capacity: 20,
    bookingsCount: 18,
    status: 'Scheduled',
    locked: false,
  },
  {
    id: 'V-124',
    date: '2026-03-05',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Sacramento Training Center',
    capacity: 15,
    bookingsCount: 15,
    status: 'Locked',
    locked: true,
    lockReason: 'Assessment in progress',
    lockedAt: '2026-03-05T08:00:00Z',
  },
  {
    id: 'V-125',
    date: '2026-03-15',
    startTime: '10:00',
    endTime: '14:00',
    location: 'Fresno Field Office',
    capacity: 12,
    bookingsCount: 8,
    status: 'Scheduled',
    locked: false,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'B-001',
    visitId: 'V-123',
    participantName: 'Alice Johnson',
    participantId: 'P-101',
    assessmentTypes: ['Tree Climbing', 'Pole Top Rescue'],
    status: 'Scheduled',
    bookedDate: '2026-03-02',
  },
  {
    id: 'B-002',
    visitId: 'V-123',
    participantName: 'Bob Williams',
    participantId: 'P-102',
    assessmentTypes: ['Tree Climbing'],
    status: 'Scheduled',
    bookedDate: '2026-03-02',
  },
  {
    id: 'B-003',
    visitId: 'V-124',
    participantName: 'David Brown',
    participantId: 'P-103',
    assessmentTypes: ['Bucket Operations'],
    status: 'Locked',
    bookedDate: '2026-03-01',
  },
];

export const mockParticipations: AssessmentParticipation[] = [
  {
    id: 'AP-001',
    bookingId: 'B-003',
    participantName: 'David Brown',
    participantId: 'P-103',
    assessmentType: 'Bucket Operations',
    outcome: 'Pass',
    notes: 'Demonstrated proper technique and safety protocols',
    evaluator: 'Mike Evaluator',
    completedAt: '2026-03-05T10:30:00Z',
    finalized: true,
  },
];

export const mockExports: ResultsExport[] = [
  {
    id: 'E-001',
    scope: 'Visit V-124',
    format: 'CSV',
    createdBy: 'Admin User',
    createdAt: '2026-03-05T12:00:00Z',
    status: 'Completed',
    downloadUrl: '/exports/E-001.csv',
  },
  {
    id: 'E-002',
    scope: 'Participant P-103',
    format: 'PDF',
    createdBy: 'Supervisor User',
    createdAt: '2026-03-05T14:30:00Z',
    status: 'Completed',
    downloadUrl: '/exports/E-002.pdf',
  },
];

export const PARTICIPANTS = [
  { id: 'P-101', name: 'Alice Johnson' },
  { id: 'P-102', name: 'Bob Williams' },
  { id: 'P-103', name: 'David Brown' },
  { id: 'P-104', name: 'Emma Wilson' },
  { id: 'P-105', name: 'Frank Miller' },
  { id: 'P-106', name: 'Grace Lee' },
  { id: 'P-107', name: 'Henry Chen' },
  { id: 'P-108', name: 'Iris Martinez' },
  { id: 'P-109', name: 'Carol Davis' },
];
