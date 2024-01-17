import { FC, useCallback } from 'react';

// Libs
import { CloseCircleOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Result from 'antd/es/result';
import type { FallbackProps } from 'react-error-boundary';

// Styles
import styles from './ErrorFallback.module.css';

const ErrorFallback: FC<FallbackProps> = props => {
  const { error } = props;

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Result
      status="error"
      title="Error"
      subTitle={error.message}
      extra={
        <Button type="primary" onClick={handleReloadPage}>
          Reload the page
        </Button>
      }
      className={styles.wrapper}
    >
      <header className={styles.header}>
        <CloseCircleOutlined className={styles.detailsErrorIcon} />
        <h3>Details:</h3>
      </header>
      <pre>{error.stack}</pre>
    </Result>
  );
};

ErrorFallback.displayName = 'ErrorFallbackComponent';

export default ErrorFallback;
