import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { ThemeProvider } from "@mui/material";

import { theme } from './theme';
import { Page } from '../../components/page';

// Code-splitting is automated for `routes` directory
import Home from '../../routes/home';
import License from '../../routes/license';
import Feedback from '../../routes/feedback';
import Verse from '../../routes/verse';
import Related from '../../routes/related';
import Word from '../../routes/word';
import Jump from '../../routes/jump';
import ReadingList from '../../routes/readingList';

const App = () => {
  const [ pageTitle, setPageTitle ] = useState('Scroll Bible');
  return (
    <div id='app-router'>
      <ThemeProvider theme={theme} >
        <Page title={pageTitle} >
          <Router>
            <Home        path="/"                        setPageTitle={setPageTitle} />
            <License     path="/about/license"           setPageTitle={setPageTitle} />
            <Feedback    path="/about/feedback"          setPageTitle={setPageTitle} />
            <Verse       path="/v/:id/:content?"         setPageTitle={setPageTitle} />
            <Related     path="/related/:id/:content"    setPageTitle={setPageTitle} />
            <Word        path="/word/:id/:verseContent?" setPageTitle={setPageTitle} />
            <Jump        path="/jump/:query?"            setPageTitle={setPageTitle} />
            <ReadingList path="/readinglist"             setPageTitle={setPageTitle} />
          </Router>
        </Page>
      </ThemeProvider>
    </div>
  );
}

export default App;
