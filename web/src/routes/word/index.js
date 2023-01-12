import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';
import style from './style.css';
import { deserialize } from '../../data-transformations/verse';
import { useRelatedVerses } from '../../hooks/useRelatedVerses';

const Word = ({ id, verseContent }) => {
  const contextVerse = verseContent ? deserialize(verseContent) : false;
  const [strongsEntry, setStrongsEntry] = useState({ data: "Strongs " + id + " (loading)", type: "TEXT", related: "" });
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses
  } = useRelatedVerses({ client, ids: strongsEntry.related });

  useEffect(async () => {
    const result = await client.getItem({
      id,
      language: 'en',
      translation: 'strongs',
      document: 'reference',
    });
    setStrongsEntry(result);
  }, [id]);

  const backgroundItems = contextVerse ? [{ ... contextVerse }] : [];
  backgroundItems.push({ ...strongsEntry, contextVerse, selected: true });
  const items = [ ...backgroundItems, ...relatedVerses ];
  return (
    <div class={style.word}>
      <br/>
      <h3>Strong's {id} {strongsEntry.data.transliteration ? `(${strongsEntry.data.transliteration})` : ''}</h3>
      <Tiles selectedWord={id} items={items} />
      { isLoadingRelatedVerses ? <Loading /> : null }
      { !canLoadMoreRelatedVerses ? null : (
        <div class={style.buttonBar}>
          <button onClick={loadNextPageOfRelatedVerses}>more<br/>⬇</button>
        </div>
      ) }
    </div>
  );
}

export default Word;