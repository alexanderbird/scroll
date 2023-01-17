import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';
import { PageHeader } from '../../components/pageHeader';
import style from './style.css';
import { deserialize } from '../../data-transformations/verse';
import { useRelatedVerses } from '../../hooks/useRelatedVerses';
import { LicenseSummary } from '../../components/license';

const Related = ({ id, content }) => {
  const verse = deserialize(content);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses
  } = useRelatedVerses({ client, ids: verse.related });

  const items = [
    { ...verse, selected: true },
    ...relatedVerses
  ];
  return (
    <div class={style.word}>
      <br/>
      <PageHeader>Verses related to {verse.reference}</PageHeader>
      <Tiles selectedWord={id} items={items} />
      { isLoadingRelatedVerses ? <Loading /> : null }
      { !canLoadMoreRelatedVerses ? null : (
        <div class={style.buttonBar}>
          <button onClick={loadNextPageOfRelatedVerses}>more<br/>⬇</button>
        </div>
      ) }
      <LicenseSummary />
    </div>
  );
}

export default Related;
