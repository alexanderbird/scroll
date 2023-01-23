import { h } from 'preact';
import { useState } from 'preact/hooks';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const ShareButton = ({ text, children }) => {
  const [notification, setNotification] = useState(false);
  const shareGesture = () => {
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setNotification({ severity: 'success', message: 'Copied to clipboard' });
      }).catch(e => {
        console.error(e);
        setNotification({ severity: 'warning', message: 'There was a problem copying to the clipboard' });
      });
    }
  };
  return (
    <div>
      {children(shareGesture)}
      <Snackbar open={!!notification} autoHideDuration={2000} onClose={() => setNotification(false)}>
        <Alert severity={notification?.severity} variant='outlined' sx={{ bgcolor: 'background.paper' }}>
          { notification?.message }
        </Alert>
      </Snackbar>
    </div>
  );
}
  
