import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { jump } from 'scroll-core';

import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { Tiles } from '../components/tiles';

const Jump = ({ query: initialQuery, setPageTitle }) => {
  const [query, setQuery] = useState(initialQuery);

  const onInputChange = e => {
    const newQuery = e.target.value;
    window.history.replaceState({}, window.location.title, '/jump/' + encodeURIComponent(newQuery));
    setQuery(newQuery)
  };

  const attemptToSearch = query && query.length > 1;
  const jumpResults = attemptToSearch ? jump(query) : false;
  const tiles = wrapAsArray(mapJumpToTiles(jumpResults))

  setPageTitle("Jump to...");
  return (
    <>
      <Input
        fullWidth={true}
        value={query}
        autoFocus={true}
        onKeyUp={onInputChange}
        startAdornment={<InputAdornment position="start"><AirlineStopsIcon /></InputAdornment>}
        placeholder="verse reference or Strong's number"/>
      <div>
        <Tiles items={tiles} />
      </div>
      <div>
        <br/>
        { attemptToSearch && !tiles.length
          ? <Alert severity="error">No verses or Strong's numbers match <em>{query}</em></Alert>
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

function mapJumpToTiles(jump) {
  if (!jump || jump.type === 'nothing') return [];
  if (jump.type === 'word') return { type: 'LINK', data: { href: `/word/${jump.id}`, text: `Strong's ${jump.id}` } };
  if (jump.type === 'verse') return { type: 'LINK', data: { href: `/v/${jump.id}`, text: jump.label } };
  if (jump.type === 'list') return jump.items.map(mapJumpToTiles);
  throw new Error(`Unsupported jump type "${jump.type}" (${JSON.stringify(jump)})`);
}

export default Jump;
