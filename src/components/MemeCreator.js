import { useEffect, useState } from 'react';
import MemePreview from './MemePreview';
import styles from './MemeStyle.module.css';
import Toolbox from './Toolbox';

const URL_TEMPLATES = 'https://api.memegen.link/templates';
const initalTemplate = {
  id: 'aag',
  name: 'Ancient Aliens Guy',
  lines: 2,
  overlays: 0,
  styles: [],
  blank: 'https://api.memegen.link/images/aag.png',
  example: {
    text: ['', 'aliens'],
    url: 'https://api.memegen.link/images/aag/_/aliens.png',
  },
  source: 'http://knowyourmeme.com/memes/ancient-aliens',
  keywords: ['History Channel'],
  _self: 'https://api.memegen.link/templates/aag',
};

function MemeCreator() {
  // State to hold templates pulled from api
  const [templates, setTemplates] = useState([initalTemplate]);

  // State to hold values of input fields of form
  const [topText, setTopText] = useState('Hello');
  const [bottomText, setBottomText] = useState('its me ;)');
  const [currentMemeId, setCurrentMemeId] = useState(templates[0].id);

  // State to hold currently requested url
  const [previewUrl, setPreviewUrl] = useState(parseApiRequest(true));

  // Fetch templates from API
  useEffect(() => {
    fetch(URL_TEMPLATES)
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setCurrentMemeId(data[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  // Callback function to generate meme
  function generateMemePreview() {
    console.log(`Updating current url. ${currentMemeId}`);
    setPreviewUrl(parseApiRequest(true));
  }

  function downloadMeme() {}

  // Parsers
  function parseApiRequest(preview) {
    if (preview) {
      const previewURL = 'https://api.memegen.link/images/preview.jpg';
      const requestUrl = `${previewURL}?template=${currentMemeId}&lines[]=${topText}&lines[]=${bottomText}`;
      return requestUrl;
    }
  }

  return (
    <div className={styles.flexRow}>
      <Toolbox
        memeTemplate={currentMemeId}
        setMemeTemplate={setCurrentMemeId}
        topText={topText}
        setTopText={setTopText}
        bottomText={bottomText}
        setBottomText={setBottomText}
        generateMemePreview={generateMemePreview}
        downloadMeme={downloadMeme}
        templateIds={templates.map((template) => {
          return template.id;
        })}
      />
      <MemePreview src={previewUrl} />
    </div>
  );
}

export default MemeCreator;
