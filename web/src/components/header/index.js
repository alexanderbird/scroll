import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

import AppBar from '@mui/material/AppBar';
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

import packageJson from '../../../package.json';
const { readmeUrl } = packageJson.content;

const Header = () => {
  const [ anchorElement, setAnchorElement ] = useState(null);
  const handleMenu = e => setAnchorElement(e.currentTarget);
  const handleClose = () => setAnchorElement(null);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h1" component="h1" sx={{ flexGrow: 1, fontSize: '24px' }}>
          <Link color="inherit" href="/" sx={{ textDecoration: 'none' }}>Scroll Bible</Link>
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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
