import { h } from 'preact';
import { Router } from 'preact-router';
import { ThemeProvider } from "@mui/material";

import { theme } from './theme';

// Code-splitting is automated for `routes` directory
import Home from '../../routes/home';
import License from '../../routes/license';
import Feedback from '../../routes/Feedback';
import Verse from '../../routes/verse';
import Related from '../../routes/related';
import Word from '../../routes/word';
import Jump from '../../routes/jump';
import ReadingList from '../../routes/readingList';

const App = () => (
  <div id='app-router'>
    <ThemeProvider theme={theme} >
      <Router>
        <Home path="/" />
        <License path="/about/license" />
        <Feedback path="/about/feedback" />
        <Verse path="/v/:id/:content?" />
        <Related path="/related/:id/:content" />
        <Word path="/word/:id/:verseContent?" />
        <Jump path="/jump/:query?" />
        <ReadingList path="/readinglist" />
      </Router>
    </ThemeProvider>
  </div>
)

export default App;
