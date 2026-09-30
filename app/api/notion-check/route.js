import { Client } from '@notionhq/client';

// Διαγνωστικό. Λέει ΓΙΑΤΙ δεν έρχονται ακίνητα, χωρίς να αποκαλύπτει ποτέ το token.
// Προσβάσιμο μόνο όσο το site είναι πίσω από το Vercel Authentication.
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PROPERTIES_DB;

  const out = {
    tokenPresent: Boolean(token),
    tokenLooksRight: Boolean(token && token.startsWith('ntn_')),
    tokenLength: token ? token.length : 0,
    databaseId: databaseId || null,
    sitePublic: process.env.SITE_PUBLIC || '(not set)',
  };

  if (!token || !databaseId) {
    out.verdict = 'Λείπει μεταβλητή περιβάλλοντος.';
    return Response.json(out, { status: 200 });
  }

  const notion = new Client({ auth: token });

  // 1. Βλέπει καν τη βάση;
  try {
    const db = await notion.databases.retrieve({ database_id: databaseId });
    out.databaseTitle = db.title?.map((t) => t.plain_text).join('') || '(χωρίς τίτλο)';
  } catch (err) {
    out.verdict = 'Δεν βλέπει τη βάση.';
    out.error = { code: err.code, message: err.message };
    return Response.json(out, { status: 200 });
  }

  // 2. Πόσες εγγραφές συνολικά, χωρίς φίλτρο;
  try {
    const all = await notion.databases.query({ database_id: databaseId, page_size: 50 });
    out.totalRows = all.results.length;
    out.rows = all.results.map((p) => ({
      title: p.properties['Ακίνητο']?.title?.map((t) => t.plain_text).join('') || null,
      status: p.properties['Κατάσταση']?.select?.name ?? null,
      approval: p.properties['Έγκριση Δημοσίευσης']?.select?.name ?? null,
    }));
  } catch (err) {
    out.verdict = 'Βλέπει τη βάση αλλά το query απέτυχε.';
    out.error = { code: err.code, message: err.message };
    return Response.json(out, { status: 200 });
  }

  // 3. Με το φίλτρο του site.
  try {
    const filtered = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: 'Έγκριση Δημοσίευσης', select: { equals: 'Approved' } },
          {
            or: [
              { property: 'Κατάσταση', select: { equals: 'Active' } },
              { property: 'Κατάσταση', select: { equals: 'Under Offer' } },
            ],
          },
        ],
      },
      page_size: 50,
    });
    out.publishedCount = filtered.results.length;
    out.verdict =
      filtered.results.length > 0
        ? 'ΟΚ — η σύνδεση δουλεύει.'
        : 'Η σύνδεση δουλεύει αλλά κανένα ακίνητο δεν περνάει το φίλτρο.';
  } catch (err) {
    out.verdict = 'Το φιλτραρισμένο query απέτυχε.';
    out.error = { code: err.code, message: err.message };
  }

  return Response.json(out, { status: 200 });
}
