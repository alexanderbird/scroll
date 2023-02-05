import { Component } from 'preact'
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FeedbackLink } from '../feedbackLink';

export class ErrorBoundary extends Component {
  state = { error: null }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    if (!this.state.error) return this.props.children;
    const copyErrorDetails = () => navigator.clipboard.writeText(`
      Hello, I encountered the following error while using Scroll Bible.

      Current URL: ${window.location.href}

      ${this.state.error.message}

      ${this.state.error.stack}
    `);
    return (
      <Backdrop open={true}>
        <Dialog open={true}>
          <DialogTitle>Sorry, something went wrong</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>
                It would be very helpful if you could send a quick email to
                &ensp;<FeedbackLink /> to tell the Scroll Bible maintainers about this
                issue.
              </p>
              
              <p>
                You can copy the error details to your clipboard (see button
                below) and paste it into the email to help the Scroll Bible
                maintainers fix the problem.
              </p>

              <p>
                Ideally we would like to have an automated system that notifies us
                of errors like this so you wouldn't have to send an email, but we haven't
                built that yet.
              </p>

              <p>
                Thanks for your help, and sorry for the trouble!
              </p>
            </DialogContentText>
            <DialogActions>
               <Button onClick={copyErrorDetails}>Copy error details</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Backdrop>
    );
  }
}
