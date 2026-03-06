import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled Chip with 8px border radius
const StyledChip = styled(Chip)(() => ({
  borderRadius: '8px',
  fontSize: '13px',
  height: '24px',
}));

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status?: string;
  variant?: 'filled' | 'outlined';
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'At Risk':
      return '#b40006';
    case 'Unassigned':
      return '#e57709';
    case 'Pending Review':
      return 'transparent';
    case 'Assigned':
      return 'transparent';
    case 'Pending Close':
      return '#0067A3';
    case 'In Progress':
      return '#81D4FA';
    case 'Complete':
      return 'rgba(0,0,0,0.08)';
    default:
      return '#e57709';
  }
};

const getStatusTextColor = (status: string) => {
  switch (status) {
    case 'Assigned':
      return '#0067a3';
    case 'In Progress':
      return '#000000';
    case 'Pending Review':
      return '#b40006';
      case 'Complete':
      return '#000000';
    default:
      return '#ffffff';
  }
};

export default function StatusChip({ 
  status, 
  label, 
  variant = 'filled',
  sx,
  ...props 
}: StatusChipProps) {
  const chipLabel = label || status;
  const backgroundColor = status ? getStatusColor(status) : undefined;
  const textColor = status ? getStatusTextColor(status) : undefined;
  const hasBorder = status === 'Assigned' || status === 'Pending Review';

  return (
    <StyledChip
      label={chipLabel}
      size="small"
      variant={variant}
      sx={{
        backgroundColor: variant === 'filled' ? backgroundColor : 'transparent',
        color: textColor,
        border: variant === 'filled' && hasBorder 
          ? `1px solid ${textColor}` 
          : variant === 'outlined' 
          ? `1px solid ${backgroundColor || '#0067a3'}` 
          : 'none',
        '& .MuiChip-deleteIcon': {
          color: textColor || 'inherit',
        },
        ...sx,
      }}
      {...props}
    />
  );
}
