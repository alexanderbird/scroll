import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { tokenizeForSearch, searchIndex, shortIdentifier, reference } from 'scroll-core';

import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { Tiles } from '../components/tiles';

const Search = ({ query: initialQuery, setPageTitle }) => {
  const [query, setQuery] = useState(initialQuery);

  const onInputChange = e => {
    const newQuery = e.target.value;
    window.history.replaceState({}, window.location.title, '/search/' + encodeURIComponent(newQuery));
    setQuery(newQuery)
  };

  const attemptToSearch = query && query.length > 1;
  const searchResults = attemptToSearch ? search(query) : false;
  const tiles = wrapAsArray(mapSearchToTiles(searchResults))

  setPageTitle("Search by keyword");
  return (
    <>
      <Input
        fullWidth={true}
        value={query}
        autoFocus={true}
        onKeyUp={onInputChange}
        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        placeholder="words to search for"/>
      <div>
        <Tiles items={tiles} />
      </div>
      <div>
        <br/>
        { attemptToSearch && !tiles.length
          ? <Alert severity="error">No verses match <em>{query}</em></Alert>
          : null }
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

function mapSearchToTiles(search) {
  if (!search || search.type === 'nothing') return [];
  if (search.type === 'word') return { type: 'LINK', data: { href: `/word/${search.id}`, text: `Strong's ${search.id}` } };
  if (search.type === 'verse') return { type: 'LINK', data: { href: `/v/${search.id}`, text: search.label } };
  if (search.type === 'list') return search.items.map(mapSearchToTiles);
  throw new Error(`Unsupported search type "${search.type}" (${JSON.stringify(search)})`);
}

function search(phrase) {
  const tokens = tokenizeForSearch(phrase);
  const hits = {};
  const matches = Object.values(tokens.flatMap(x => searchIndex[x]?.match(/.{1,3}/g) || [])
    .reduce((all, one) => {
      all[one] = all[one] || { id: one, count: 0 };
      all[one].count += 1;
      return all;
    }, {}))
    .filter(x => x.count === tokens.length)
    .map(x => shortIdentifier.expand(x.id))
    .map(id => ({ type: 'verse', id, label: reference(id) }));
  return { type: 'list', items: matches };
}

export default Search;
