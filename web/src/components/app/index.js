import { h } from 'preact';
import { Router } from 'preact-router';
import { ThemeProvider } from "@mui/material";

import { theme } from './theme';

// Code-splitting is automated for `routes` directory
import Home from '../../routes/home';
import License from '../../routes/license';
import Verse from '../../routes/verse';
import Related from '../../routes/related';
import Word from '../../routes/word';
import Jump from '../../routes/jump';

const App = () => (
  <div id='app-router'>
    <ThemeProvider theme={theme} >
      <Router>
        <Home path="/" />
        <License path="/about/license" />
        <Verse path="/v/:id/:content?" />
        <Related path="/related/:id/:content" />
        <Word path="/word/:id/:verseContent?" />
        <Jump path="/jump/:query?" />
      </Router>
    </ThemeProvider>
  </div>
)

export default App;
