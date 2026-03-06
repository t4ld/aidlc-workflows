// Database service for real database integration
// This file shows how you would structure database operations

import { Assignment, AssignmentStatus } from './assignmentsData';

// Example configuration for different database types
interface DatabaseConfig {
  type: 'postgresql' | 'mysql' | 'mongodb' | 'api';
  connectionString?: string;
  apiEndpoint?: string;
  apiKey?: string;
}

export class DatabaseService {
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  // Example PostgreSQL/MySQL implementation
  async fetchAssignments(): Promise<Assignment[]> {
    switch (this.config.type) {
      case 'postgresql':
      case 'mysql':
        return this.fetchFromSQL();
      case 'mongodb':
        return this.fetchFromMongoDB();
      case 'api':
        return this.fetchFromAPI();
      default:
        throw new Error('Unsupported database type');
    }
  }

  private async fetchFromSQL(): Promise<Assignment[]> {
    // Example SQL query structure
    const query = `
      SELECT 
        id,
        plat_name as "platName",
        description,
        mwc,
        type,
        units,
        ads,
        month_plan as "monthPlan",
        due_date as "dueDate",
        status,
        assignees
      FROM assignments 
      WHERE deleted_at IS NULL
      ORDER BY id DESC
    `;
    
    // This would use a database client like pg, mysql2, or an ORM like Prisma
    // const result = await db.query(query);
    // return result.rows;
    
    // For demo purposes, return empty array
    console.log('SQL Query:', query);
    return [];
  }

  private async fetchFromMongoDB(): Promise<Assignment[]> {
    // Example MongoDB query structure
    const query = {
      deleted_at: { $exists: false }
    };
    
    // This would use MongoDB driver or Mongoose
    // const assignments = await db.collection('assignments').find(query).toArray();
    // return assignments;
    
    console.log('MongoDB Query:', query);
    return [];
  }

  private async fetchFromAPI(): Promise<Assignment[]> {
    if (!this.config.apiEndpoint) {
      throw new Error('API endpoint not configured');
    }

    try {
      const response = await fetch(`${this.config.apiEndpoint}/assignments`, {
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.assignments || data; // Handle different API response formats
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  async createAssignment(assignment: Omit<Assignment, 'id'>): Promise<Assignment> {
    switch (this.config.type) {
      case 'postgresql':
      case 'mysql': {
        const query = `
          INSERT INTO assignments (plat_name, description, mwc, type, units, ads, month_plan, due_date, status, assignees)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `;
        // const result = await db.query(query, [assignment.platName, assignment.description, ...]);
        // return result.rows[0];
        break;
      }
      case 'mongodb': {
        // const result = await db.collection('assignments').insertOne(assignment);
        // return { ...assignment, id: result.insertedId };
        break;
      }
      case 'api': {
        const response = await fetch(`${this.config.apiEndpoint}/assignments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
          },
          body: JSON.stringify(assignment)
        });
        return await response.json();
      }
    }
    
    throw new Error('Create operation not implemented for this database type');
  }

  async updateAssignment(id: number, updates: Partial<Assignment>): Promise<Assignment> {
    switch (this.config.type) {
      case 'postgresql':
      case 'mysql': {
        const setClause = Object.keys(updates)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(', ');
        
        const query = `
          UPDATE assignments 
          SET ${setClause}, updated_at = NOW()
          WHERE id = $1
          RETURNING *
        `;
        // const values = [id, ...Object.values(updates)];
        // const result = await db.query(query, values);
        // return result.rows[0];
        break;
      }
      case 'mongodb': {
        // const result = await db.collection('assignments').findOneAndUpdate(
        //   { _id: id },
        //   { $set: { ...updates, updated_at: new Date() } },
        //   { returnDocument: 'after' }
        // );
        // return result.value;
        break;
      }
      case 'api': {
        const response = await fetch(`${this.config.apiEndpoint}/assignments/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
          },
          body: JSON.stringify(updates)
        });
        return await response.json();
      }
    }
    
    throw new Error('Update operation not implemented for this database type');
  }

  async deleteAssignment(id: number): Promise<boolean> {
    switch (this.config.type) {
      case 'postgresql':
      case 'mysql': {
        // Soft delete
        const query = `
          UPDATE assignments 
          SET deleted_at = NOW()
          WHERE id = $1
        `;
        // await db.query(query, [id]);
        return true;
      }
      case 'mongodb': {
        // const result = await db.collection('assignments').updateOne(
        //   { _id: id },
        //   { $set: { deleted_at: new Date() } }
        // );
        // return result.modifiedCount > 0;
        break;
      }
      case 'api': {
        const response = await fetch(`${this.config.apiEndpoint}/assignments/${id}`, {
          method: 'DELETE',
          headers: {
            ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
          }
        });
        return response.ok;
      }
    }
    
    return false;
  }

  // Advanced filtering for database-level operations
  async fetchAssignmentsWithFilters(filters: {
    search?: string;
    statuses?: AssignmentStatus[];
    mwcs?: string[];
    types?: string[];
    dateRange?: { start: string; end: string };
  }): Promise<Assignment[]> {
    switch (this.config.type) {
      case 'postgresql':
      case 'mysql': {
        let query = 'SELECT * FROM assignments WHERE deleted_at IS NULL';
        const params: any[] = [];
        let paramIndex = 1;

        if (filters.search) {
          query += ` AND (plat_name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
          params.push(`%${filters.search}%`);
          paramIndex++;
        }

        if (filters.statuses && filters.statuses.length > 0) {
          query += ` AND status = ANY($${paramIndex})`;
          params.push(filters.statuses);
          paramIndex++;
        }

        if (filters.mwcs && filters.mwcs.length > 0) {
          query += ` AND mwc = ANY($${paramIndex})`;
          params.push(filters.mwcs);
          paramIndex++;
        }

        if (filters.types && filters.types.length > 0) {
          query += ` AND type = ANY($${paramIndex})`;
          params.push(filters.types);
          paramIndex++;
        }

        if (filters.dateRange) {
          query += ` AND due_date BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
          params.push(filters.dateRange.start, filters.dateRange.end);
          paramIndex += 2;
        }

        query += ' ORDER BY id DESC';

        // const result = await db.query(query, params);
        // return result.rows;
        console.log('Filtered SQL Query:', query, params);
        return [];
      }
      case 'api': {
        const searchParams = new URLSearchParams();
        if (filters.search) searchParams.append('search', filters.search);
        if (filters.statuses) searchParams.append('statuses', filters.statuses.join(','));
        if (filters.mwcs) searchParams.append('mwcs', filters.mwcs.join(','));
        if (filters.types) searchParams.append('types', filters.types.join(','));
        if (filters.dateRange) {
          searchParams.append('startDate', filters.dateRange.start);
          searchParams.append('endDate', filters.dateRange.end);
        }

        const response = await fetch(`${this.config.apiEndpoint}/assignments?${searchParams}`, {
          headers: {
            ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
          }
        });

        const data = await response.json();
        return data.assignments || data;
      }
      default:
        throw new Error('Filtered fetch not implemented for this database type');
    }
  }
}

// Example usage configurations:

// PostgreSQL configuration
export const postgresConfig: DatabaseConfig = {
  type: 'postgresql',
  connectionString: 'postgresql://user:password@localhost:5432/assignments_db'
};

// API configuration
export const apiConfig: DatabaseConfig = {
  type: 'api',
  apiEndpoint: 'https://api.example.com/v1',
  apiKey: 'your-api-key-here'
};

// MongoDB configuration
export const mongoConfig: DatabaseConfig = {
  type: 'mongodb',
  connectionString: 'mongodb://localhost:27017/assignments_db'
};

// Factory function to create the appropriate service
export function createDatabaseService(config: DatabaseConfig): DatabaseService {
  return new DatabaseService(config);
}
