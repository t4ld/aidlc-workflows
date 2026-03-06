import { Box, Typography, Paper, Button, Alert } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { mockRequests, mockVisits } from '../../data/mockData';
import StatusChip from '../../components/StatusChip';
import { format } from 'date-fns';

export default function ACDashboard() {
  const navigate = useNavigate();

  const pendingRequests = mockRequests.filter((r) => r.status === 'Pending');
  const upcomingVisits = mockVisits.filter((v) => v.status === 'Scheduled' || v.status === 'Locked');

  const requestColumns: GridColDef[] = [
    { field: 'id', headerName: 'Request ID', width: 120 },
    {
      field: 'participants',
      headerName: 'Participants',
      width: 120,
      valueGetter: (_value, row) => row.participants.length,
    },
    {
      field: 'submittedDate',
      headerName: 'Submitted',
      width: 130,
      valueGetter: (value) => format(new Date(value), 'MMM dd, yyyy'),
    },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button size="small" onClick={() => navigate(`/ac/request/${params.row.id}`)}>
          Review
        </Button>
      ),
    },
  ];

  const visitColumns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Visit Date',
      width: 130,
      valueGetter: (value) => format(new Date(value), 'MMM dd, yyyy'),
    },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'capacity',
      headerName: 'Capacity',
      width: 120,
      valueGetter: (_value, row) => `${row.bookingsCount}/${row.capacity}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button size="small" onClick={() => navigate(`/ac/visit/${params.row.id}/bookings`)}>
          Manage
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Operations Dashboard
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pending Scheduling Requests
          </Typography>
          <Box sx={{ height: 300 }}>
            <DataGrid
              rows={pendingRequests}
              columns={requestColumns}
              hideFooter
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upcoming Visits
          </Typography>
          <Box sx={{ height: 300 }}>
            <DataGrid
              rows={upcomingVisits}
              columns={visitColumns}
              hideFooter
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Visit #V-123 approaching capacity (18/20) -{' '}
          <Button size="small" onClick={() => navigate('/ac/visit/V-123/bookings')}>
            View Visit
          </Button>
        </Alert>
        <Alert severity="info">
          Visit #V-124 is currently locked (Assessment in progress)
        </Alert>
      </Box>
    </Box>
  );
}
