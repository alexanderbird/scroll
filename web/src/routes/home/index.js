import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';
import { buildClient, defaultTimeProvider } from 'scroll-api-sdk';
import { Tiles } from '../../components/tiles';

const Home = () => {
  const [ verses, setVerses ] = useState(null);
  useEffect(async () => {
    const client = buildClient({ timeProvider: defaultTimeProvider });
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
        : <p>loading</p>
      }
    </div>
  );
}

export default Home;