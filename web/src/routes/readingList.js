import { h } from 'preact';
import { jump } from 'scroll-core';
import { useState } from 'preact/hooks';

import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { Tiles } from '../components/tiles';
import { ShareButton } from '../components/share';
import { useReadingList } from '../hooks/useReadingList';

const EmptyReadingListBlurb = () => (
  <p><Link href="/">Browse to a verse</Link> to add it to your reading list</p>
);

const ReadingList = ({ setPageTitle }) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(x => !x);
  const [emptiedItems, setEmptiedItems] = useState(null);
  const [readingList, readingListActions ] = useReadingList();
  const { addToReadingList, clearReadingList, setReadingList, removeFromReadingList } = readingListActions;
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
  setPageTitle(isEmpty ? 'Reading List (empty)' : 'Reading List');
  return (
    <>
      { isEmpty ? <EmptyReadingListBlurb /> : (<>
        <Stack direction='row' sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={toggleEditMode} sx={{ color: 'var(--color-primary-light)' }}>
            { editMode ? <span><EditOffIcon/>Read</span> : <span><EditIcon/>Edit</span> }
          </Button>
          <ShareButton text={readingListText}>{onShare => (
            <Button sx={{ color: 'var(--color-primary-light)', height: '100%' }} onClick={onShare}><IosShareIcon/>Export</Button>
          )}</ShareButton>
          <Button onClick={emptyReadingList} sx={{ color: 'var(--color-primary-light)' }}><DeleteIcon/>Clear</Button>
        </Stack>
        <Tiles
          items={readingList}
          tileActions={ editMode && (id => (
            <IconButton onClick={() => removeFromReadingList(id)} sx={{ color: 'var(--color-secondary-dark)' }}><DeleteIcon/></IconButton>
          ))}/>
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
    </>
  );
}

export default ReadingList;
