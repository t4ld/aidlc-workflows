import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
} from '@mui/material';

interface CardProps {
  label?: string;
  kpi?: string;
  isLoading?: boolean;
}

function KpiCard({ label, kpi, isLoading = false }: CardProps) {
  if (isLoading) {
    return (
      <Card sx={{ flex: 1, boxShadow: 2 }}>
        <CardContent>
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={100} height={32} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ flex: 1, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {label || '{Label}'}
        </Typography>
        <Typography variant="h5" component="div">
          {kpi || '{KPI}'}
        </Typography>
      </CardContent>
    </Card>
  );
}

interface CardRowProps {
  cards?: Array<{
    label?: string;
    kpi?: string;
    isLoading?: boolean;
  }>;
}

export default function CardRow({ cards }: CardRowProps) {
  // Default data matching the Figma design (4 regular cards + 2 loading cards)
  const defaultCards = [
    { label: 'Total Projects', kpi: '24' },
    { label: 'Active Tasks', kpi: '156' },
    { label: 'Completed', kpi: '89' },
    { label: 'In Review', kpi: '12' },
    { isLoading: true },
    { isLoading: true },
  ];

  const displayCards = cards || defaultCards;

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      {displayCards.map((card, index) => (
        <KpiCard
          key={index}
          label={card.label}
          kpi={card.kpi}
          isLoading={card.isLoading}
        />
      ))}
    </Box>
  );
}
