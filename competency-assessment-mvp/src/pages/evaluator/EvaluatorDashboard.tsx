import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockVisits } from '../../data/mockData';
import StatusChip from '../../components/StatusChip';
import { isToday } from 'date-fns';

export default function EvaluatorDashboard() {
  const navigate = useNavigate();
  const todayVisits = mockVisits.filter((v) => isToday(new Date(v.date)));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Today's Visits
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {todayVisits.map((visit) => (
          <Card key={visit.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Box>
                  <Typography variant="h5" component="div">
                    {visit.startTime} - {visit.endTime}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    {visit.location}
                  </Typography>
                  <Typography variant="body2">
                    {visit.bookingsCount} participants
                  </Typography>
                </Box>
                <StatusChip status={visit.status} />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => navigate(`/evaluator/visit/${visit.id}/conduct`)}
                disabled={visit.status === 'Completed'}
              >
                Conduct Assessments
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {todayVisits.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No visits scheduled for today
          </Typography>
        </Box>
      )}
    </Box>
  );
}
