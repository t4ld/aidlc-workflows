import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  ViewList as ViewListIcon,
  Map as MapIcon,
  Groups as GroupsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { EngageIcon } from './EngageIcon';

interface AppBarProps {
  activeTab?: number;
  onTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

// Styled components to match the Figma design
const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: theme.palette.text.primary,
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.20)',
  position: 'sticky',
  top: 0,
  zIndex: 1400, // Higher than default AppBar (1100) and Drawer (1200)
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 48,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const AppIconContainer = styled(Box)({
  width: 38,
  height: 38,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const AppNameTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.75,
  letterSpacing: '0.15px',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    display: 'none', // Hide app name on very small screens
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 48,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 2,
  },
  '& .MuiTabs-flexContainer': {
    flexDirection: 'row',
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
  lineHeight: '24px',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.125),
  paddingBottom: theme.spacing(1.125),
  flexDirection: 'row',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&:not(.Mui-selected)': {
    color: theme.palette.text.secondary,
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 48,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const RightIconsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '50%',
  '& .MuiSvgIcon-root': {
    color: theme.palette.action.active,
    fontSize: 24,
  },
}));

export const AppBar: React.FC<AppBarProps> = ({ 
  activeTab = 0, 
  onTabChange 
}) => {
  const [tabValue, setTabValue] = useState(activeTab);
  const theme = useTheme();
  const isMediumOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        {/* Left Side */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 2 },
          flexGrow: 1,
          minHeight: 48,
          overflow: 'hidden',
        }}>
          {/* App Icon and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AppIconContainer>
              <EngageIcon />
            </AppIconContainer>
            <AppNameTypography>
              Electric Distribution
            </AppNameTypography>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ 
            ml: { xs: 2, md: 4 },
            flexShrink: 1,
          }}>
            <StyledTabs 
              value={tabValue} 
              onChange={handleTabChange}
              orientation="horizontal"
              variant="standard"
            >
              <StyledTab
                icon={<ViewListIcon sx={{ fontSize: 24 }} />}
                label={isMediumOrLarger ? "LIST" : undefined}
                iconPosition="start"
              />
              <StyledTab
                icon={<MapIcon sx={{ fontSize: 24 }} />}
                label={isMediumOrLarger ? "MAP 1.0" : undefined}
                iconPosition="start"
              />
              <StyledTab
                icon={<GroupsIcon sx={{ fontSize: 24 }} />}
                label={isMediumOrLarger ? "TEAMS" : undefined}
                iconPosition="start"
                disabled
              />
            </StyledTabs>
          </Box>
        </Box>

        {/* Right Side Action Buttons */}
        <RightIconsContainer>
          <StyledIconButton>
            <NotificationsIcon />
          </StyledIconButton>
          <StyledIconButton>
            <AccountCircleIcon />
          </StyledIconButton>
        </RightIconsContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default AppBar;
