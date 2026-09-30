import { Client } from '@notionhq/client';

// Το website δεν είναι master βάση. Διαβάζει μόνο τον εγκεκριμένο public layer
// από το KYDORA Properties, σύμφωνα με το Safe-to-Publish Listing Schema V1.
// Δεν γράφει ποτέ σε αυτή τη βάση και δεν διαβάζει στοιχεία ιδιοκτήτη.

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_PROPERTIES_DB;

const notion = token ? new Client({ auth: token }) : null;

// Πεδία που επιτρέπεται να φύγουν προς τα έξω. Ό,τι δεν είναι εδώ δεν δημοσιεύεται.
const PUBLIC_FIELDS = {
  title: 'Ακίνητο',
  publicTitle: 'Approved Listing Title',
  shortDesc: 'Approved Short Description',
  copyEl: 'Approved GR Copy',
  copyEn: 'Approved EN Copy',
  price: 'Ζητούμενη Τιμή €',
  area: 'Επιφάνεια m²',
  type: 'Τύπος Ακινήτου',
  subtype: 'Υποκατηγορία',
  publicLocation: 'Δημόσια Ονομασία Τοποθεσίας',
  mandate: 'Τύπος Ανάθεσης',
  status: 'Κατάσταση',
  approval: 'Έγκριση Δημοσίευσης',
  image: 'Primary Marketing Image',
  code: 'Property ID',
  photos: 'Photos / Files',
  photoStatus: 'Photography Status',
};

function plain(prop) {
  if (!prop) return null;
  switch (prop.type) {
    case 'title':
      return prop.title.map((t) => t.plain_text).join('') || null;
    case 'rich_text':
      return prop.rich_text.map((t) => t.plain_text).join('') || null;
    case 'number':
      return prop.number;
    case 'select':
      return prop.select?.name || null;
    case 'files': {
      const f = prop.files?.[0];
      if (!f) return null;
      return f.type === 'external' ? f.external.url : f.file?.url || null;
    }
    case 'unique_id': {
      const { prefix, number } = prop.unique_id || {};
      if (number == null) return null;
      return prefix ? `${prefix}-${number}` : String(number);
    }
    default:
      return null;
  }
}

// Όλα τα αρχεία εικόνας ενός file property, με τη σειρά του Notion.
function imageList(prop) {
  if (!prop || prop.type !== 'files') return [];
  return prop.files
    .map((f) => ({
      url: f.type === 'external' ? f.external?.url : f.file?.url,
      name: f.name || '',
    }))
    .filter((f) => f.url && /\.(jpe?g|png|webp|avif)(\?|$)/i.test(f.url));
}

function shape(page) {
  const p = page.properties;
  const get = (key) => plain(p[PUBLIC_FIELDS[key]]);

  // Το slug είναι ο δημόσιος κωδικός ακινήτου (π.χ. kyd-8). Ο κωδικός επιτρέπεται
  // ρητά στο δημόσιο layer — Property Detail Framework §12.
  const code = get('code');

  // Gallery: μόνο όταν το φωτογραφικό υλικό είναι εγκεκριμένο.
  // Basic / Professional σημαίνει ότι υπάρχει υλικό αλλά δεν έχει περάσει έγκριση.
  const photoStatus = get('photoStatus');
  const hero = get('image');
  const gallery =
    photoStatus === 'Approved'
      ? imageList(p[PUBLIC_FIELDS.photos]).filter((f) => f.url !== hero)
      : [];

  return {
    id: page.id,
    code,
    slug: code ? code.toLowerCase() : page.id.replace(/-/g, '').slice(0, 12),
    title: get('publicTitle') || get('title'),
    shortDesc: get('shortDesc'),
    copy: { el: get('copyEl'), en: get('copyEn') },
    price: get('price'),
    area: get('area'),
    type: get('type'),
    subtype: get('subtype'),
    location: get('publicLocation'),
    mandate: get('mandate'),
    image: hero,
    gallery,
  };
}

/**
 * Επιστρέφει μόνο ακίνητα με Έγκριση Δημοσίευσης = Approved
 * και Κατάσταση σε Active ή Under Offer.
 * Αν λείπει το token, επιστρέφει κενό — το site χτίζεται κανονικά.
 */
export async function getPublishedProperties() {
  if (!notion || !databaseId) return [];

  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: PUBLIC_FIELDS.approval, select: { equals: 'Approved' } },
          {
            or: [
              { property: PUBLIC_FIELDS.status, select: { equals: 'Active' } },
              { property: PUBLIC_FIELDS.status, select: { equals: 'Under Offer' } },
            ],
          },
        ],
      },
      page_size: 50,
    });
    return res.results.map(shape);
  } catch (err) {
    console.error('[notion] property fetch failed:', err.message);
    return [];
  }
}

export async function getPropertyBySlug(slug) {
  const all = await getPublishedProperties();
  return all.find((p) => p.slug === slug) || null;
}
