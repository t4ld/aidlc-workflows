import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import CollapsibleFilterChips from './CollapsibleFilterChips';

interface FilterToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterChips: string[];
  onChipDelete: (chipLabel: string) => void;
  onFilterDrawerToggle: () => void;
}

export default function FilterToolbar({
  searchValue,
  onSearchChange,
  filterChips,
  onChipDelete,
  onFilterDrawerToggle,
}: FilterToolbarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flex: 1 }}>
        <IconButton onClick={onFilterDrawerToggle}>
          <FilterListIcon sx={{ color: '#0067a3' }} />
        </IconButton>
        
        <CollapsibleFilterChips
          chips={filterChips}
          onChipDelete={onChipDelete}
        />
      </Box>
      
      <TextField
        size="small"
        placeholder="Find Assignments"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(0,0,0,0.56)' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
