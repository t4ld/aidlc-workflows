import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Lock as LockIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVisits, mockBookings, ASSESSMENT_TYPES } from '../../data/mockData';
import { format } from 'date-fns';

export default function ConductAssessments() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const visit = mockVisits.find((v) => v.id === id);
  const bookings = mockBookings.filter((b) => b.visitId === id);

  const [participations, setParticipations] = useState<Record<string, any>>({});
  const [finalized, setFinalized] = useState(false);
  const [showFinalizeDialog, setShowFinalizeDialog] = useState(false);

  if (!visit) return <Typography>Visit not found</Typography>;

  const completed = Object.keys(participations).length;
  const total = bookings.length;

  const handleParticipationChange = (bookingId: string, field: string, value: any) => {
    setParticipations((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], [field]: value },
    }));
  };

  const handleFinalize = () => {
    setFinalized(true);
    setShowFinalizeDialog(false);
    setTimeout(() => navigate('/evaluator/dashboard'), 1500);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Conduct Assessments - Visit #{visit.id}
      </Typography>

      <Paper sx={{ p: 2, mb: 3, position: 'sticky', top: 64, zIndex: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2">
            {format(new Date(visit.date), 'MMMM dd, yyyy')} • {visit.startTime} - {visit.endTime} • {visit.location}
          </Typography>
          <Typography variant="body2">
            Progress: {completed} of {total} participants
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={(completed / total) * 100} />
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {bookings.map((booking) => {
          const participation = participations[booking.id] || {};
          const isComplete = participation.outcome && participation.assessmentType;

          return (
            <Accordion key={booking.id} disabled={finalized}>
              <AccordionSummary expandIcon={finalized ? <LockIcon /> : <ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                  <Typography>{booking.participantName}</Typography>
                  {isComplete && <Typography color="success.main">✓ Completed</Typography>}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Assessment Type</InputLabel>
                    <Select
                      value={participation.assessmentType || ''}
                      onChange={(e) => handleParticipationChange(booking.id, 'assessmentType', e.target.value)}
                      label="Assessment Type"
                    >
                      {ASSESSMENT_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Outcome *
                    </Typography>
                    <RadioGroup
                      value={participation.outcome || ''}
                      onChange={(e) => handleParticipationChange(booking.id, 'outcome', e.target.value)}
                    >
                      <FormControlLabel value="Pass" control={<Radio />} label="Pass" />
                      <FormControlLabel value="Fail" control={<Radio />} label="Fail" />
                      <FormControlLabel value="Incomplete" control={<Radio />} label="Incomplete" />
                    </RadioGroup>
                  </FormControl>

                  <TextField
                    label="Notes (Optional)"
                    multiline
                    rows={3}
                    value={participation.notes || ''}
                    onChange={(e) => handleParticipationChange(booking.id, 'notes', e.target.value)}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      <Paper sx={{ p: 2, mt: 3, position: 'sticky', bottom: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={() => navigate('/evaluator/dashboard')}>
            {finalized ? 'Return to Dashboard' : 'Cancel'}
          </Button>
          {!finalized && (
            <Button
              variant="contained"
              onClick={() => setShowFinalizeDialog(true)}
              disabled={completed === 0}
            >
              Finalize Visit
            </Button>
          )}
        </Box>
      </Paper>

      <Dialog open={showFinalizeDialog} onClose={() => setShowFinalizeDialog(false)}>
        <DialogTitle>Finalize Visit Assessments?</DialogTitle>
        <DialogContent>
          <Typography>
            Once finalized, outcomes cannot be changed. Ensure all assessments are recorded correctly.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFinalizeDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleFinalize}>
            Finalize
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
