import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Download as DownloadIcon } from '@mui/icons-material';
import { mockExports } from '../../data/mockData';
import StatusChip from '../../components/StatusChip';
import { format } from 'date-fns';

export default function ResultsExport() {
  const [scope, setScope] = useState('visit');
  const [exportFormat, setFormat] = useState('CSV');
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleAddEmail = () => {
    if (emailInput && emailInput.includes('@')) {
      setEmails([...emails, emailInput]);
      setEmailInput('');
    }
  };

  const handleExport = () => {
    alert('Export initiated! In a real app, this would generate and download the file.');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Export ID', width: 120 },
    { field: 'scope', headerName: 'Scope', flex: 1 },
    { field: 'format', headerName: 'Format', width: 100 },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 180,
      valueGetter: (value) => format(new Date(value), 'MMM dd, yyyy hh:mm a'),
    },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params) =>
        params.row.status === 'Completed' ? (
          <Button size="small" startIcon={<DownloadIcon />}>
            Download
          </Button>
        ) : null,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Export Assessment Results
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Configure Export
          </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Scope *
                </Typography>
                <RadioGroup value={scope} onChange={(e) => setScope(e.target.value)}>
                  <FormControlLabel value="visit" control={<Radio />} label="By Visit" />
                  <FormControlLabel value="participant" control={<Radio />} label="By Participant" />
                  <FormControlLabel value="dateRange" control={<Radio />} label="By Date Range" />
                </RadioGroup>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Format *
                </Typography>
                <RadioGroup value={exportFormat} onChange={(e) => setFormat(e.target.value)}>
                  <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
                  <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
                  <FormControlLabel value="Email" control={<Radio />} label="Email" />
                </RadioGroup>
              </Box>

              {exportFormat === 'Email' && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Email Recipients
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="email@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                    />
                    <Button onClick={handleAddEmail}>Add</Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {emails.map((email) => (
                      <Chip
                        key={email}
                        label={email}
                        onDelete={() => setEmails(emails.filter((e) => e !== email))}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" fullWidth>
                  Preview
                </Button>
                <Button variant="contained" fullWidth onClick={handleExport}>
                  Export
                </Button>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Results are exported as recorded, not as certifications
              </Typography>
            </Box>
          </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Exports
          </Typography>
          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={mockExports}
              columns={columns}
              hideFooter
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
