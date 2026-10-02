'use client';

import { useEffect, useState, useCallback } from 'react';

// Συγκατάθεση cookies και φόρτωση Google Analytics ΜΟΝΟ μετά από αυτή.
//
// ΚΑΝΟΝΕΣ (Legal + SEO Finishing Pack V1 §3):
// - Καμία προεπιλεγμένη συγκατάθεση. Το analytics ξεκινά πάντα κλειστό.
// - Αποδοχή και Απόρριψη με ΙΣΟΤΙΜΗ ορατότητα — ίδιο μέγεθος, ίδιο βάρος.
//   Το σκούρο κουμπί «Αποδοχή» και το ξεθωριασμένο «Απόρριψη» είναι dark pattern.
// - Ο χρήστης αλλάζει γνώμη οποτεδήποτε από το υποσέλιδο.
// - Καταγράφεται απόφαση, timestamp και έκδοση κειμένου.
//
// ΣΗΜΑΝΤΙΚΟ: αν δεν υπάρχει NEXT_PUBLIC_GA_ID, δεν υπάρχει κανένα μη
// απαραίτητο cookie, άρα δεν απαιτείται banner — και δεν εμφανίζεται κανένα.
// Έτσι το site μένει καθαρό μέχρι τη στιγμή που θα μπει πραγματικά το GA.

const KEY = 'kydora-consent';
const VERSION = 'v1';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function readConsent() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    // Αλλαγή έκδοσης = ξαναρωτάμε. Παλιά συγκατάθεση δεν καλύπτει νέο σκοπό.
    if (v?.version !== VERSION) return null;
    return v;
  } catch {
    return null;
  }
}

function writeConsent(analytics) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        analytics: !!analytics,
        version: VERSION,
        at: new Date().toISOString(),
      }),
    );
  } catch {
    /* ιδιωτική περιήγηση ή μπλοκαρισμένη αποθήκευση — συνεχίζουμε χωρίς μνήμη */
  }
}

function loadAnalytics() {
  if (!GA_ID || window.__kydoraGaLoaded) return;
  window.__kydoraGaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  gtag('js', new Date());
  // anonymize_ip: λιγότερα δεδομένα από όσα θα μπορούσαμε να πάρουμε.
  gtag('config', GA_ID, { anonymize_ip: true });
}

function dropAnalyticsCookies() {
  if (GA_ID) window[`ga-disable-${GA_ID}`] = true;
  const host = location.hostname;
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat)/.test(name)) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    });
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

export default function CookieConsent({ c, locale }) {
  const [state, setState] = useState('idle'); // idle | banner | panel
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!GA_ID) return; // κανένα μη απαραίτητο cookie, κανένα banner
    const stored = readConsent();
    if (stored) {
      setAnalytics(stored.analytics);
      if (stored.analytics) loadAnalytics();
    } else {
      setState('banner');
    }
  }, []);

  // Ο σύνδεσμος στο υποσέλιδο. Delegation, ώστε να μένει ένα client component
  // και να μπορεί το footer να είναι server-rendered.
  useEffect(() => {
    function onClick(e) {
      // Το e.target δεν είναι πάντα Element (κόμβος κειμένου, document) και το
      // .closest θα έσκαγε μέσα σε listener ολόκληρου του document.
      const el = e.target instanceof Element ? e.target : null;
      const trigger = el && el.closest('[data-cookie-settings]');
      if (!trigger) return;
      e.preventDefault();
      setAnalytics(readConsent()?.analytics ?? false);
      setState('panel');
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (state !== 'panel') return;
    function onKey(e) {
      if (e.key === 'Escape') setState('idle');
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [state]);

  const decide = useCallback((value) => {
    const had = readConsent()?.analytics ?? false;
    writeConsent(value);
    setAnalytics(value);
    setState('idle');
    if (value) {
      loadAnalytics();
    } else if (had) {
      // Ανάκληση: σβήνουμε ό,τι μπήκε και ξεκινάμε καθαρά.
      dropAnalyticsCookies();
      location.reload();
    }
  }, []);

  if (!GA_ID) return null;

  if (state === 'banner') {
    return (
      <div className="cc" role="region" aria-label={c.heading}>
        <div className="cc-in">
          <div className="cc-text">
            <h2>{c.heading}</h2>
            <p>{c.body}</p>
            <p className="cc-links">
              <a href={`/${locale}/cookie-policy`}>{c.policyLink}</a>
              {' · '}
              <a href={`/${locale}/privacy-policy`}>{c.privacyLink}</a>
            </p>
          </div>
          <div className="cc-acts">
            <button type="button" className="cc-btn" onClick={() => decide(true)}>
              {c.acceptAll}
            </button>
            <button type="button" className="cc-btn" onClick={() => decide(false)}>
              {c.rejectAll}
            </button>
            <button
              type="button"
              className="cc-btn cc-btn-q"
              onClick={() => {
                setAnalytics(false);
                setState('panel');
              }}
            >
              {c.settings}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'panel') {
    return (
      <div className="cc-ov">
        <div className="cc-panel" role="dialog" aria-modal="true" aria-label={c.panelHeading}>
          <h2>{c.panelHeading}</h2>

          <div className="cc-row">
            <div>
              <h3>{c.necessaryTitle}</h3>
              <p>{c.necessaryBody}</p>
            </div>
            <span className="cc-fixed">{c.necessaryState}</span>
          </div>

          <div className="cc-row">
            <div>
              <h3>{c.analyticsTitle}</h3>
              <p>{c.analyticsBody}</p>
            </div>
            <label className="cc-sw">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span aria-hidden="true" />
              <span className="cc-sr">{c.analyticsTitle}</span>
            </label>
          </div>

          <p className="cc-links">
            <a href={`/${locale}/cookie-policy`}>{c.policyLink}</a>
            {' · '}
            <a href={`/${locale}/privacy-policy`}>{c.privacyLink}</a>
          </p>

          <div className="cc-acts">
            <button type="button" className="cc-btn" onClick={() => decide(analytics)}>
              {c.save}
            </button>
            <button type="button" className="cc-btn cc-btn-q" onClick={() => setState('idle')}>
              {c.close}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
