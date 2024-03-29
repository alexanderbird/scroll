import { h } from 'preact';

import { FeedbackLink } from '../components/feedbackLink';

const Feedback = ({ setPageTitle }) => {
  setPageTitle("App Feedback");
  return (
    <>
      <p>
        You can contact Alex at <FeedbackLink /> to
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
    </>
  );
};

export default Feedback;
