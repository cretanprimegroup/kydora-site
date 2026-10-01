import { Client } from '@notionhq/client';

// Γράφει ένα lead στη βάση "KYDORA Επαφές & Leads".
//
// ΑΣΦΑΛΕΙΑ: χρησιμοποιεί ΞΕΧΩΡΙΣΤΟ token από αυτό που διαβάζει τα ακίνητα.
// Το token αυτό έχει μόνο "Insert content" και είναι συνδεδεμένο μόνο στη βάση
// των leads. Ακόμη κι αν διαρρεύσει, δεν διαβάζει τίποτα από το HQ.
export const dynamic = 'force-dynamic';

const TOKEN = process.env.NOTION_LEADS_TOKEN;
const DB = process.env.NOTION_LEADS_DB;

const MAX = { name: 120, email: 200, phone: 40, company: 120, message: 4000, when: 120 };

// Θέμα αιτήματος -> Τύπος Lead. Ό,τι δεν αντιστοιχίζεται εδώ (development,
// συνεργασίες, media, γενικά) μπαίνει ως "Άλλο", και το πραγματικό θέμα
// καταγράφεται πάντα στη Λεπτομέρεια Πηγής και στο σώμα της σελίδας.
const LEAD_TYPE = {
  'Αγορά ακινήτου': 'Αγοραστής',
  'Buying a property': 'Αγοραστής',
  'Πώληση ακινήτου': 'Ιδιοκτήτης / Πωλητής',
  'Selling a property': 'Ιδιοκτήτης / Πωλητής',
  Επένδυση: 'Επενδυτής',
  Investment: 'Επενδυτής',
};

function clean(v, max) {
  if (typeof v !== 'string') return '';
  return v.replace(/\u0000/g, '').trim().slice(0, max);
}

function txt(value) {
  return { rich_text: value ? [{ text: { content: value.slice(0, 2000) } }] : [] };
}

export async function POST(request) {
  if (!TOKEN || !DB) {
    console.error('[lead] λείπει NOTION_LEADS_TOKEN ή NOTION_LEADS_DB');
    return Response.json({ ok: false }, { status: 503 });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Παγίδες για bots: κρυφό πεδίο που μόνο bot συμπληρώνει, και φόρμα που
  // υποβλήθηκε αστραπιαία. Απαντάμε ΟΚ ώστε το bot να μη δοκιμάσει ξανά.
  if (clean(data.website, 200)) return Response.json({ ok: true });
  const elapsed = Date.now() - Number(data.startedAt || 0);
  if (!Number.isFinite(elapsed) || elapsed < 2500) return Response.json({ ok: true });

  const name = clean(data.name, MAX.name);
  const email = clean(data.email, MAX.email);
  const phone = clean(data.phone, MAX.phone);
  const message = clean(data.message, MAX.message);
  const company = clean(data.company, MAX.company);
  const when = clean(data.when, MAX.when);
  const reason = clean(data.reason, 80);
  const intent = clean(data.intent, 40);
  const code = clean(data.propertyCode, 24);
  const pageUrl = clean(data.pageUrl, 400);
  const locale = data.locale === 'en' ? 'en' : 'el';

  if (!name || (!email && !phone) || data.consent !== true) {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const detail = [
    reason || intent,
    code ? `Ακίνητο ${code}` : null,
    pageUrl,
  ]
    .filter(Boolean)
    .join(' · ');

  const properties = {
    'Επαφή / Lead': { title: [{ text: { content: name } }] },
    Πηγή: { select: { name: 'kydora.gr' } },
    'Κανονικοποιημένη Κατηγορία Πηγής': { select: { name: 'Website' } },
    Στάδιο: { select: { name: 'Νέο' } },
    'Προτιμώμενη Γλώσσα': { select: { name: locale === 'el' ? 'Ελληνικά' : 'Αγγλικά' } },
    'Κατάσταση Επικοινωνίας / Consent': { select: { name: 'Επιτρέπεται' } },
    'Λεπτομέρεια Πηγής': txt(detail),
  };

  if (email) properties.Email = { email };
  if (phone) properties.Phone = { phone_number: phone };
  if (code) properties['Campaign / Listing Reference'] = txt(code);

  // Αίτημα από σελίδα ακινήτου = ενδιαφερόμενος αγοραστής. Αλλιώς κρίνει το θέμα.
  const leadType = LEAD_TYPE[reason] || (code ? 'Αγοραστής' : null);
  if (leadType) properties['Τύπος Lead'] = { select: { name: leadType } };
  else if (reason || intent) properties['Τύπος Lead'] = { select: { name: 'Άλλο' } };

  // Το μήνυμα και τα συμφραζόμενα πάνε στο σώμα της σελίδας — η βάση δεν έχει
  // δημόσιο πεδίο κειμένου και δεν θέλουμε να γεμίζουμε εσωτερικά πεδία.
  const lines = [
    reason ? `Θέμα: ${reason}` : null,
    intent ? `Αίτημα: ${intent}` : null,
    code ? `Ακίνητο: ${code}` : null,
    when ? `Προτιμώμενη ημέρα: ${when}` : null,
    company ? `Εταιρεία: ${company}` : null,
    pageUrl ? `Σελίδα: ${pageUrl}` : null,
  ].filter(Boolean);

  const children = [];
  if (message) {
    children.push({
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: message.slice(0, 1900) } }] },
    });
  }
  if (lines.length) {
    children.push({
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: lines.join('\n') } }] },
    });
  }

  try {
    const notion = new Client({ auth: TOKEN });
    await notion.pages.create({ parent: { database_id: DB }, properties, children });
    return Response.json({ ok: true });
  } catch (err) {
    // Ποτέ δεν επιστρέφουμε λεπτομέρειες του Notion στον επισκέπτη.
    console.error('[lead] αποτυχία εγγραφής:', err.code, err.message);
    return Response.json({ ok: false }, { status: 502 });
  }
}
