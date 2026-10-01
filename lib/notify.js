// Ειδοποίηση με email όταν έρχεται νέο lead από το site.
//
// Χρησιμοποιεί το REST API του Resend με απλό fetch — καμία νέα εξάρτηση στο
// package.json, άρα κανένα ρίσκο στο build.
//
// ΚΑΝΟΝΑΣ: η αποστολή δεν μπλοκάρει ποτέ την καταχώριση. Αν το email αποτύχει,
// το lead έχει ήδη γραφτεί στο Notion και δεν χάνεται τίποτα.

const API = 'https://api.resend.com/emails';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value, href) {
  if (!value) return '';
  const inner = href
    ? `<a href="${esc(href)}" style="color:#3f4636;text-decoration:underline">${esc(value)}</a>`
    : esc(value);
  return `<tr>
    <td style="padding:9px 16px 9px 0;color:#6a6b64;font-size:13px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
    <td style="padding:9px 0;color:#1e1f1f;font-size:15px">${inner}</td>
  </tr>`;
}

/**
 * @param {object} lead  τα καθαρισμένα στοιχεία της φόρμας
 * @param {string} notionUrl  σύνδεσμος της εγγραφής στο Notion, αν υπάρχει
 */
export async function notifyNewLead(lead, notionUrl) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!key || !to) return { sent: false, reason: 'not-configured' };

  const from = process.env.LEAD_NOTIFY_FROM || 'KYDORA <onboarding@resend.dev>';

  const subject = lead.code
    ? `Νέο lead — ${lead.name} · ${lead.code}`
    : `Νέο lead — ${lead.name}`;

  const html = `<!doctype html>
<html lang="el"><body style="margin:0;padding:24px;background:#f2efe6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e1d6;border-radius:3px">
    <div style="padding:22px 28px;border-bottom:1px solid #e5e1d6">
      <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#a88a5a">KYDORA · kydora.gr</div>
      <div style="margin-top:6px;font-size:19px;color:#1e1f1f">Νέο αίτημα από το site</div>
    </div>
    <div style="padding:22px 28px">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${row('Όνομα', lead.name)}
        ${row('Email', lead.email, lead.email ? `mailto:${lead.email}` : null)}
        ${row('Τηλέφωνο', lead.phone, lead.phone ? `tel:${lead.phone.replace(/\s/g, '')}` : null)}
        ${row('Θέμα', lead.reason || lead.intent)}
        ${row('Ακίνητο', lead.code)}
        ${row('Προτιμώμενη ημέρα', lead.when)}
        ${row('Εταιρεία', lead.company)}
        ${row('Γλώσσα', lead.locale === 'el' ? 'Ελληνικά' : 'Αγγλικά')}
        ${row('Σελίδα', lead.pageUrl, lead.pageUrl)}
      </table>
      ${
        lead.message
          ? `<div style="margin-top:20px;padding-top:18px;border-top:1px solid #e5e1d6">
               <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6a6b64">Μήνυμα</div>
               <div style="margin-top:10px;font-size:15px;line-height:1.7;color:#1e1f1f;white-space:pre-wrap">${esc(lead.message)}</div>
             </div>`
          : ''
      }
      ${
        notionUrl
          ? `<div style="margin-top:24px">
               <a href="${esc(notionUrl)}" style="display:inline-block;background:#3f4636;color:#f2efe6;text-decoration:none;padding:12px 22px;border-radius:2px;font-size:14px">Άνοιγμα στο Notion</a>
             </div>`
          : ''
      }
    </div>
    <div style="padding:16px 28px;border-top:1px solid #e5e1d6;color:#6a6b64;font-size:12px;line-height:1.7">
      Απαντώντας σε αυτό το email απαντάτε απευθείας στον ενδιαφερόμενο.
      Η εγγραφή έχει ήδη καταχωριθεί στα KYDORA Leads.
    </div>
  </div>
</body></html>`;

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject,
        html,
        // Πατάς «Απάντηση» στο κινητό σου και γράφεις κατευθείαν στον πελάτη.
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[notify] αποτυχία αποστολής:', res.status, body.slice(0, 300));
      return { sent: false, reason: `http-${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error('[notify] σφάλμα δικτύου:', err.message);
    return { sent: false, reason: 'network' };
  }
}
