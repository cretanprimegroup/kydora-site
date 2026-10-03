import { Client } from '@notionhq/client';
import { notifyNewLead } from '../../../lib/notify';

// Γράφει ένα lead στη βάση "KYDORA Επαφές & Leads".
//
// ΑΣΦΑΛΕΙΑ: χρησιμοποιεί ΞΕΧΩΡΙΣΤΟ token από αυτό που διαβάζει τα ακίνητα.
// Το token αυτό έχει μόνο "Insert content" και είναι συνδεδεμένο μόνο στη βάση
// των leads. Ακόμη κι αν διαρρεύσει, δεν διαβάζει τίποτα από το HQ.
export const dynamic = 'force-dynamic';

const TOKEN = process.env.NOTION_LEADS_TOKEN;
const DB = process.env.NOTION_LEADS_DB;

const MAX = {
  name: 120, email: 200, phone: 40, company: 120, message: 4000, when: 120,
  propertyType: 80, area: 160, timeline: 120, priceExpectation: 60, contactPref: 60,
};

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

  // Πεδία φόρμας ιδιοκτήτη. Μένουν στο σώμα της σελίδας, όχι σε εσωτερικά
  // πεδία αξιολόγησης — η τιμή εδώ είναι προσδοκία ιδιοκτήτη, όχι εκτίμηση.
  const formType = clean(data.formType, 20);
  const propertyType = clean(data.propertyType, MAX.propertyType);
  const area = clean(data.area, MAX.area);
  const timeline = clean(data.timeline, MAX.timeline);
  const priceExpectation = clean(data.priceExpectation, MAX.priceExpectation);
  const contactPref = clean(data.contactPref, MAX.contactPref);

  if (!name || (!email && !phone) || data.consent !== true) {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const detail = [
    formType === 'seller' ? 'Seller Consultation' : reason || intent,
    formType === 'seller' && area ? `Περιοχή: ${area}` : null,
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

  // Η φόρμα ιδιοκτήτη είναι μονοσήμαντη και υπερισχύει. Αλλιώς: αίτημα από
  // σελίδα ακινήτου = ενδιαφερόμενος αγοραστής, διαφορετικά κρίνει το θέμα.
  const leadType =
    formType === 'seller'
      ? 'Ιδιοκτήτης / Πωλητής'
      : LEAD_TYPE[reason] || (code ? 'Αγοραστής' : null);
  if (leadType) properties['Τύπος Lead'] = { select: { name: leadType } };
  else if (reason || intent) properties['Τύπος Lead'] = { select: { name: 'Άλλο' } };

  // Το μήνυμα και τα συμφραζόμενα πάνε στο σώμα της σελίδας — η βάση δεν έχει
  // δημόσιο πεδίο κειμένου και δεν θέλουμε να γεμίζουμε εσωτερικά πεδία.
  const lines = [
    formType === 'seller' ? 'Φόρμα: Seller Consultation' : null,
    reason ? `Θέμα: ${reason}` : null,
    intent ? `Αίτημα: ${intent}` : null,
    propertyType ? `Τύπος ακινήτου: ${propertyType}` : null,
    area ? `Περιοχή: ${area}` : null,
    timeline ? `Χρονικός ορίζοντας: ${timeline}` : null,
    priceExpectation ? `Προσδοκία τιμής ιδιοκτήτη: ${priceExpectation}` : null,
    contactPref ? `Προτιμώμενη επικοινωνία: ${contactPref}` : null,
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

  let page;
  try {
    const notion = new Client({ auth: TOKEN });
    page = await notion.pages.create({ parent: { database_id: DB }, properties, children });
  } catch (err) {
    // Ποτέ δεν επιστρέφουμε λεπτομέρειες του Notion στον επισκέπτη.
    console.error('[lead] αποτυχία εγγραφής:', err.code, err.message);
    return Response.json({ ok: false }, { status: 502 });
  }

  // Το lead έχει καταχωριθεί. Η ειδοποίηση είναι bonus — αν αποτύχει, ο
  // επισκέπτης βλέπει κανονικά επιβεβαίωση και τα στοιχεία δεν χάνονται.
  await notifyNewLead(
    {
      name, email, phone, message, company, when, reason, intent, code, pageUrl, locale,
      formType, propertyType, area, timeline, priceExpectation, contactPref,
    },
    page?.url,
  );

  return Response.json({ ok: true });
}
