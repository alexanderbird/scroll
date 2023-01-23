import { useLocalStorage } from '@rehooks/local-storage';

export const useReadingList = () => {
  const [nullableReadingList, setReadingList] = useLocalStorage('reading-list');
  const readingList = nullableReadingList || [];
  const addToReadingList = item => {
    if (!item) return;
    const newItems = { [item.id]: item };
    readingList.forEach(x => {
      if (x.type === 'TEXT_WITH_STRONGS') {
        newItems[x.id] = x;
      }
    });
    setReadingList(Object.values(newItems));
  }
  const clearReadingList = () => setReadingList([]);
  return [readingList, addToReadingList, clearReadingList, setReadingList];
}
