import { useState, useEffect } from 'preact/hooks';
import { shortIdentifier } from 'scroll-core';

export function useRelatedVerses({ client, ids }) {

  const [remainingPages, setRemainingPages] = useState(splitIdsIntoPages(ids, 25));
  const [relatedVerses, setRelatedVerses] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const canLoadNextPage = () => remainingPages.length && !isLoading;
  
  const loadOnePage = async (page) => {
    setIsLoading(true);
    const result = await client.getVerses({ ids: page });
    if (!result || !result.verses.length) {
      setIsLoading(false);
      throw new Error("Failed to load " + page);
    }
    const sortedResult = result.verses
      .sort((lhs, rhs) => lhs.id < rhs.id ? -1 : 1);
    setRelatedVerses(x => [...x, ...sortedResult]);
    setIsLoading(false);
  }
  
  const loadNextPage = async () => {
    const [thisPage, ...newRemainingPages] = remainingPages;
    setRemainingPages(newRemainingPages);
    await loadOnePage(thisPage);
  }

  useEffect(async () => {
    setRelatedVerses([]);
    const [firstPage, ...newRemainingPages] = splitIdsIntoPages(ids, 25);
    if (!firstPage) { return; }
    setRemainingPages(newRemainingPages);
    await loadOnePage(firstPage);
  }, [ids]);

  return {
    isLoading,
    relatedVerses,
    canLoadNextPage: canLoadNextPage(),
    loadNextPage
  }
}

function splitIdString(ids) {
  if (!ids) return [];
  if (ids.match(/^[0-9]{2}-[0-9]{3}-[0-9]{3}(,[0-9]{2}-[0-9]{3}-[0-9]{3})*$/)) {
    return Array.from(new Set(ids.split(",").filter(x => !!x)));
  }
  return Array.from(new Set(ids.match(/.{3}/g).map(shortIdentifier.expand)));
}

function splitIdsIntoPages(ids, pageSize) {
  return splitIdString(ids)
    .reduce((pages, item, index) => { 
      const pageIndex = Math.floor(index/pageSize);
      pages[pageIndex] = pages[pageIndex] || [];
      pages[pageIndex].push(item);
      return pages;
    }, []);
}
