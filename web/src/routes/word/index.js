import { h } from 'preact';
import { Tiles } from '../../components/tiles';
import style from './style.css';
import { deserialize } from '../../data-transformations/verse';

const Word = ({ id, verseContent }) => {
  const contextVerse = deserialize(verseContent);
  const items = [
    { ...contextVerse },
    { data: "Strongs " + id + " (not yet implemented)", type: "TEXT", selected: true },
  ];
  return (
    <div class={style.word}>
      <br/>
      <Tiles selectedWord={id} items={items} />
    </div>
  );
}

export default Word;
