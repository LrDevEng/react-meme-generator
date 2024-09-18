import styles from './MemeStyle.module.css';

function MemePreview(props) {
  return (
    <div className={styles.flexChildGreedy}>
      <img src={props.src} alt="Meme" data-test-id="meme-image" />
    </div>
  );
}

export default MemePreview;
