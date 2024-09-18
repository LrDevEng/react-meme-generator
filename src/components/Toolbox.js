import styles from './MemeStyle.module.css';

function Toolbox({
  memeTemplate,
  setMemeTemplate,
  topText,
  setTopText,
  bottomText,
  setBottomText,
  generateMemePreview,
  downloadMeme,
  templateIds,
}) {
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
          <input
            id="memeTemplate"
            list="templates"
            value={memeTemplate}
            onChange={(event) => {
              setMemeTemplate(event.currentTarget.value);
            }}
            onFocus={() => {
              setMemeTemplate('');
            }}
            onBlur={() => {
              generateMemePreview();
            }}
          />
          {/*<datalist id="templates">
            {templateIds.map((id) => {
              return <option key={`template-${id}`}>{id}</option>;
            })}
          </datalist>*/}
          <label htmlFor="topText">Top text</label>
          <input
            id="topText"
            value={topText}
            onChange={(event) => {
              setTopText(event.currentTarget.value);
            }}
          />
          <label htmlFor="bottomText">Bottom text</label>
          <input
            id="bottomText"
            value={bottomText}
            onChange={(event) => {
              setBottomText(event.currentTarget.value);
            }}
          />
          <button onClick={generateMemePreview}>Generate</button>
        </form>
        <button onClick={downloadMeme}>Download</button>
      </div>
    </div>
  );
}

export default Toolbox;
