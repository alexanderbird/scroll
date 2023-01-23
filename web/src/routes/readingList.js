import { h } from 'preact';
import { jump } from 'scroll-core';
import { useState } from 'preact/hooks';

import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { Tiles } from '../components/tiles';
import { Page } from '../components/page';
import { ShareButton } from '../components/share';
import { useReadingList } from '../hooks/useReadingList';

const EmptyReadingListBlurb = () => (
  <p><Link href="/">Browse to a verse</Link> to add it to your reading list</p>
);

const ReadingList = ({ query: initialQuery }) => {
  const [emptiedItems, setEmptiedItems] = useState(null);
  const [readingList, addToReadingList, clearReadingList, setReadingList] = useReadingList();
  const isEmpty = !readingList || !readingList.length;
  const emptyReadingList = () => {
    setEmptiedItems(readingList);
    clearReadingList();
  }
  const undoEmptyReadingList = () => {
    setReadingList(emptiedItems);
    setEmptiedItems(null);
  }
  const readingListText = readingList
    .map(x => `${x.reference} — ${x.data.slice(0, 3).map(d => d.t.trim()).join(' ')}...`)
    .join('\n');
  return (
    <Page title={ isEmpty ? 'Reading List (empty)' : 'Reading List'}>
      { isEmpty ? <EmptyReadingListBlurb /> : (<>
        <Stack direction='row' sx={{ justifyContent: 'flex-end' }}>
          <ShareButton text={readingListText}>{onShare => (
            <Button size="small" fullWidth={true} onClick={onShare}><IosShareIcon/>Export</Button>
          )}</ShareButton>
          <Button onClick={emptyReadingList} ><DeleteIcon/>Clear</Button>
        </Stack>
        <Tiles items={readingList} />
      </>)}
      <Snackbar open={!!emptiedItems} autoHideDuration={10000} onClose={() => setEmptiedItems(null)} >
        <Alert severity="success" variant="outlined" sx={{ bgcolor: 'background.paper' }} >
          <AlertTitle>Reading list emptied</AlertTitle>
          <Stack direction="row" justifyContent="spaceBetween" alignItems="center" >
            <span>Removed all {emptiedItems?.length} items from the list</span>
            <Button color="inherit" size="small" onClick={undoEmptyReadingList}><UndoIcon />Undo</Button>
          </Stack>
        </Alert>
      </Snackbar>
    </Page>
  );
}

export default ReadingList;
