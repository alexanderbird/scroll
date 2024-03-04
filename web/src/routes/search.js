import { h } from 'preact';
import debounce from 'debounce';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { tokenizeForSearch, searchIndex, shortIdentifier, reference } from 'scroll-core';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';

import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { Tiles } from '../components/tiles';
import { Loading } from '../components/loading';
import { useRelatedVerses } from '../hooks/useRelatedVerses';
import { LicenseSummary } from '../components/license';

const Search = ({ query: initialQuery, setPageTitle }) => {
  const [query, setQuery] = useState(initialQuery);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses: items,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses,
    ids: searchResults,
    setIds: setSearchResults,
  } = useRelatedVerses({ client, ids: [] });

  const onQueryChange = query => {
    setQuery(query);
    const searchResults = search(query);
    setSearchResults(searchResults);
  }

  const onInputChange = e => {
    const newQuery = e.target.value;
    window.history.replaceState({}, window.location.title, '/search/' + encodeURIComponent(newQuery));
    onQueryChange(newQuery);
  };

  useEffect(() => {
    onQueryChange(initialQuery);
  }, []);

  const debouncedOnInputChange = debounce(onInputChange, 1000);

  setPageTitle("Search by keyword");
  const ResultTiles = () => (
    <>
      <Tiles items={items} />
      { isLoadingRelatedVerses ? <Loading /> : null }
      { !canLoadMoreRelatedVerses ? null : (
        <Stack direction='row' justifyContent='center'>
          <Button onClick={loadNextPageOfRelatedVerses}><KeyboardDoubleArrowDownIcon/></Button>
        </Stack>
      ) }
    </>
  )
  return (
    <>
      <Input
        fullWidth={true}
        value={query}
        autoFocus={true}
        onKeyUp={debouncedOnInputChange}
        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        placeholder="words to search for"/>
      <div>
        <br/>
        { searchResults.length
          ? <ResultTiles />
          : <Alert severity="error">No verses include every word in <em>{query}</em></Alert>
        }
      </div>
    </>
  );
}

function wrapAsArray(oneOrMore) {
  if (Array.isArray(oneOrMore)) {
    return oneOrMore;
  }
  return [oneOrMore];
}

function search(phrase) {
  const tokens = tokenizeForSearch(phrase);
  const hits = {};
  console.log(tokens);
  const matches = Object.values(tokens.flatMap(x => searchIndex[x]?.match(/.{1,3}/g) || [])
    .reduce((all, one) => {
      all[one] = all[one] || { id: one, count: 0 };
      all[one].count += 1;
      return all;
    }, {}))
    .filter(x => x.count === tokens.length)
    .map(x => shortIdentifier.expand(x.id));
  return matches;
}

export default Search;
