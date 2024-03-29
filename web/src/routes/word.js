import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Tiles } from '../components/tiles';
import { Loading } from '../components/loading';
import { LicenseSummary } from '../components/license';
import { deserialize } from '../data-transformations/verse';
import { useRelatedVerses } from '../hooks/useRelatedVerses';

const Word = ({ id, verseContent, setPageTitle }) => {
  const contextVerse = verseContent ? deserialize(verseContent) : false;
  const [strongsEntry, setStrongsEntry] = useState({ data: "Strongs " + id + " (loading)", type: "TEXT", related: "" });
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses,
    setIds: setRelatedIds,
  } = useRelatedVerses({ client, ids: [] });

  useEffect(() => {
    const relatedIds = contextVerse
      ? strongsEntry.related.split(',').filter(x => x !== contextVerse.id).join(',')
      : strongsEntry.related;
    setRelatedIds(relatedIds);
  }, [strongsEntry]);

  useEffect(async () => {
    const result = await client.getItem({ id, language: 'en', translation: 'strongs', document: 'reference' });
    setStrongsEntry(result || { isMissing: true, type: 'ERROR', data: `Strong's ${id} not found`, related: "" });
  }, [id]);

  const backgroundItems = contextVerse ? [{ ...contextVerse, doExplodeVerseSegments: true }] : [];
  backgroundItems.push({ ...strongsEntry, contextVerse, selected: true });
  const items = [ ...backgroundItems, ...relatedVerses ];
  setPageTitle(`Strong's ${id} ${strongsEntry.data.transliteration ? `(${strongsEntry.data.transliteration})` : ''}`);
  return (
    <>
      <Tiles selectedWord={id} items={items} />
      { isLoadingRelatedVerses ? <Loading /> : null }
      { !canLoadMoreRelatedVerses ? null : (
        <Stack direction='row' justifyContent='center'>
          <Button onClick={loadNextPageOfRelatedVerses}><KeyboardDoubleArrowDownIcon/></Button>
        </Stack>
      ) }
      <LicenseSummary />
    </>
  );
}

export default Word;
