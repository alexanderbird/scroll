import { h } from 'preact';
import style from './style.css';
import { useState } from 'preact/hooks';
import { jump } from 'scroll-core';
import { Link } from 'preact-router/match';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Input from '@mui/material/Input';
import { Tiles } from '../../components/tiles';
import { PageHeader } from '../../components/pageHeader';

const Jump = ({ query: initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  const onInputChange = e => {
    const newQuery = e.target.value;
    window.history.replaceState({}, window.location.title, '/jump/' + encodeURIComponent(newQuery));
    setQuery(newQuery)
  };

  const matches = (query && query.length > 1) ? jump(query) : false;

  return (
    <div class={style.jump}>
      <PageHeader>Jump to Verse or Word</PageHeader>
      <Input
        class={style.jumpInput}
        fullWidth={true}
        value={query}
        onKeyUp={onInputChange}
        placeholder="Verse reference or Strong's number"/>
      <div>
        <Tiles items={wrapAsArray(mapJumpToTiles(matches))} />
      </div>
    </div>
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
