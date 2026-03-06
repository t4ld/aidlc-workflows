import { Box, Typography, Paper, Alert, LinearProgress, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { mockVisits, mockBookings } from '../../data/mockData';
import StatusChip from '../../components/StatusChip';
import { format } from 'date-fns';

export default function ManageBookings() {
  const { id } = useParams<{ id: string }>();
  const visit = mockVisits.find((v) => v.id === id);
  const bookings = mockBookings.filter((b) => b.visitId === id);

  if (!visit) return <Typography>Visit not found</Typography>;

  const capacityPercent = (visit.bookingsCount / visit.capacity) * 100;
  const capacityColor = capacityPercent >= 100 ? 'error' : capacityPercent >= 80 ? 'warning' : 'success';

  const columns: GridColDef[] = [
    { field: 'participantName', headerName: 'Participant', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: 'assessmentTypes',
      headerName: 'Assessment Types',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((type: string) => (
            <Chip key={type} label={type} size="small" />
          ))}
        </Box>
      ),
    },
    {
      field: 'bookedDate',
      headerName: 'Booked',
      width: 130,
      valueGetter: (value) => format(new Date(value), 'MMM dd, yyyy'),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Manage Bookings - Visit #{visit.id}
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Visit Information
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Typography>
            <strong>Date:</strong> {format(new Date(visit.date), 'MMMM dd, yyyy')}
          </Typography>
          <Typography>
            <strong>Time:</strong> {visit.startTime} - {visit.endTime}
          </Typography>
          <Typography>
            <strong>Location:</strong> {visit.location}
          </Typography>
          <StatusChip status={visit.status} />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Capacity: {visit.bookingsCount} / {visit.capacity}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={capacityPercent}
            color={capacityColor}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </Paper>

      {visit.locked && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Bookings are locked. Reason: {visit.lockReason}. Locked on:{' '}
          {visit.lockedAt && format(new Date(visit.lockedAt), 'MMM dd, yyyy hh:mm a')}
        </Alert>
      )}

      <Paper sx={{ height: 500 }}>
        <DataGrid
          rows={bookings}
          columns={columns}
          pageSizeOptions={[10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
