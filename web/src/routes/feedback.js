import { h } from 'preact';

import { Page } from '../components/page';

const Feedback = () => {
  return (
    <Page title="App Feedback">
      <p>
        You can contact Alex at <a
        href="mailto:feedback@scrollbible.app">feedback@scrollbible.app</a> to
        give feedback about this app.
      </p>

      <p>
        <ul>
          <li>Do you have any ideas for how to make this app better?</li>
          <li>Have you noticed something not working right?</li>
          <li>Is this app useful to you? What do you use it for?</li>
          <li>etc.</li>
        </ul>
      </p>
    </Page>
  );
};

export default Feedback;
