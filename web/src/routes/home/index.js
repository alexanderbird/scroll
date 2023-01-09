import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import style from './style.css';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';

const Home = () => {
  const [ verses, setVerses ] = useState([]);
  const [ isLoadingNextVerses, setIsLoadingNextVerses ] = useState(true);
  const [ nextPage, setNextPage ] = useState(null);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });
  const pageSize = 50;
  useEffect(async () => {
    const result = await client.getFeedItems({ pageSize });
    setVerses(result.verses);
    setNextPage(result.nextPage);
    if (result.verses.length < pageSize) {
      const secondResult = await client.getFeedItems({ pageSize, page: result.nextPage });
      setVerses(x => [ ...x, ...secondResult.verses ]);
      setNextPage(secondResult.nextPage);
    }
    setIsLoadingNextVerses(false);
  }, []);

  const addAnotherPage = async () => {
      setIsLoadingNextVerses(true);
      const result = await client.getFeedItems({ pageSize, page: nextPage });
      setVerses(x => [ ...x, ...result.verses ]);
      setNextPage(result.nextPage);
      setIsLoadingNextVerses(false);
  };

  return (
    <div class={style.home}>
      <Tiles items={verses} />
      { isLoadingNextVerses ? <Loading/> : (
        <div class={style.buttonBar}>
          <button onClick={addAnotherPage}>more<br/>⬇</button>
        </div>
      ) }
    </div>
  );
}

export default Home;
