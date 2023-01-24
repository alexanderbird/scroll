import { h } from 'preact';
import IosShareIcon from '@mui/icons-material/IosShare';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const cardStyle = {
  padding: 'var(--theme-spacing-2)',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  '--brand-icon-width': '64px',
  'h4': {
    margin: 'var(--theme-spacing-1) 0 0 0',
    width: 'var(--brand-icon-width)',
    textAlign: 'center',
  },
  'a': {
    marginTop: 'auto',
  },
  'li': {
    lineHeight: '36px'
  }
};

const Install = ({ setPageTitle }) => {
  setPageTitle("Install Mobile App");
  return (
    <>
      <p>
        You can install Scroll Bible on your iOS or Android phone. This website
        is a "Progressive Web App" &mdash; a website that can be added to a mobile
        home screen and used as a standalone app.
      </p>

      <h3>Installation Instructions</h3>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Paper elevation={2} sx={cardStyle}>
          <AndroidIcon color='primary' sx={{ fontSize: 'var(--brand-icon-width)' }}/>
          <h4>Android</h4>
          <ol>
            <li>open <a href="https://scrollbible.app">scrollbible.app</a> in Chrome</li>
            <li>tap <em>Install</em></li>
          </ol>
          <Button href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=1">See Google's guide</Button>
        </Paper>

        <Paper elevation={2} sx={cardStyle}>
          <AppleIcon color="primary" sx={{ fontSize: 'var(--brand-icon-width)' }}/>
          <h4>iOS</h4>
          <ol>
            <li>open <a href="https://scrollbible.app">scrollbible.app</a> in Safari</li>
            <li>tap <IosShareIcon size="small"/></li>
            <li>tap <em>Add to Home Screen</em></li>
          </ol>
          <Button href="https://support.apple.com/en-ca/guide/iphone/iph42ab2f3a7/ios#iph4f9a47bbc">See Apple's guide</Button>
        </Paper>
      </Stack>

    </>
  );
};

export default Install;
