import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import License from '../routes/license';
import Verse from '../routes/verse';
import Related from '../routes/related';
import Word from '../routes/word';
import Jump from '../routes/jump';

const App = () => (
  <div id='app-router'>
    <Router>
      <Home path="/" />
      <License path="/about/license" />
      <Verse path="/v/:id/:content?" />
      <Related path="/related/:id/:content" />
      <Word path="/word/:id/:verseContent?" />
      <Jump path="/jump/:query?" />
    </Router>
  </div>
)

export default App;
