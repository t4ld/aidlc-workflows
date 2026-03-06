import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Autocomplete,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PARTICIPANTS, ASSESSMENT_TYPES } from '../../data/mockData';

export default function CreateRequest() {
  const navigate = useNavigate();
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);
  const [context, setContext] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValid = selectedParticipants.length > 0 && selectedAssessments.length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    navigate('/cpor/dashboard');
  };

  const handleAssessmentToggle = (assessment: string) => {
    setSelectedAssessments((prev) =>
      prev.includes(assessment)
        ? prev.filter((a) => a !== assessment)
        : [...prev, assessment]
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create Scheduling Request
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Participants *
            </Typography>
            <Autocomplete
              multiple
              options={PARTICIPANTS.map((p) => p.name)}
              value={selectedParticipants}
              onChange={(_e, newValue) => setSelectedParticipants(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search participants"
                  helperText="Select participants who need assessment"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} key={option} />
                ))
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Assessment Types *
            </Typography>
            <FormGroup>
              {ASSESSMENT_TYPES.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={selectedAssessments.includes(type)}
                      onChange={() => handleAssessmentToggle(type)}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
            <Typography variant="caption" color="text.secondary">
              Select all assessment types required
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Additional Context
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Provide any relevant scheduling context or constraints"
              helperText="Optional"
            />
          </Box>

          {!isValid && (
            <Alert severity="info">
              Please select at least one participant and one assessment type
            </Alert>
          )}
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button onClick={() => navigate('/cpor/dashboard')}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </Box>
    </Box>
  );
}
