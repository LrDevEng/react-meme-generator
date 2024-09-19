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
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [currentMemeId, setCurrentMemeId] = useState(templates[0].id);

  // State to hold currently requested url
  const [previewUrl, setPreviewUrl] = useState(parseApiRequest());

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
    setPreviewUrl(parseApiRequest());
    console.log(
      `Updating current url. id: ${currentMemeId}   url: ${previewUrl}`,
    );
  }

  // Callback function to download meme
  function downloadMeme() {
    fetch(parseApiRequest())
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentMemeId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.log(error));
  }

  // Parsing api request
  function parseApiRequest() {
    return `https://api.memegen.link/images/${currentMemeId}/${encodeToUrl(topText)}/${encodeToUrl(bottomText)}.png`;
  }

  // Text to url encoding
  function encodeToUrl(text) {
    if (text.length === 0) return '_';
    return text
      .replaceAll(' ', '_')
      .replaceAll('?', '~q')
      .replaceAll('&', '~a')
      .replaceAll('%', '~p')
      .replaceAll('#', '~h')
      .replaceAll('/', '~s')
      .replaceAll('\\', '~b')
      .replaceAll('<', '~l')
      .replaceAll('>', '~g');
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
        templates={templates}
      />
      <MemePreview src={previewUrl} />
    </div>
  );
}

export default MemeCreator;
