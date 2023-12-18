// Libs
import { Outlet, Link } from 'react-router-dom';
import {Layout} from 'antd';

// Images
import logo from "../../../public/images/logo.svg";

// Styles
import styles from './PageLayout.module.css'

const PageLayout = () => {
  return (
    <Layout className={styles.wrapper}>
        <Layout.Header className={styles.header}>
            <Link to="/">
                <img src={logo} alt="Star Wars Logo" width={80} height={80}/>
            </Link>
        </Layout.Header>
        <Layout.Content className={styles.content}>
            <Outlet />
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
            <p>
                Developed by <a href="https://github.com/corocoto" className={styles.footer__link}>corocoto (Artem Gusev)</a>
            </p>
            <p>
                Data which using here is thankfully available at the <a href="https://swapi.dev/" className={styles.footer__link}>SWAPI</a>
            </p>
        </Layout.Footer>
    </Layout>
  );
}

export default PageLayout
