import {
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Slide,
} from '@mui/material';

interface SelectionToolbarProps {
  selectedRowsCount: number;
  totalUnits: number;
  onDeselect: () => void;
  onAssign: () => void;
}

export default function SelectionToolbar({
  selectedRowsCount,
  totalUnits,
  onDeselect,
  onAssign,
}: SelectionToolbarProps) {
  const isVisible = selectedRowsCount > 0;

  return (
    <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: '33%',
          width: '34%',
          minWidth: 300,
          zIndex: 1000,
          borderRadius: 1,
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 18px 3px rgba(0,0,0,0.12), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 6px 6px -3px rgba(0,0,0,0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: 2,
            py: 1,
            width: '100%',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{
                fontFamily: 'IBM Plex Sans',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: 1.43,
                letterSpacing: '0.17px',
                color: '#000000',
                margin: 0,
                display: 'block',
              }}
            >
              {selectedRowsCount} Assignment{selectedRowsCount !== 1 ? 's' : ''}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'IBM Plex Sans',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: 1.43,
                letterSpacing: '0.17px',
                color: '#000000',
                margin: 0,
                display: 'block',
              }}
            >
              {totalUnits} Units
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={onDeselect}
              sx={{
                borderColor: '#0067a3',
                color: '#0067a3',
                fontFamily: 'IBM Plex Sans',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '24px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                px: 2,
                py: 0.75,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                '&:hover': {
                  borderColor: '#0067a3',
                  backgroundColor: 'rgba(0, 103, 163, 0.04)',
                },
              }}
            >
              Deselect
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={onAssign}
              sx={{
                backgroundColor: '#0067a3',
                color: '#ffffff',
                fontFamily: 'IBM Plex Sans',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '24px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                px: 2,
                py: 0.75,
                borderRadius: 1,
                boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#004d7a',
                },
              }}
            >
              Assign
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Slide>
  );
}
