import { h } from 'preact';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import packageJson from '../../../package.json';
const { readmeUrl } = packageJson.content;

const Header = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h1" component="h1" sx={{ flexGrow: 1, fontSize: '24px' }}>
        <Link color="inherit" href="/" sx={{ textDecoration: 'none' }}>Scroll Bible</Link>
      </Typography>
      <Button color="inherit" href="/about/license">License</Button>
      <Button color="inherit" href={readmeUrl}>About</Button>
    </Toolbar>
  </AppBar>
);

export default Header;
