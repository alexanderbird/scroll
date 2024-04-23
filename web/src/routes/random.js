import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useState, useEffect } from 'preact/hooks';

import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Tiles } from './../components/tiles';
import { Loading } from './../components/loading';
import { LicenseSummary } from './../components/license';

const Random = ({ setPageTitle }) => {
  const [ verses, setVerses ] = useState([]);
  const [ isLoadingNextVerses, setIsLoadingNextVerses ] = useState(true);
  const [ nextPage, setNextPage ] = useState(null);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });
  const pageSize = 50;
  useEffect(async () => {
    const result = await client.getFeedItems({ pageSize });
    setVerses(result.verses);
    setNextPage(result.nextPage);
    if (result.verses.length < pageSize) {
      const secondResult = await client.getFeedItems({ pageSize, page: result.nextPage });
      setVerses(x => [ ...x, ...secondResult.verses ]);
      setNextPage(secondResult.nextPage);
    }
    setIsLoadingNextVerses(false);
  }, []);

  const addAnotherPage = async () => {
      setIsLoadingNextVerses(true);
      const result = await client.getFeedItems({ pageSize, page: nextPage });
      setVerses(x => [ ...x, ...result.verses ]);
      setNextPage(result.nextPage);
      setIsLoadingNextVerses(false);
  };

  setPageTitle('Scroll Bible');
  return (
    <>
      <Tiles items={verses} />
      { isLoadingNextVerses ? <Loading/> : (
        <>
          <Stack direction='row' justifyContent='center'>
            <Button onClick={addAnotherPage}><KeyboardDoubleArrowDownIcon/></Button>
          </Stack>
          <LicenseSummary />
        </>
      ) }
    </>
  );
}

export default Random;
