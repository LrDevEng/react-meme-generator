import MemePreview from './MemePreview';
import styles from './MemeStyle.module.css';
import Toolbox from './Toolbox';

function MemeCreator() {
  return (
    <div className={styles.flexRow}>
      <Toolbox />
      <MemePreview />
    </div>
  );
}

export default MemeCreator;
