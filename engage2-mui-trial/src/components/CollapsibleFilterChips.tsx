import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Collapse,
} from '@mui/material';
import FilterChip from './FilterChip';

interface CollapsibleFilterChipsProps {
  chips: string[];
  onChipDelete: (chipLabel: string) => void;
}

export default function CollapsibleFilterChips({ chips, onChipDelete }: CollapsibleFilterChipsProps) {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [visibleChipsCount, setVisibleChipsCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate how many chips can fit horizontally
  useEffect(() => {
    const calculateVisibleChips = () => {
      if (!containerRef.current || chips.length === 0) return;

      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const buttonWidth = 120; // Approximate width of "Show More" button
      const gap = 8; // 1 * 8px gap between chips
      const padding = 8; // Container padding
      
      let totalWidth = 0;
      let count = 0;
      
      // Create temporary elements to measure chip widths
      for (let i = 0; i < chips.length; i++) {
        const tempChip = document.createElement('div');
        tempChip.style.position = 'absolute';
        tempChip.style.visibility = 'hidden';
        tempChip.style.whiteSpace = 'nowrap';
        tempChip.style.padding = '6px 12px';
        tempChip.style.fontSize = '0.8125rem';
        tempChip.style.fontFamily = 'Roboto, sans-serif';
        tempChip.textContent = chips[i];
        
        document.body.appendChild(tempChip);
        const chipWidth = tempChip.offsetWidth + 24; // Add delete button width
        document.body.removeChild(tempChip);
        
        const widthWithGap = totalWidth + chipWidth + (count > 0 ? gap : 0);
        const availableWidth = containerWidth - buttonWidth - padding;
        
        if (widthWithGap <= availableWidth) {
          totalWidth = widthWithGap;
          count++;
        } else {
          break;
        }
      }
      
      // Ensure at least 1 chip is visible, but not more than total chips
      const newCount = Math.max(1, Math.min(count, chips.length));
      setVisibleChipsCount(newCount);
    };

    // Calculate on mount and when chips change
    calculateVisibleChips();
    
    // Recalculate on window resize
    const handleResize = () => calculateVisibleChips();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [chips]);

  if (chips.length === 0) {
    return null;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 1, 
      flex: 1,
      minWidth: 0,
    }}>
      {/* Always visible row with chips and toggle button */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: 1,
        minWidth: 0,
      }}>
        {/* First N chips - dynamically calculated */}
        <Box 
          ref={containerRef}
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 1, 
            alignItems: 'center',
            flex: 1,
            minWidth: 0,
            py: 0.5, // 4px vertical padding
          }}
        >
          {chips.slice(0, visibleChipsCount).map((chip) => (
            <FilterChip
              key={chip}
              label={chip}
              onDelete={() => onChipDelete(chip)}
            />
          ))}
          
          {/* Show count of hidden chips when collapsed */}
          {!showAllFilters && chips.length > visibleChipsCount && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                fontSize: '0.875rem',
              }}
            >
              +{chips.length - visibleChipsCount} more
            </Typography>
          )}
        </Box>
        
        {/* Toggle button */}
        {chips.length > visibleChipsCount && (
          <Button
            size="large"
            onClick={() => setShowAllFilters(!showAllFilters)}
            sx={{ 
              minWidth: 'auto',
              flexShrink: 0,
              textTransform: 'none',
              fontSize: '0.875rem',
              color: 'primary.main',
            }}
          >
            {showAllFilters ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </Box>
      
      {/* Animated collapsible additional chips */}
      <Collapse in={showAllFilters} timeout={300}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          alignItems: 'center',
          pt: 0.5,
        }}>
          {chips.slice(visibleChipsCount).map((chip) => (
            <FilterChip
              key={chip}
              label={chip}
              onDelete={() => onChipDelete(chip)}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
