import { h } from 'preact';
import Button from '@mui/material/Button';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { RandomIcon } from '../components/icon/random';
import Stack from '@mui/material/Stack';

const Home = ({ setPageTitle }) => {
  setPageTitle('Scroll Bible');
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
      <Button variant="outlined" color="primary" href="/random"><RandomIcon/>Shuffle</Button>
      <Button variant="outlined" color="primary" href="/jump"><AirlineStopsIcon/>Jump to Verse</Button>
      <Button variant="outlined" color="primary" href="/jump"><AirlineStopsIcon/>Jump to Strong's Number</Button>
      <Button variant="outlined" color="primary" href="/search"><SearchIcon/>Search</Button>
      <Button variant="outlined" color="primary" href="/readinglist"><BookmarkIcon/>Reading List</Button>
    </Stack>
  );
}

export default Home;
