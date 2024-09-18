import styles from './MemeStyle.module.css';

function MemePreview() {
  return (
    <div className={styles.flexChildGreedy}>
      <img src={''} alt={'meme'} />
    </div>
  );
}

export default MemePreview;
