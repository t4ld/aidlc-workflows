import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  styled,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useRole } from '../context/RoleContext';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: theme.palette.text.primary,
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.20)',
  position: 'sticky',
  top: 0,
  zIndex: 1400,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 48,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const AppNameTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.75,
  letterSpacing: '0.15px',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 48,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 2,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 48,
  minWidth: 'auto',
  textTransform: 'uppercase',
  fontSize: '14px',
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: 'IBM Plex Sans, sans-serif',
  letterSpacing: '0.4px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&:not(.Mui-selected)': {
    color: theme.palette.text.secondary,
  },
}));

const roleLabels: Record<UserRole, string> = {
  cpor: 'CPOR',
  ac: 'Admin Clerk',
  participant: 'Participant',
  evaluator: 'Evaluator',
  supervisor: 'Supervisor',
};

const roleRoutes: Record<UserRole, string> = {
  cpor: '/cpor/dashboard',
  ac: '/ac/dashboard',
  participant: '/participant/dashboard',
  evaluator: '/evaluator/dashboard',
  supervisor: '/admin/export',
};

export default function AppBar() {
  const { currentRole, setCurrentRole } = useRole();
  const navigate = useNavigate();

  const roles: UserRole[] = ['cpor', 'ac', 'participant', 'evaluator', 'supervisor'];
  const currentIndex = roles.indexOf(currentRole);

  const handleRoleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const newRole = roles[newValue];
    setCurrentRole(newRole);
    navigate(roleRoutes[newRole]);
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <AppNameTypography>
            Competency Assessment System
          </AppNameTypography>

          <Box sx={{ ml: 4 }}>
            <StyledTabs value={currentIndex} onChange={handleRoleChange}>
              {roles.map((role) => (
                <StyledTab key={role} label={roleLabels[role]} />
              ))}
            </StyledTabs>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ p: 1 }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ p: 1 }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
}
