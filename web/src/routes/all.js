import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import { shortIdentifier } from 'scroll-core';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Tiles } from '../components/tiles';
import { Loading } from '../components/loading';
import { LicenseSummary } from '../components/license';
import { useRelatedVerses } from '../hooks/useRelatedVerses';

const All = ({ ids, setPageTitle }) => {
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading,
    relatedVerses,
    canLoadNextPage,
    loadNextPage
  } = useRelatedVerses({ client, ids });

  setPageTitle(`${ids.length / 3} verses`);
  return (
    <>
      <Tiles items={relatedVerses} />
      { isLoading ? <Loading /> : null }
      { !canLoadNextPage ? null : (
        <Stack direction='row' justifyContent='center'>
          <Button onClick={loadNextPage}><KeyboardDoubleArrowDownIcon/></Button>
        </Stack>
      ) }
      <LicenseSummary />
    </>
  );
}

export default All;
