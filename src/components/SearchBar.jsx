// src/components/SearchBar.jsx
import { Paper, InputBase, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: 8, boxShadow: 3 }}
    >
      <IconButton sx={{ p: '10px', color: 'primary.main' }}>
        <RoomIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Where are you going?"
        inputProps={{ 'aria-label': 'search destinations' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px', color: 'secondary.main' }}>
        <DateRangeIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 0.5 }}
        placeholder="Dates"
        inputProps={{ 'aria-label': 'select dates' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px', color: 'secondary.main' }}>
        <PeopleIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 0.5 }}
        placeholder="Guests"
        inputProps={{ 'aria-label': 'number of guests' }}
      />
      <IconButton type="submit" sx={{ p: '10px', color: 'white', bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;