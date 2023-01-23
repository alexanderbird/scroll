import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import Match from 'preact-router/match';

import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Badge from '@mui/material/Badge';

import packageJson from '../../../package.json';
import { useReadingList } from '../../hooks/useReadingList';

const { readmeUrl } = packageJson.content;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media (max-width: 650px)': {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto auto auto',
    gridTemplateRows: 'auto auto',
    height: 'auto',
    'button:first-of-type': {
      marginLeft: 0,
      marginRight: 'auto',
    },
    'h1': {
      textAlign: 'center',
      gridRow: 2,
      gridColumn: '1 / span 4',
    }
  },
}));

const Header = ({ title }) => {
  const [ anchorElement, setAnchorElement ] = useState(null);
  const handleMenu = e => setAnchorElement(e.currentTarget);
  const handleClose = () => setAnchorElement(null);
  const [ readingList ] = useReadingList();
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Match path="/">{({ matches }) => matches ? <div/> : (
          <IconButton
            size="large"
            aria-label="previous page"
            onClick={() => window.history.back()}
            color="inherit"
            >
            <ArrowBackIcon />
          </IconButton>
        )}</Match>
        <Typography variant="h1" component="h1" sx={{ flexGrow: 1, fontSize: '24px' }}>
          { title }
        </Typography>
        <IconButton
          size="large"
          aria-label="home page verse list"
          href="/"
          color="inherit" >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="jump to verse or word"
          href="/jump"
          color="inherit" >
          <AirlineStopsIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="reading list"
          href="/readinglist"
          color="inherit" >
          { readingList?.length
            ? <Badge badgeContent={readingList.length} color="secondary"><BookmarkIcon /></Badge>
            : <BookmarkIcon />
          }
        </IconButton>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit" >
          <HelpCenterIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorElement={anchorElement}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!anchorElement}
          onClose={handleClose}
          >
          <MenuItem onClick={handleClose}>
            <Link href={readmeUrl} sx={{ textDecoration: 'none' }}>About</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/about/license" sx={{ textDecoration: 'none' }}>License</Link>
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
