import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';
import style from './style.css';
import { deserialize } from '../../data-transformations/verse';

const Word = ({ id, verseContent }) => {
  const contextVerse = deserialize(verseContent);
  const [strongsEntry, setStrongsEntry] = useState({ data: "Strongs " + id + " (loading)", type: "TEXT" });
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  useEffect(async () => {
    const result = await client.getItem({
      id,
      language: 'en',
      translation: 'strongs',
      document: 'reference',
    });
    setStrongsEntry(result);
  }, [id]);

  const items = [
    { ...contextVerse },
    { ...strongsEntry, contextVerse, selected: true },
  ];
  return (
    <div class={style.word}>
      <br/>
      <Tiles selectedWord={id} items={items} />
    </div>
  );
}

export default Word;
