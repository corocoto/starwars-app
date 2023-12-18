// Libs
import Lottie from 'lottie-react';

// Data
import loadingData from './fixtures/animations/loadingData.json';

// Styles
import styles from './Loading.module.css'

const Loading = () => (
    <div className={styles.wrapper}>
        <Lottie
            animationData={loadingData}
            loop
            autoplay
            style={{
                width: 300,
                height: 300,
            }}
          />
        <h3>Loading information. Please, wait...</h3>
    </div>
  );

export default Loading;
