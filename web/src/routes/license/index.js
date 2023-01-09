import { h } from 'preact';
import style from './style.css';

const License = () => {
  return (
    <div class={style.license}>
    <p>Bible text retrieved from <a href="https://studybible.info/WEB_Strongs">studybible.info/WEB_Strongs</a> in January 2023.</p>
    <h3>World English Bible license text</h3>
    <p>(replicated from https://ebible.org/find/show.php?id=engwebp)</p>
     <blockquote>
      <p>
The World English Bible is in the Public Domain. That means that it is not copyrighted. However, "World English Bible" is a Trademark of eBible.org.

      </p>
      <p>
You may copy, publish, proclaim, distribute, redistribute, sell, give away, quote, memorize, read publicly, broadcast, transmit, share, back up, post on the Internet, print, reproduce, preach, teach from, and use the World English Bible as much as you want, and others may also do so. All we ask is that if you CHANGE the actual text of the World English Bible in any way, you not call the result the World English Bible any more. This is to avoid confusion, not to limit your freedom. The Holy Bible is God's Word. It belongs to God. He gave it to us freely, and we who have worked on this translation freely give it to you by dedicating it to the Public Domain.

      </p>
      <p>
Donations to help with the expenses of this project and thus help others have free access to the Word of God may be made to us, but are not required. Please see https://MLJohnson.org/partner/ for more about that.

      </p>
      <p>
The master copy of this Bible translation is posted on https://eBible.org/web/ and at https://WorldEnglish.Bible.
      </p>
      <p>
2020 stable text edition
      </p>
      </blockquote>
    </div>
  );
}

export default License;
