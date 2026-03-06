import React, { useState, useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { 
  getDivisionOptions, 
  getMainWorkCentersByDivisions,
} from '../data/divisionData';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onFiltersChange?: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

interface FilterState {
  divisions: string[];
  mainWorkCenters: string[];
  workTypes: string[];
  monthPlans: string[];
  dueDates: string[];
  statuses: string[];
}

const workTypeOptions = [
  { label: 'BFA - Overhead Patrol', disabled: false },
  { label: 'BFB - Overhead Inspection', disabled: false },
  { label: 'BFD - Underground Patrol', disabled: true },
  { label: 'BFE - Underground Inspection', disabled: true },
  { label: 'BFF - Manhole Inspections', disabled: true },
  { label: 'Include AOC Work Orders', disabled: false },
];

// Add status options based on the actual assignment data
const statusOptions = [
  { label: 'Unassigned', disabled: false },
  { label: 'Pending Review', disabled: false },
  { label: 'Assigned', disabled: false },
  { label: 'Pending Close', disabled: false },
  { label: 'In Progress', disabled: false },
  { label: 'Complete', disabled: false },
];

const filterSections = [
  'Month Plan',
  'Due Date',
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  onFiltersChange,
  initialFilters,
}) => {
  // State for expanded accordions
  const [expandedAccordions, setExpandedAccordions] = useState<{
    [key: string]: boolean;
  }>({
    division: true,
    workType: true,
    status: true, // Add status accordion as expanded by default
    monthPlan: true, // Add month plan accordion as expanded by default
  });

  // State for filters - use initialFilters if provided
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      divisions: [],
      workTypes: [],
      mainWorkCenters: [],
      monthPlans: [],
      dueDates: [],
      statuses: [],
    }
  );

  // Update filters when initialFilters change
  React.useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleAccordionToggle = (accordion: string) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [accordion]: !prev[accordion],
    }));
  };

  const handleFilterChange = (
    category: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    const newFilters = { ...filters };
    
    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }

    // If we're changing divisions, handle main work centers
    if (category === 'divisions') {
      const newAvailableMainWorkCenters = getMainWorkCentersByDivisions(newFilters.divisions);
      
      if (checked) {
        // Division was selected - auto-select all its main work centers
        const newMainWorkCenters = getMainWorkCentersByDivisions([value]);
        const newMainWorkCenterLabels = newMainWorkCenters.map(mwc => mwc.label);
        newFilters.mainWorkCenters = [...new Set([...newFilters.mainWorkCenters, ...newMainWorkCenterLabels])];
      } else {
        // Division was deselected - remove main work centers that are no longer valid
        newFilters.mainWorkCenters = newFilters.mainWorkCenters.filter(mwc => 
          newAvailableMainWorkCenters.some(available => available.label === mwc)
        );
      }
    }

    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const divisionOptions = getDivisionOptions();
  
  // Calculate available Main Work Centers based on selected divisions
  const availableMainWorkCenters = useMemo(() => {
    return getMainWorkCentersByDivisions(filters.divisions);
  }, [filters.divisions]);

  const workTypeOptions = [
    { label: 'BFA - Overhead Patrol', disabled: false },
    { label: 'BFB - Overhead Inspection', disabled: false },
    { label: 'BFD - Underground Patrol', disabled: true },
    { label: 'BFE - Underground Inspection', disabled: true },
    { label: 'BFF - Manhole Inspections', disabled: true },
    { label: 'Include AOC Work Orders', disabled: false },
  ];

  // Add status options based on the actual assignment data
  const statusOptions = [
    { label: 'Unassigned', disabled: false },
    { label: 'Pending Review', disabled: false },
    { label: 'Assigned', disabled: false },
    { label: 'Pending Close', disabled: false },
    { label: 'In Progress', disabled: false },
    { label: 'Complete', disabled: false },
  ];

  // Month Plan options (1-12 as integer values)
  const monthPlanOptions = [
    { value: '1', label: '1', disabled: false },
    { value: '2', label: '2', disabled: false },
    { value: '3', label: '3', disabled: false },
    { value: '4', label: '4', disabled: false },
    { value: '5', label: '5', disabled: false },
    { value: '6', label: '6', disabled: false },
    { value: '7', label: '7', disabled: false },
    { value: '8', label: '8', disabled: false },
    { value: '9', label: '9', disabled: false },
    { value: '10', label: '10', disabled: false },
    { value: '11', label: '11', disabled: false },
    { value: '12', label: '12', disabled: false },
  ];

  const filterSections = [
    'Due Date',
    // Remove 'Month Plan' from here since we're making it a full accordion
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: open ? 320 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid rgba(0,0,0,0.12)',
          boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.12), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.2)',
          top: '64px', // Position below the AppBar (standard AppBar height is 64px)
          height: 'calc(100vh - 64px)', // Adjust height to account for AppBar
          zIndex: 1200, // Ensure it's below the AppBar (AppBar typically has zIndex 1300+)
        },
      }}
    >
      <List sx={{ padding: 0 }}>
          {/* Header */}
          <ListItem>
            <ListItemText>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: 1.6,
                  color: 'text.primary',
                }}
              >
                Filters
              </Typography>
            </ListItemText>
          </ListItem>
          {/* Division Accordion */}
          <Accordion
            expanded={expandedAccordions.division}
            onChange={() => handleAccordionToggle('division')}
            elevation={0}
            disableGutters
            sx={{
              backgroundColor: 'background.paper',
              '&:before': { display: 'none' },
              '&.MuiAccordion-root': {
                margin: 0,
                '&:before': { display: 'none' },
              },
              '& .MuiAccordionSummary-root': {
                minHeight: 48,
                '&.Mui-expanded': {
                  minHeight: 48,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedAccordions.division ? (
                  <ExpandLessIcon sx={{ color: 'action.active' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: 'action.active' }} />
                )
              }
              sx={{ px: 2, py: 0 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  lineHeight: 1.43,
                  color: 'text.primary',
                }}
              >
                Division
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <FormGroup>
                {divisionOptions.map((division) => (
                  <FormControlLabel
                    key={division}
                    control={
                      <Checkbox
                        checked={filters.divisions.includes(division)}
                        onChange={(e) =>
                          handleFilterChange('divisions', division, e.target.checked)
                        }
                        sx={{
                          color: 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '14px',
                          lineHeight: 1.43,
                          color: 'text.primary',
                        }}
                      >
                        {division}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          {/* Main Work Center Accordion */}
          <Accordion
            expanded={expandedAccordions.mainWorkCenters}
            onChange={() => handleAccordionToggle('mainWorkCenters')}
            elevation={0}
            disableGutters
            sx={{
              backgroundColor: 'background.paper',
              '&:before': { display: 'none' },
              '&.MuiAccordion-root': {
                margin: 0,
                '&:before': { display: 'none' },
              },
              '& .MuiAccordionSummary-root': {
                minHeight: 48,
                '&.Mui-expanded': {
                  minHeight: 48,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedAccordions.mainWorkCenters ? (
                  <ExpandLessIcon sx={{ color: 'action.active' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: 'action.active' }} />
                )
              }
              sx={{ px: 2, py: 0 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  lineHeight: 1.43,
                  color: 'text.primary',
                }}
              >
                Main Work Centers
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <FormGroup>
                {availableMainWorkCenters.map((mainWorkCenter) => (
                  <FormControlLabel
                    key={mainWorkCenter.id}
                    control={
                      <Checkbox
                        checked={filters.mainWorkCenters.includes(mainWorkCenter.label)}
                        onChange={(e) =>
                          handleFilterChange('mainWorkCenters', mainWorkCenter.label, e.target.checked)
                        }
                        disabled={mainWorkCenter.disabled}
                        sx={{
                          color: mainWorkCenter.disabled ? 'text.disabled' : 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '14px',
                          lineHeight: 1.43,
                          color: mainWorkCenter.disabled ? 'text.disabled' : 'text.primary',
                        }}
                      >
                        {mainWorkCenter.label}
                      </Typography>
                    }
                  />
                ))}
                {availableMainWorkCenters.length === 0 && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'IBM Plex Sans',
                      fontSize: '14px',
                      lineHeight: 1.43,
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      px: 2,
                      py: 1,
                    }}
                  >
                    Select a division to see main work centers
                  </Typography>
                )}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          {/* Work Type Accordion */}
          <Accordion
            expanded={expandedAccordions.workType}
            onChange={() => handleAccordionToggle('workType')}
            elevation={0}
            disableGutters
            sx={{
              backgroundColor: 'background.paper',
              '&:before': { display: 'none' },
              '&.MuiAccordion-root': {
                margin: 0,
                '&:before': { display: 'none' },
              },
              '& .MuiAccordionSummary-root': {
                minHeight: 48,
                '&.Mui-expanded': {
                  minHeight: 48,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedAccordions.workType ? (
                  <ExpandLessIcon sx={{ color: 'action.active' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: 'action.active' }} />
                )
              }
              sx={{ px: 2, py: 0 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  lineHeight: 1.43,
                  color: 'text.primary',
                }}
              >
                Work Type
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <FormGroup>
                {workTypeOptions.map((workType) => (
                  <FormControlLabel
                    key={workType.label}
                    control={
                      <Checkbox
                        checked={filters.workTypes.includes(workType.label)}
                        onChange={(e) =>
                          handleFilterChange('workTypes', workType.label, e.target.checked)
                        }
                        disabled={workType.disabled}
                        sx={{
                          color: workType.disabled ? 'text.disabled' : 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '14px',
                          lineHeight: 1.43,
                          color: workType.disabled ? 'text.disabled' : 'text.primary',
                        }}
                      >
                        {workType.label}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          {/* Status Accordion */}
          <Accordion
            expanded={expandedAccordions.status}
            onChange={() => handleAccordionToggle('status')}
            elevation={0}
            disableGutters
            sx={{
              backgroundColor: 'background.paper',
              '&:before': { display: 'none' },
              '&.MuiAccordion-root': {
                margin: 0,
                '&:before': { display: 'none' },
              },
              '& .MuiAccordionSummary-root': {
                minHeight: 48,
                '&.Mui-expanded': {
                  minHeight: 48,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedAccordions.status ? (
                  <ExpandLessIcon sx={{ color: 'action.active' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: 'action.active' }} />
                )
              }
              sx={{ px: 2, py: 0 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  lineHeight: 1.43,
                  color: 'text.primary',
                }}
              >
                Status
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <FormGroup>
                {statusOptions.map((status) => (
                  <FormControlLabel
                    key={status.label}
                    control={
                      <Checkbox
                        checked={filters.statuses.includes(status.label)}
                        onChange={(e) =>
                          handleFilterChange('statuses', status.label, e.target.checked)
                        }
                        disabled={status.disabled}
                        sx={{
                          color: status.disabled ? 'text.disabled' : 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '14px',
                          lineHeight: 1.43,
                          color: status.disabled ? 'text.disabled' : 'text.primary',
                        }}
                      >
                        {status.label}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          {/* Month Plan Accordion */}
          <Accordion
            expanded={expandedAccordions.monthPlan}
            onChange={() => handleAccordionToggle('monthPlan')}
            elevation={0}
            disableGutters
            sx={{
              backgroundColor: 'background.paper',
              '&:before': { display: 'none' },
              '&.MuiAccordion-root': {
                margin: 0,
                '&:before': { display: 'none' },
              },
              '& .MuiAccordionSummary-root': {
                minHeight: 48,
                '&.Mui-expanded': {
                  minHeight: 48,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedAccordions.monthPlan ? (
                  <ExpandLessIcon sx={{ color: 'action.active' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: 'action.active' }} />
                )
              }
              sx={{ px: 2, py: 0 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  lineHeight: 1.43,
                  color: 'text.primary',
                }}
              >
                Month Plan
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1,
                }}
              >
                {monthPlanOptions.map((month) => (
                  <FormControlLabel
                    key={month.value}
                    control={
                      <Checkbox
                        checked={filters.monthPlans.includes(month.value)}
                        onChange={(e) =>
                          handleFilterChange('monthPlans', month.value, e.target.checked)
                        }
                        disabled={month.disabled}
                        sx={{
                          color: month.disabled ? 'text.disabled' : 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '14px',
                          lineHeight: 1.43,
                          color: month.disabled ? 'text.disabled' : 'text.primary',
                        }}
                      >
                        {month.label}
                      </Typography>
                    }
                    sx={{
                      margin: 0,
                      width: '100%',
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Other Filter Sections (collapsed by default) */}
          {filterSections.map((section) => (
            <ListItem key={section} sx={{ px: 2, py: 1 }}>
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'IBM Plex Sans',
                    fontSize: '14px',
                    lineHeight: 1.43,
                    color: 'text.primary',
                  }}
                >
                  {section}
                </Typography>
              </ListItemText>
              <ExpandMoreIcon sx={{ color: 'action.active' }} />
            </ListItem>
          ))}
        </List>
    </Drawer>
  );
};

export default FilterDrawer;
