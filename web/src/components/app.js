import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Verse from '../routes/verse';
import License from '../routes/license';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <License path="/about/license" />
      <Verse path="/v/:id/:content" />
    </Router>
  </div>
)

export default App;
