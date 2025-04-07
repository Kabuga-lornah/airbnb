// src/components/FilterBar.jsx
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

const filters = [
  { id: 1, label: 'Amazing views' },
  { id: 2, label: 'Beachfront' },
  { id: 3, label: 'Cabins' },
  { id: 4, label: 'Tiny homes' },
  { id: 5, label: 'Luxe' },
  { id: 6, label: 'Treehouses' },
  { id: 7, label: 'Countryside' },
];

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, overflowX: 'auto', py: 2 }}>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'contained' : 'outlined'}
          onClick={() => setActiveFilter(filter.id === activeFilter ? null : filter.id)}
          sx={{
            borderRadius: 4,
            textTransform: 'none',
            borderColor: activeFilter === filter.id ? 'primary.main' : 'secondary.main',
            color: activeFilter === filter.id ? 'white' : 'secondary.main',
            bgcolor: activeFilter === filter.id ? 'primary.main' : 'transparent',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: activeFilter === filter.id ? 'primary.dark' : 'rgba(255, 90, 95, 0.1)',
            },
          }}
        >
          {filter.label}
        </Button>
      ))}
      <Button
        variant="outlined"
        sx={{
          borderRadius: 4,
          textTransform: 'none',
          borderColor: 'secondary.main',
          color: 'secondary.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FilterListIcon fontSize="small" />
        <Typography variant="body2">Filters</Typography>
      </Button>
    </Box>
  );
};

export default FilterBar;