import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Verse from '../routes/verse';
import Word from '../routes/word';
import Related from '../routes/related';
import License from '../routes/license';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <License path="/about/license" />
      <Verse path="/v/:id/:content" />
      <Related path="/related/:id/:content" />
      <Word path="/word/:id/:verseContent" />
      <Word path="/word/:id" />
    </Router>
  </div>
)

export default App;
