import { useIntl, FormattedMessage, setLocale, getLocale } from 'umi';
import styles from './index.module.scss';

export default function IndexPage() {
  const intl = useIntl();
  const currentLocale = getLocale();

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.brand}><FormattedMessage id="nav.brand" /></span>
        <div className={styles.navLinks}>
          <a href="#features"><FormattedMessage id="nav.features" /></a>
          <a href="/pricing"><FormattedMessage id="nav.pricing" /></a>
          <a href="/register" className={styles.loginBtn}><FormattedMessage id="nav.login" /></a>
          <button
            className={styles.langBtn}
            onClick={() => setLocale(currentLocale === 'zh-CN' ? 'en-US' : 'zh-CN', false)}
          >
            {currentLocale === 'zh-CN' ? 'EN' : '中文'}
          </button>
        </div>
      </nav>

      <section className={styles.hero}>
        <h1><FormattedMessage id="home.title" /></h1>
        <p className={styles.subtitle}><FormattedMessage id="home.subtitle" /></p>
        <div className={styles.ctas}>
          <a href="/register" className={styles.primaryBtn}><FormattedMessage id="home.cta.primary" /></a>
          <a href="/register" className={styles.secondaryBtn}><FormattedMessage id="home.cta.secondary" /></a>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <h2><FormattedMessage id="home.features.title" /></h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3><FormattedMessage id="home.features.task.title" /></h3>
            <p><FormattedMessage id="home.features.task.desc" /></p>
          </div>
          <div className={styles.card}>
            <h3><FormattedMessage id="home.features.board.title" /></h3>
            <p><FormattedMessage id="home.features.board.desc" /></p>
          </div>
          <div className={styles.card}>
            <h3><FormattedMessage id="home.features.data.title" /></h3>
            <p><FormattedMessage id="home.features.data.desc" /></p>
          </div>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <h2><FormattedMessage id="home.bottom.title" /></h2>
        <a href="/register" className={styles.primaryBtn}><FormattedMessage id="home.cta.primary" /></a>
      </section>

      <footer className={styles.footer}>
        <FormattedMessage id="home.footer" />
      </footer>
    </div>
  );
}
