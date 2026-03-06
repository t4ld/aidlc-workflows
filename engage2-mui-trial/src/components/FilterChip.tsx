import { Chip, ChipProps } from '@mui/material';

interface FilterChipProps extends ChipProps {
  // You can add any additional props specific to filter chips here
}

export default function FilterChip({ sx, ...props }: FilterChipProps) {
  return (
    <Chip
      variant="outlined"
      size="medium"
      sx={{
        borderColor: '#0067a3',
        color: '#0067a3',
        '& .MuiChip-deleteIcon': {
          color: '#0067a3',
        },
        ...sx,
      }}
      {...props}
    />
  );
}
