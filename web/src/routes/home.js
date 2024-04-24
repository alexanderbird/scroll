import { h } from 'preact';
import Button from '@mui/material/Button';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { RandomIcon } from '../components/icon/random';
import Stack from '@mui/material/Stack';
import { Loading } from '../components/loading';
import style from './home.css';

const Em = ({ children }) => <Typography variant="overline">{children}</Typography>

const Home = ({ setPageTitle }) => {
  setPageTitle('Scroll Bible');
  return (
    <Stack direction="column" alignItems="start">
      <Typography sx={{ textAlign: 'center', width: '100%', marginBottom: 4 }}>An immersive Bible exploration app</Typography>
      <Button class={style.bigButton} href="/search">
        <Stack direction="column" alignItems="center" sx={{ padding: 2, marginLeft: 'auto', marginRight: 'auto' }}>
          <Typography variant="h5" textAlign="center"><SearchIcon/> What's that verse?</Typography>
          <img class={style.bigButtonImg} src="/assets/people-conversing.png"></img>
          <Typography sx={{ textTransform: 'initial' }}>
            <b>search</b> for a phrase
          </Typography>
        </Stack>
      </Button>
      <Button class={style.bigButton} href="/jump">
        <Stack direction="column" alignItems="center" sx={{ padding: 2, marginLeft: 'auto', marginRight: 'auto' }}>
          <Typography variant="h5" textAlign="center"><AirlineStopsIcon/>In the Greek...</Typography>
          <img class={style.bigButtonImg} src="/assets/person-teaching.png"></img>
          <Typography sx={{ textTransform: 'initial' }}>
            <b>jump</b> to a specific verse to browse <b>cross references</b> or drill down to <b>Greek and Hebrew words</b>.
          </Typography>
        </Stack>
      </Button>
      <Button class={style.bigButton} href="/random">
        <Stack direction="column" alignItems="center" sx={{ padding: 2, marginLeft: 'auto', marginRight: 'auto' }}>
          <Typography variant="h5" textAlign="center"><RandomIcon/> browse</Typography>
          <img class={style.bigButtonImg} src="/assets/person-thinking.png"></img>
          <Typography sx={{ textTransform: 'initial' }}>
            <b>scroll</b> through verses in a random order to find something new to explore.
          </Typography>
        </Stack>
      </Button>
    </Stack>
  );
}

export default Home;
