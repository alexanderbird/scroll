import { useLocalStorage } from '@rehooks/local-storage';

export const useReadingList = () => {
  const [nullableReadingList, setReadingList] = useLocalStorage('reading-list');
  const readingList = nullableReadingList || [];
  const idSet = new Set(readingList.map(x => x.id));
  const addToReadingList = item => {
    if (!item) return;
    const newItems = { [item.id]: { ...item, selected: false } };
    readingList.forEach(x => {
      if (x.type === 'TEXT_WITH_STRONGS') {
        newItems[x.id] = x;
      }
    });
    setReadingList(Object.values(newItems));
  }
  const isInReadingList = item => {
    return idSet.has(item.id);
  }
  const removeFromReadingList = id => {
    const newList = readingList.filter(x => x.id !== id);
    setReadingList(newList);
  }
  const clearReadingList = () => setReadingList([]);
  const actions = { addToReadingList, isInReadingList, clearReadingList, setReadingList, removeFromReadingList };
  return [readingList, actions];
}
