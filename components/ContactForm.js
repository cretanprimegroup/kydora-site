'use client';

import { useState } from 'react';

// Δύο παραλλαγές:
//   mode="general"  — γενική φόρμα επικοινωνίας (Contact Page V1 §4)
//   mode="property" — αίτημα για συγκεκριμένο ακίνητο (Property Detail V1 §9)
//
// Κάθε υποβολή κουβαλά τη σελίδα, τη γλώσσα και τον κωδικό ακινήτου, ώστε να
// ξέρουμε από πού ήρθε το lead. Δεν στέλνεται τίποτα πριν δοθεί συγκατάθεση.
export default function ContactForm({ f, locale, mode = 'general', propertyCode = '' }) {
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e) {
    e.preventDefault();
    if (state === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const get = (k) => (fd.get(k) || '').toString().trim();

    const payload = {
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      company: get('company'),
      message: get('message'),
      when: get('when'),
      reason: get('reason'),
      intent: get('intent'),
      consent: fd.get('consent') === 'on',
      website: get('website'), // honeypot
      startedAt,
      propertyCode,
      locale,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (!payload.name || (mode === 'general' && !payload.message)) {
      setError(f.errRequired);
      setState('error');
      return;
    }
    if (!payload.email && !payload.phone) {
      setError(f.errContact);
      setState('error');
      return;
    }
    if (!payload.consent) {
      setError(f.errConsent);
      setState('error');
      return;
    }

    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad status');
      setState('done');
    } catch {
      setError(f.errSend);
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="form-done" role="status">
        <p>
          {mode === 'property' && propertyCode
            ? f.successProperty.replace('{code}', propertyCode)
            : f.success}
        </p>
      </div>
    );
  }

  const opt = ` (${f.optional})`;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* Κρυφό για ανθρώπους, ορατό για bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="fields">
        <p className="field full">
          <label htmlFor="cf-name">{f.name}</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
        </p>

        <p className="field">
          <label htmlFor="cf-email">{f.email}</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" />
        </p>

        <p className="field">
          <label htmlFor="cf-phone">{f.phone}</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </p>

        <p className="hint full">{f.contactHint}</p>

        {mode === 'general' ? (
          <>
            <p className="field">
              <label htmlFor="cf-reason">{f.reason}</label>
              <select id="cf-reason" name="reason" defaultValue={f.reasons[0]}>
                {f.reasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </p>
            <p className="field">
              <label htmlFor="cf-company">{f.company}<span className="opt">{opt}</span></label>
              <input id="cf-company" name="company" type="text" autoComplete="organization" />
            </p>
          </>
        ) : (
          <>
            <p className="field">
              <label htmlFor="cf-intent">{f.intent}</label>
              <select id="cf-intent" name="intent" defaultValue={f.intents[0]}>
                {f.intents.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </p>
            <p className="field">
              <label htmlFor="cf-when">{f.when}<span className="opt">{opt}</span></label>
              <input id="cf-when" name="when" type="text" />
            </p>
          </>
        )}

        <p className="field full">
          <label htmlFor="cf-message">
            {f.message}
            {mode === 'property' ? <span className="opt">{opt}</span> : null}
          </label>
          <textarea id="cf-message" name="message" rows={mode === 'property' ? 4 : 6} />
        </p>

        <p className="check full">
          <input id="cf-consent" name="consent" type="checkbox" />
          <label htmlFor="cf-consent">{f.consent}</label>
        </p>
      </div>

      {state === 'error' && error ? (
        <p className="form-err" role="alert">{error}</p>
      ) : null}

      <div className="form-foot">
        <button className="btn btn-1" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? f.sending : mode === 'property' ? f.submitProperty : f.submit}
        </button>
        <p className="privacy">{f.privacy}</p>
      </div>
    </form>
  );
}
