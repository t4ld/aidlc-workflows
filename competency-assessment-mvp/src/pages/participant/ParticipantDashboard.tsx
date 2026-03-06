import { Box, Typography, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockVisits } from '../../data/mockData';
import StatusChip from '../../components/StatusChip';
import { format, isToday } from 'date-fns';

export default function ParticipantDashboard() {
  const navigate = useNavigate();
  const upcomingVisits = mockVisits.filter((v) => v.status === 'Scheduled' || v.status === 'Locked');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        My Upcoming Visits
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {upcomingVisits.map((visit) => {
          const visitDate = new Date(visit.date);
          const isTodayVisit = isToday(visitDate);

          return (
            <Card
              key={visit.id}
              sx={{
                border: isTodayVisit ? 2 : 0,
                borderColor: 'primary.main',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {format(visitDate, 'MMM dd, yyyy')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {visit.startTime} - {visit.endTime}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {visit.location}
                </Typography>
                <StatusChip status={visit.status} />
                {isTodayVisit && (
                  <Chip label="Today" color="primary" size="small" sx={{ ml: 1 }} />
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/participant/visit/${visit.id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>

      {upcomingVisits.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No upcoming visits scheduled
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You will be notified when visits are scheduled
          </Typography>
        </Box>
      )}
    </Box>
  );
}
