import { FC } from 'react';

// Libs
import Lottie from 'lottie-react';

// Animation data
import loadingData from './fixtures/animations/loadingData.json';

// Styles
import styles from './Loading.module.css';

const LOTTIE_STYLES = {
  width: 300,
  height: 300
};

const Loading: FC = () => (
  <div className={styles.wrapper}>
    <Lottie animationData={loadingData} loop autoplay style={LOTTIE_STYLES} />
    <h3>Loading information. Please, wait...</h3>
  </div>
);

Loading.displayName = 'Loading';

export default Loading;
