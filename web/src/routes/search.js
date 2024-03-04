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
  const attemptToSearch = query && query.length > 1;
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses: items,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses,
    ids: searchResults,
    setIds,
  } = useRelatedVerses({ client, ids: [] });

  const onInputChange = e => {
    const newQuery = e.target.value;
    console.log({ newQuery });
    window.history.replaceState({}, window.location.title, '/search/' + encodeURIComponent(newQuery));
    setQuery(newQuery);
  };

  const debouncedOnInputChange = debounce(onInputChange, 1000);

  useEffect(() => {
    console.log({ query });
    const searchResults = attemptToSearch ? search(query) : [];
    setIds(searchResults);
  }, [query]);

  setPageTitle("Search by keyword");
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
        { attemptToSearch && !searchResults.length
          ? <Alert severity="error">No verses match <em>{query}</em></Alert>
          : null }
      </div>
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
