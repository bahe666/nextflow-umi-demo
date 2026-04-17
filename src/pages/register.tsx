import { useIntl, FormattedMessage, setLocale, getLocale } from 'umi';
import { useState } from 'react';
import styles from './register.module.scss';

type Status = 'idle' | 'loading' | 'success' | 'error-email' | 'error-password' | 'error-mismatch' | 'error-duplicate' | 'error-network';

export default function RegisterPage() {
  const intl = useIntl();
  const currentLocale = getLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error-email'); return; }
    if (password.length < 8) { setStatus('error-password'); return; }
    if (password !== confirm) { setStatus('error-mismatch'); return; }
    setStatus('loading');
    setTimeout(() => {
      if (email === 'test@example.com') { setStatus('error-duplicate'); return; }
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.checkIcon}>✓</div>
          <h1><FormattedMessage id="register.success.title" /></h1>
          <p><FormattedMessage id="register.success.desc" /></p>
          <a href="/"><FormattedMessage id="register.success.back" /></a>
        </div>
      </div>
    );
  }

  const isLoading = status === 'loading';
  const errorId = status.startsWith('error-') ? `register.${status}` : null;

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <a href="/" className={styles.brand}><FormattedMessage id="nav.brand" /></a>
        <button className={styles.langBtn} onClick={() => setLocale(currentLocale === 'zh-CN' ? 'en-US' : 'zh-CN', false)}>
          {currentLocale === 'zh-CN' ? 'EN' : '中文'}
        </button>
      </div>
      <div className={styles.formCard}>
        <h1><FormattedMessage id="register.title" /></h1>
        <form onSubmit={handleSubmit}>
          <label><FormattedMessage id="register.email.label" /></label>
          <input type="email" placeholder={intl.formatMessage({ id: 'register.email.placeholder' })} value={email} onChange={e => { setEmail(e.target.value); setStatus('idle'); }} />

          <label><FormattedMessage id="register.password.label" /></label>
          <input type="password" placeholder={intl.formatMessage({ id: 'register.password.placeholder' })} value={password} onChange={e => { setPassword(e.target.value); setStatus('idle'); }} />

          <label><FormattedMessage id="register.confirm.label" /></label>
          <input type="password" placeholder={intl.formatMessage({ id: 'register.confirm.placeholder' })} value={confirm} onChange={e => { setConfirm(e.target.value); setStatus('idle'); }} />

          {errorId && <p className={styles.error}>{intl.formatMessage({ id: errorId })}</p>}

          <button type="submit" disabled={isLoading} className={isLoading ? styles.btnDisabled : styles.btn}>
            {isLoading ? intl.formatMessage({ id: 'register.submitting' }) : intl.formatMessage({ id: 'register.submit' })}
          </button>
        </form>
        <p className={styles.loginLink}>
          <FormattedMessage id="register.login.text" />
          {' '}<a href="#"><FormattedMessage id="register.login.link" /></a>
        </p>
      </div>
    </div>
  );
}
