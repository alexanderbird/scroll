import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Tiles } from '../components/tiles';
import { Loading } from '../components/loading';
import { deserialize } from '../data-transformations/verse';
import { useRelatedVerses } from '../hooks/useRelatedVerses';
import { LicenseSummary } from '../components/license';

const Related = ({ id, content, setPageTitle }) => {
  const verse = deserialize(content);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses
  } = useRelatedVerses({ client, ids: verse.related });

  const items = [
    { ...verse, selected: true },
    ...relatedVerses
  ];
  setPageTitle(`related to ${verse.reference}`);
  return (
    <>
      <Tiles items={items} />
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

export default Related;
