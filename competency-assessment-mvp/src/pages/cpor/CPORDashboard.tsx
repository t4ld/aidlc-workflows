import { Box, Typography, Button, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import StatusChip from '../../components/StatusChip';
import { mockRequests } from '../../data/mockData';
import { format } from 'date-fns';

export default function CPORDashboard() {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Request ID', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: 'participants',
      headerName: 'Participants',
      width: 120,
      valueGetter: (_value, row) => row.participants.length,
    },
    {
      field: 'assessmentTypes',
      headerName: 'Assessment Types',
      flex: 1,
      minWidth: 200,
      valueGetter: (_value, row) => row.assessmentTypes.join(', '),
    },
    {
      field: 'submittedDate',
      headerName: 'Submitted Date',
      width: 150,
      valueGetter: (value) => format(new Date(value), 'MMM dd, yyyy'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate(`/cpor/request/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Scheduling Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/cpor/request/new')}
        >
          Request Scheduling
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={mockRequests}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
