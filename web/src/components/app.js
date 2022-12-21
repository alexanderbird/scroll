import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Verse from '../routes/verse';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Verse path="/v/:id/:content" />
    </Router>
  </div>
)

export default App;
