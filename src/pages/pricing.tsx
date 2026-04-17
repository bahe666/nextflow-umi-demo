import { useIntl, FormattedMessage, setLocale, getLocale } from 'umi';
import { useState } from 'react';
import styles from './pricing.module.scss';

export default function PricingPage() {
  const intl = useIntl();
  const currentLocale = getLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.brand}><FormattedMessage id="nav.brand" /></a>
        <div className={styles.navLinks}>
          <a href="/#features"><FormattedMessage id="nav.features" /></a>
          <span className={styles.active}><FormattedMessage id="nav.pricing" /></span>
          <a href="/register" className={styles.loginBtn}><FormattedMessage id="nav.login" /></a>
          <button className={styles.langBtn} onClick={() => setLocale(currentLocale === 'zh-CN' ? 'en-US' : 'zh-CN', false)}>
            {currentLocale === 'zh-CN' ? 'EN' : '中文'}
          </button>
        </div>
      </nav>

      <section className={styles.header}>
        <h1><FormattedMessage id="pricing.title" /></h1>
        <p><FormattedMessage id="pricing.subtitle" /></p>
      </section>

      <section className={styles.plans}>
        <div className={styles.card}>
          <h3><FormattedMessage id="pricing.starter.name" /></h3>
          <p className={styles.price}><FormattedMessage id="pricing.starter.price" /></p>
          <p className={styles.desc}><FormattedMessage id="pricing.starter.desc" /></p>
          <ul>
            <li><FormattedMessage id="pricing.starter.f1" /></li>
            <li><FormattedMessage id="pricing.starter.f2" /></li>
            <li><FormattedMessage id="pricing.starter.f3" /></li>
          </ul>
          <a href="/register" className={styles.btn}><FormattedMessage id="pricing.starter.cta" /></a>
        </div>

        <div className={`${styles.card} ${styles.popular}`}>
          <span className={styles.badge}><FormattedMessage id="pricing.pro.badge" /></span>
          <h3><FormattedMessage id="pricing.pro.name" /></h3>
          <p className={styles.price}><FormattedMessage id="pricing.pro.price" /></p>
          <p className={styles.desc}><FormattedMessage id="pricing.pro.desc" /></p>
          <ul>
            <li><FormattedMessage id="pricing.pro.f1" /></li>
            <li><FormattedMessage id="pricing.pro.f2" /></li>
            <li><FormattedMessage id="pricing.pro.f3" /></li>
            <li><FormattedMessage id="pricing.pro.f4" /></li>
          </ul>
          <a href="/register" className={styles.btnWhite}><FormattedMessage id="pricing.pro.cta" /></a>
        </div>

        <div className={styles.card}>
          <h3><FormattedMessage id="pricing.enterprise.name" /></h3>
          <p className={styles.price}><FormattedMessage id="pricing.enterprise.price" /></p>
          <p className={styles.desc}><FormattedMessage id="pricing.enterprise.desc" /></p>
          <ul>
            <li><FormattedMessage id="pricing.enterprise.f1" /></li>
            <li><FormattedMessage id="pricing.enterprise.f2" /></li>
            <li><FormattedMessage id="pricing.enterprise.f3" /></li>
          </ul>
          <a href="/register" className={styles.btn}><FormattedMessage id="pricing.enterprise.cta" /></a>
        </div>
      </section>

      <section className={styles.faq}>
        <h2><FormattedMessage id="pricing.faq.title" /></h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.faqItem}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {intl.formatMessage({ id: `pricing.faq.q${i}` })}
              <span className={openFaq === i ? styles.open : ''}>▼</span>
            </button>
            {openFaq === i && <p>{intl.formatMessage({ id: `pricing.faq.a${i}` })}</p>}
          </div>
        ))}
      </section>

      <footer className={styles.footer}><FormattedMessage id="home.footer" /></footer>
    </div>
  );
}
