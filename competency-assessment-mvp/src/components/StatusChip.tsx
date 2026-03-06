import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(() => ({
  borderRadius: '8px',
  fontSize: '13px',
  height: '24px',
}));

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: string;
}

const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    // Request statuses
    'Draft': 'rgba(0,0,0,0.08)',
    'Pending': '#e57709',
    'Fulfilled': '#2E7D32',
    'Cancelled': 'transparent',
    // Visit/Booking statuses
    'Scheduled': '#0067A3',
    'Locked': '#e57709',
    'Completed': '#2E7D32',
    // Participation outcomes
    'Not Started': 'rgba(0,0,0,0.08)',
    'In Progress': '#81D4FA',
    'Pass': '#2E7D32',
    'Fail': '#b40006',
    'Incomplete': '#e57709',
    // Export statuses
  };
  return statusMap[status] || '#e57709';
};

const getStatusTextColor = (status: string): string => {
  const lightTextStatuses = ['Pending', 'Scheduled', 'Locked', 'Fulfilled', 'Completed', 'Pass', 'Fail', 'Incomplete'];
  return lightTextStatuses.includes(status) ? '#ffffff' : '#000000';
};

export default function StatusChip({ status, sx, ...props }: StatusChipProps) {
  const backgroundColor = getStatusColor(status);
  const textColor = getStatusTextColor(status);
  const hasBorder = status === 'Cancelled';

  return (
    <StyledChip
      label={status}
      size="small"
      sx={{
        backgroundColor,
        color: textColor,
        border: hasBorder ? `1px solid #b40006` : 'none',
        ...sx,
      }}
      {...props}
    />
  );
}
