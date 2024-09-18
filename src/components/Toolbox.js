import { useState } from 'react';
import styles from './MemeStyle.module.css';

function Toolbox() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  return (
    <div className={styles.flexChildHumble}>
      <div className={styles.flexColumnBetween}>
        <form
          className={styles.flexColumn}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h1>Meme Generator</h1>
          <label htmlFor="memeTemplate">Meme template</label>
          <input id="memeTemplate" />
          <label htmlFor="topText">Top text</label>
          <input
            id="topText"
            value={topText}
            onChange={(event) => {
              setTopText(event.currentTarget.value);
            }}
          />
          <label
            htmlFor="bottomText"
            value={bottomText}
            onChange={(event) => {
              setBottomText(event.currentTarget.value);
            }}
          >
            Bottom text
          </label>
          <input id="bottomText" />
          <button>Generate</button>
        </form>
        <button>Download</button>
      </div>
    </div>
  );
}

export default Toolbox;
