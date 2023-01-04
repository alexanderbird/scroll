import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import style from './style.css';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';

const Home = () => {
  const [ verses, setVerses ] = useState(null);
  useEffect(async () => {
    const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });
    const pageSize = 50;
    const result = await client.getFeedItems({ pageSize });
    setVerses(result.verses);
    if (result.verses.length < pageSize) {
      const secondResult = await client.getFeedItems({ pageSize, page: result.nextPage });
      setVerses(x => [ ...x, ...secondResult.verses ]);
    }
  }, []);
  return (
    <div class={style.home}>
      { verses 
        ? <Tiles items={verses} />
        : <Loading/>
      }
    </div>
  );
}

export default Home;
