// Assignment data types and mock data

export interface Assignment {
  id: number;
  platName: string;
  description: string;
  mwc: string;
  type: string;
  completedUnits: number;
  totalUnits: number;
  ads: number;
  monthPlan: number;
  dueDate: string;
  status: string;
  assignees: Assignee[];
}

export interface Assignee {
  id: number;
  name: string;
  email?: string;
  role?: string;
}

export type AssignmentStatus = 
  | 'Unassigned' 
  | 'Pending Review' 
  | 'Assigned' 
  | 'Pending Close' 
  | 'In Progress' 
  | 'Complete';

// Mock assignees pool
const mockAssignees = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@pge.com', role: 'Inspector' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@pge.com', role: 'Supervisor' },
  { id: 3, name: 'Carol Davis', email: 'carol.davis@pge.com', role: 'Inspector' },
  { id: 4, name: 'David Wilson', email: 'david.wilson@pge.com', role: 'Inspector' },
  { id: 5, name: 'Emma Brown', email: 'emma.brown@pge.com', role: 'Inspector' },
  { id: 6, name: 'Frank Miller', email: 'frank.miller@pge.com', role: 'Inspector' },
  { id: 7, name: 'Grace Lee', email: 'grace.lee@pge.com', role: 'Inspector' },
  { id: 8, name: 'Henry Garcia', email: 'henry.garcia@pge.com', role: 'Inspector' },
  { id: 9, name: 'Ivy Martinez', email: 'ivy.martinez@pge.com', role: 'Supervisor' },
  { id: 10, name: 'Jack Anderson', email: 'jack.anderson@pge.com', role: 'Inspector' },
];

// Mock data - in a real app this would come from an API/database
export const assignmentsData: Assignment[] = [
  {
    id: 1,
    platName: 'TT1245',
    description: 'GRND-NB-40-TT1245',
    mwc: 'SAN LUIS OBISPO',
    type: 'BFA',
    completedUnits: 0,
    totalUnits: 36,
    ads: 0,
    monthPlan: 5,
    dueDate: '06/15/2025',
    status: 'Unassigned',
    assignees: [],
  },
  {
    id: 2,
    platName: 'TT12',
    description: 'GRND-NB-40-TT1245',
    mwc: 'SAN LUIS OBISPO',
    type: 'BFA',
    completedUnits: 0,
    totalUnits: 50,
    ads: 0,
    monthPlan: 4,
    dueDate: '06/15/2025',
    status: 'Pending Review',
    assignees: [mockAssignees[0], mockAssignees[1]],
  },
  {
    id: 3,
    platName: 'TT13',
    description: 'GRND-NB-40-TT1245',
    mwc: 'SAN LUIS OBISPO',
    type: 'BFA',
    completedUnits: 0,
    totalUnits: 120,
    ads: 0,
    monthPlan: 3,
    dueDate: '06/15/2025',
    status: 'Unassigned',
    assignees: [],
  },
  {
    id: 4,
    platName: 'TT1305',
    description: 'GRND-NB-40-TT1245',
    mwc: 'SAN LUIS OBISPO',
    type: 'BFA',
    completedUnits: 0,
    totalUnits: 100,
    ads: 0,
    monthPlan: 4,
    dueDate: '06/15/2025',
    status: 'Assigned',
    assignees: [mockAssignees[2], mockAssignees[3], mockAssignees[4]],
  },
  {
    id: 5,
    platName: 'TT1306',
    description: 'GRND-NB-40-TT1245',
    mwc: 'SAN LUIS OBISPO',
    type: 'BFA',
    completedUnits: 0,
    totalUnits: 100,
    ads: 0,
    monthPlan: 5,
    dueDate: '06/15/2025',
    status: 'Pending Close',
    assignees: [mockAssignees[5], mockAssignees[6]],
  },
  {
    id: 6,
    platName: 'TT1400',
    description: 'GRND-NB-40-TT1400',
    mwc: 'SANTA MARIA',
    type: 'BFB',
    completedUnits: 12,
    totalUnits: 80,
    ads: 2,
    monthPlan: 6,
    dueDate: '07/20/2025',
    status: 'In Progress',
    assignees: [mockAssignees[7], mockAssignees[8], mockAssignees[9], mockAssignees[0]],
  },
  {
    id: 7,
    platName: 'TT1500',
    description: 'GRND-NB-40-TT1500',
    mwc: 'TEMPLETON',
    type: 'BFA',
    completedUnits: 45,
    totalUnits: 45,
    ads: 0,
    monthPlan: 5,
    dueDate: '05/30/2025',
    status: 'Complete',
    assignees: [mockAssignees[1]],
  },
];

// Generate additional 200 assignments
const generateAdditionalAssignments = (): Assignment[] => {
  const additionalAssignments: Assignment[] = [];
  const mwcs = ['SAN LUIS OBISPO', 'SANTA MARIA', 'TEMPLETON', 'HOLLISTER', 'KING CITY', 'MONTEREY', 'SALINAS', 'SANTA CRUZ', 'WATSONVILLE', 'CUPERTINO', 'ANTIOCH', 'CONCORD', 'OAKPORT', 'RICHMOND', 'AUBERRY', 'COALINGA', 'DINUBA', 'FRESNO', 'LEMOORE', 'SELMA'];
  const types = ['BFA', 'BFB'];
  const statuses: AssignmentStatus[] = ['Unassigned', 'Pending Review', 'Assigned', 'Pending Close', 'In Progress', 'Complete'];
  const prefixes = ['TT', 'GR', 'NB', 'SB', 'EB', 'WB', 'CR', 'DR'];
  
  for (let i = 8; i <= 207; i++) {
    const randomMwc = mwcs[Math.floor(Math.random() * mwcs.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(Math.random() * 9999) + 1000;
    
    // Generate random units
    const totalUnits = Math.floor(Math.random() * 200) + 20;
    const completedUnits = randomStatus === 'Complete' ? totalUnits : 
                          randomStatus === 'In Progress' ? Math.floor(Math.random() * totalUnits) :
                          randomStatus === 'Unassigned' ? 0 : Math.floor(Math.random() * totalUnits * 0.3);
    
    // Generate random assignees based on status
    let assignees: typeof mockAssignees = [];
    if (randomStatus !== 'Unassigned') {
      const numAssignees = Math.floor(Math.random() * 4) + 1; // 1-4 assignees
      const shuffled = [...mockAssignees].sort(() => 0.5 - Math.random());
      assignees = shuffled.slice(0, numAssignees);
    }
    
    // Generate random dates
    const baseDate = new Date('2025-01-01');
    const randomDays = Math.floor(Math.random() * 365);
    const dueDate = new Date(baseDate);
    dueDate.setDate(baseDate.getDate() + randomDays);
    
    additionalAssignments.push({
      id: i,
      platName: `${randomPrefix}${randomNumber}`,
      description: `GRND-${randomPrefix}-${Math.floor(Math.random() * 100)}-${randomPrefix}${randomNumber}`,
      mwc: randomMwc,
      type: randomType,
      completedUnits: completedUnits,
      totalUnits: totalUnits,
      ads: Math.floor(Math.random() * 10),
      monthPlan: Math.floor(Math.random() * 12) + 1,
      dueDate: dueDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      status: randomStatus,
      assignees: assignees,
    });
  }
  
  return additionalAssignments;
};

// Combine original and additional assignments
export const allAssignments = [...assignmentsData, ...generateAdditionalAssignments()];

// Service functions for data operations
export class AssignmentService {
  // Simulate API call to fetch assignments
  static async fetchAssignments(): Promise<Assignment[]> {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allAssignments);
      }, 100); // Simulate network delay
    });
  }

  // Filter assignments by search term
  static filterAssignments(assignments: Assignment[], searchTerm: string): Assignment[] {
    if (!searchTerm) return assignments;
    
    const searchLower = searchTerm.toLowerCase();
    return assignments.filter((assignment) => 
      assignment.platName.toLowerCase().includes(searchLower) ||
      assignment.description.toLowerCase().includes(searchLower) ||
      assignment.mwc.toLowerCase().includes(searchLower) ||
      assignment.type.toLowerCase().includes(searchLower) ||
      `${assignment.completedUnits}/${assignment.totalUnits}`.toLowerCase().includes(searchLower) ||
      assignment.ads.toString().includes(searchLower) ||
      assignment.monthPlan.toString().includes(searchLower) ||
      assignment.dueDate.toLowerCase().includes(searchLower) ||
      assignment.status.toLowerCase().includes(searchLower) ||
      // Search through assignee names
      assignment.assignees.some(assignee => 
        assignee.name.toLowerCase().includes(searchLower) ||
        (assignee.email && assignee.email.toLowerCase().includes(searchLower)) ||
        (assignee.role && assignee.role.toLowerCase().includes(searchLower))
      )
    );
  }

  // Filter by status
  static filterByStatus(assignments: Assignment[], statuses: AssignmentStatus[]): Assignment[] {
    if (statuses.length === 0) return assignments;
    return assignments.filter(assignment => statuses.includes(assignment.status as AssignmentStatus));
  }

  // Filter by MWC
  static filterByMWC(assignments: Assignment[], mwcs: string[]): Assignment[] {
    if (mwcs.length === 0) return assignments;
    return assignments.filter(assignment => mwcs.includes(assignment.mwc));
  }

  // Filter by type
  static filterByType(assignments: Assignment[], types: string[]): Assignment[] {
    if (types.length === 0) return assignments;
    return assignments.filter(assignment => types.includes(assignment.type));
  }

  // Get unique values for filter options
  static getUniqueStatuses(assignments: Assignment[]): AssignmentStatus[] {
    return [...new Set(assignments.map(a => a.status))] as AssignmentStatus[];
  }

  static getUniqueMWCs(assignments: Assignment[]): string[] {
    return [...new Set(assignments.map(a => a.mwc))].sort();
  }

  static getUniqueTypes(assignments: Assignment[]): string[] {
    return [...new Set(assignments.map(a => a.type))].sort();
  }

  // Simulate updating an assignment
  static async updateAssignment(id: number, updates: Partial<Assignment>): Promise<Assignment> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = assignmentsData.findIndex(a => a.id === id);
        if (index !== -1) {
          assignmentsData[index] = { ...assignmentsData[index], ...updates };
          resolve(assignmentsData[index]);
        } else {
          reject(new Error('Assignment not found'));
        }
      }, 100);
    });
  }

  // Simulate creating a new assignment
  static async createAssignment(assignment: Omit<Assignment, 'id'>): Promise<Assignment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = Math.max(...assignmentsData.map(a => a.id)) + 1;
        const newAssignment = { ...assignment, id: newId };
        assignmentsData.push(newAssignment);
        resolve(newAssignment);
      }, 100);
    });
  }

  // Simulate deleting an assignment
  static async deleteAssignment(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = assignmentsData.findIndex(a => a.id === id);
        if (index !== -1) {
          assignmentsData.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error('Assignment not found'));
        }
      }, 100);
    });
  }
}
