import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Tiles } from '../components/tiles';
import { Loading } from '../components/loading';
import { PageHeader } from '../components/pageHeader';
import { deserialize } from '../data-transformations/verse';
import { useRelatedVerses } from '../hooks/useRelatedVerses';
import { LicenseSummary } from '../components/license';
import { Page } from '../components/page';

const Related = ({ id, content }) => {
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
  return (
    <Page>
      <br/>
      <PageHeader>Verses related to {verse.reference}</PageHeader>
      <Tiles selectedWord={id} items={items} />
      { isLoadingRelatedVerses ? <Loading /> : null }
      { !canLoadMoreRelatedVerses ? null : (
        <Stack direction='row' justifyContent='center'>
          <Button onClick={loadNextPageOfRelatedVerses}><KeyboardDoubleArrowDownIcon/></Button>
        </Stack>
      ) }
      <LicenseSummary />
    </Page>
  );
}

export default Related;
