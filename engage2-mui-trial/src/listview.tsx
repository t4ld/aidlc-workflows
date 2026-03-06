import { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  AvatarGroup,
  Paper,
  Tooltip,
  Typography,
  Pagination,
  Checkbox,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CardRow from './components/CardRow';
import FilterDrawer from './components/FilterDrawer';
import StatusChip from './components/StatusChip';
import FilterToolbar from './components/FilterToolbar';
import SelectionToolbar from './components/SelectionToolbar';
import { Assignment, AssignmentService, Assignee } from './data/assignmentsData';
import { getInitials, getAssigneeTooltip } from './utils/assigneeUtils';
import { getMainWorkCentersByDivisions } from './data/divisionData';

export function ListView() {
  const [searchValue, setSearchValue] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(25);

  // Load filter state from localStorage or use defaults
  const getInitialFilterState = () => {
    try {
      const savedFilters = localStorage.getItem('assignmentFilters');
      if (savedFilters) {
        return JSON.parse(savedFilters);
      }
    } catch (error) {
      console.error('Error loading saved filters:', error);
    }
    
    // Default filter state
    return {
      divisions: [],
      mainWorkCenters: [],
      workTypes: [],
      monthPlans: [],
      dueDates: [],
      statuses: [],
    };
  };

  const [activeFilters, setActiveFilters] = useState<{
    divisions: string[];
    mainWorkCenters: string[];
    workTypes: string[];
    monthPlans: string[];
    dueDates: string[];
    statuses: string[];
  }>(getInitialFilterState);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('assignmentFilters', JSON.stringify(activeFilters));
    } catch (error) {
      console.error('Error saving filters:', error);
    }
  }, [activeFilters]);

  // Load assignments on component mount
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setIsLoading(true);
        console.log('Loading assignments...');
        const data = await AssignmentService.fetchAssignments();
        console.log('Assignments loaded:', data.length, data);
        setAssignments(data);
      } catch (error) {
        console.error('Error loading assignments:', error);
      } finally {
        setIsLoading(false);
        console.log('Loading finished');
      }
    };

    loadAssignments();
  }, []);

  const handleFilterDrawerToggle = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const handleFilterDrawerClose = () => {
    setIsFilterDrawerOpen(false);
  };

  const handleFiltersChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setPage(0); // Reset to first page when filters change
  };

  const handleChipDelete = (chipLabel: string) => {
    const newFilters = { ...activeFilters };
    
    // Check which category this chip belongs to and remove it
    if (newFilters.divisions.includes(chipLabel)) {
      newFilters.divisions = newFilters.divisions.filter(item => item !== chipLabel);
      
      // Also remove any main work centers that belong to this division
      const remainingMainWorkCenters = getMainWorkCentersByDivisions(newFilters.divisions);
      newFilters.mainWorkCenters = newFilters.mainWorkCenters.filter(mwc =>
        remainingMainWorkCenters.some(available => available.label === mwc)
      );
    } else if (newFilters.mainWorkCenters.includes(chipLabel)) {
      newFilters.mainWorkCenters = newFilters.mainWorkCenters.filter(item => item !== chipLabel);
    } else if (newFilters.workTypes.includes(chipLabel)) {
      newFilters.workTypes = newFilters.workTypes.filter(item => item !== chipLabel);
    } else if (newFilters.statuses.includes(chipLabel)) {
      newFilters.statuses = newFilters.statuses.filter(item => item !== chipLabel);
    } else if (chipLabel.startsWith('Month Plan: ')) {
      // Handle month plan chips with prefix
      const monthValue = chipLabel.replace('Month Plan: ', '');
      newFilters.monthPlans = newFilters.monthPlans.filter(item => item !== monthValue);
    } else if (newFilters.dueDates.includes(chipLabel)) {
      newFilters.dueDates = newFilters.dueDates.filter(item => item !== chipLabel);
    }
    
    setActiveFilters(newFilters);
    setPage(0); // Reset to first page when filters change
  };

  const handleRowSelection = (assignmentId: number, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, assignmentId]);
    } else {
      setSelectedRows(prev => prev.filter(id => id !== assignmentId));
    }
  };

  const handleDeselect = () => {
    setSelectedRows([]);
  };

  const handleAssign = () => {
    // TODO: Implement assignment functionality
    console.log('Assign selected rows:', selectedRows);
  };

  // Filter assignments based on search value and active filters
  const filteredAssignments = AssignmentService.filterAssignments(assignments, searchValue);
  
  // Apply additional filters from FilterDrawer
  const fullyFilteredAssignments = filteredAssignments.filter(assignment => {
    // Filter by divisions (check if assignment's MWC belongs to selected divisions)
    if (activeFilters.divisions.length > 0) {
      // Get all main work centers for selected divisions
      const divisionsMainWorkCenters = getMainWorkCentersByDivisions(activeFilters.divisions);
      const divisionsMainWorkCenterLabels = divisionsMainWorkCenters.map(mwc => mwc.label);
      
      // Check if assignment's MWC is in the selected divisions
      if (!divisionsMainWorkCenterLabels.includes(assignment.mwc)) {
        return false;
      }
    }
    
    // Filter by main work centers
    if (activeFilters.mainWorkCenters.length > 0) {
      if (!activeFilters.mainWorkCenters.includes(assignment.mwc)) {
        return false;
      }
    }
    
    // Filter by work types
    if (activeFilters.workTypes.length > 0) {
      const workTypeMatches = activeFilters.workTypes.some(workType => {
        // Handle the "BFA - Overhead Patrol" format by checking if assignment type matches the prefix
        if (workType.includes(' - ')) {
          const typePrefix = workType.split(' - ')[0];
          return assignment.type === typePrefix;
        }
        return assignment.type === workType;
      });
      if (!workTypeMatches) {
        return false;
      }
    }
    
    // Filter by statuses
    if (activeFilters.statuses.length > 0) {
      if (!activeFilters.statuses.includes(assignment.status)) {
        return false;
      }
    }
    
    // Filter by month plans
    if (activeFilters.monthPlans.length > 0) {
      if (!activeFilters.monthPlans.includes(assignment.monthPlan.toString())) {
        return false;
      }
    }
    
    // Filter by due dates (you can implement date range filtering here)
    if (activeFilters.dueDates.length > 0) {
      // For now, just check if the due date string is included
      const dueDateMatches = activeFilters.dueDates.some(dateFilter => 
        assignment.dueDate.includes(dateFilter)
      );
      if (!dueDateMatches) {
        return false;
      }
    }
    
    return true;
  });
  
  console.log('Filter results:', {
    totalAssignments: assignments.length,
    searchValue,
    searchFilteredCount: filteredAssignments.length,
    fullyFilteredCount: fullyFilteredAssignments.length,
    activeFilters
  });

  // Ensure we have valid data for the grid - with additional safety checks
  const safeFilteredAssignments = Array.isArray(fullyFilteredAssignments) 
    ? fullyFilteredAssignments.filter(item => item && typeof item.id !== 'undefined')
    : [];

  // Manual pagination
  const totalRows = safeFilteredAssignments.length;
  const totalPages = Math.ceil(totalRows / pageSize);
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedAssignments = safeFilteredAssignments.slice(startIndex, endIndex);
  
  console.log('Pagination data:', {
    totalRows,
    totalPages,
    page,
    pageSize,
    startIndex,
    endIndex,
    paginatedCount: paginatedAssignments.length
  });

  // Selection helpers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedAssignments.map(assignment => assignment.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const isAllSelected = paginatedAssignments.length > 0 && 
    paginatedAssignments.every(assignment => selectedRows.includes(assignment.id));
  const isIndeterminate = selectedRows.length > 0 && !isAllSelected;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
  };

  // Only calculate selections if we have valid data
  const selectedAssignments = paginatedAssignments.length > 0 
    ? safeFilteredAssignments.filter(assignment => 
        selectedRows.includes(assignment.id)
      )
    : [];

  const totalSelectedUnits = selectedAssignments.reduce((sum, assignment) => {
    return sum + assignment.totalUnits;
  }, 0);

  const columns: GridColDef[] = [
    {
      field: 'selection',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={(e) => handleSelectAll(e.target.checked)}
          size="small"
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedRows.includes(params.row.id)}
          onChange={(e) => handleRowSelection(params.row.id, e.target.checked)}
          size="small"
        />
      ),
    },
    {
      field: 'platName',
      headerName: 'Plat Name',
      width: 110,
      sortable: true,
      filterable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      sortable: true,
      filterable: true,
    },
    {
      field: 'mwc',
      headerName: 'MWC',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 80,
      sortable: true,
      filterable: true,
    },
    {
      field: 'units',
      headerName: 'Units',
      width: 100,
      type: 'string',
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        `${params.row.completedUnits}/${params.row.totalUnits}`
      ),
    },
    {
      field: 'ads',
      headerName: 'A.D.s',
      width: 80,
      type: 'number',
      sortable: true,
      filterable: true,
    },
    {
      field: 'monthPlan',
      headerName: 'Mo. Plan',
      width: 100,
      type: 'number',
      sortable: true,
      filterable: true,
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 120,
      type: 'string',
      sortable: true,
      filterable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 135,
      display: 'flex',
      headerAlign: 'center',
      align: 'center',
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        <StatusChip
          status={params.value as string}
        />
      ),
    },
    {
      field: 'assignees',
      headerName: 'Assignees',
      width: 120,
      display: 'flex',
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const assignees: Assignee[] = params.value || [];
        
        if (assignees.length === 0) {
          return (
            <Tooltip title="No assignees">
              <Avatar sx={{ bgcolor: '#e0e0e0', width: 24, height: 24, fontSize: '11px', color: '#757575' }}>
                --
              </Avatar>
            </Tooltip>
          );
        }

        return (
          <Tooltip title={getAssigneeTooltip(assignees)}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '11px' } }}>
              {assignees.map((assignee: Assignee, index: number) => (
                <Avatar 
                  key={assignee.id || index}
                  sx={{ 
                    width: 24, 
                    height: 24,
                    fontSize: '11px',
                    fontWeight: 500
                  }}
                >
                  {getInitials(assignee.name)}
                </Avatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        );
      },
    },
  ];

  // Generate filter chips from active filters with appropriate prefixes
  const filterChips = [
    ...activeFilters.divisions,
    ...activeFilters.mainWorkCenters,
    ...activeFilters.workTypes,
    ...activeFilters.statuses,
    ...activeFilters.monthPlans.map(month => `Month Plan: ${month}`),
    ...activeFilters.dueDates,
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 48px)' }}>
      {/* Filter Drawer - positioned within ListView */}
      <FilterDrawer
        open={isFilterDrawerOpen}
        onClose={handleFilterDrawerClose}
        onFiltersChange={handleFiltersChange}
        initialFilters={activeFilters}
      />
      
      {/* Main Content */}
      <Box 
        sx={{ 
          flex: 1, 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          minWidth: 0, // Allows the box to shrink below its content size
        }}
      >
        {/* Toolbar with filters and search */}
        <FilterToolbar
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
            setPage(0); // Reset to first page when search changes
          }}
          filterChips={filterChips}
          onChipDelete={handleChipDelete}
          onFilterDrawerToggle={handleFilterDrawerToggle}
        />

        {/* KPI Cards */}
        <CardRow />

        {/* Data Grid */}
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Typography>Loading assignments...</Typography>
            </Box>
          ) : (
            <>
              <DataGrid
                rows={paginatedAssignments}
                columns={columns}
                loading={isLoading}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                hideFooter={true}
                autoHeight={false}
                sx={{
                  border: 0,
                  height: '100%',
                  '& .MuiDataGrid-main': {
                    border: 0,
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid rgba(0,0,0,0.12)',
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(0,0,0,0.12)',
                  },
                }}
              />
              
              {/* Custom Pagination Footer */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2, 
                borderTop: '1px solid rgba(0,0,0,0.12)',
                backgroundColor: '#f5f5f5'
              }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalRows)} of {totalRows} assignments
                </Typography>
                <Pagination
                  count={totalPages}
                  page={page + 1}
                  onChange={handlePageChange}
                  color="primary"
                  size="small"
                />
              </Box>
            </>
          )}
        </Paper>
      </Box>

      {/* Selection Toolbar - Fixed at bottom of screen */}
      <SelectionToolbar
        selectedRowsCount={selectedRows.length}
        totalUnits={totalSelectedUnits}
        onDeselect={handleDeselect}
        onAssign={handleAssign}
      />
    </Box>
  );
}
