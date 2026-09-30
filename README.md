# kydora.gr

Ιστοσελίδα KYDORA Real Estate & Investments. Next.js 14 (App Router), δίγλωσση GR/EN.

## Κατάσταση

**Δεν είναι δημόσια.** Όσο η μεταβλητή `SITE_PUBLIC` λείπει ή είναι `false`:

- κάθε σελίδα στέλνει `X-Robots-Tag: noindex, nofollow, noarchive`
- το `/robots.txt` απαγορεύει τα πάντα

Την ημέρα του launch: `SITE_PUBLIC=true` στο Vercel και redeploy. Τίποτα άλλο.

## Πού ζει τι

| | |
|---|---|
| `content/copy.js` | Όλα τα κείμενα GR/EN. Πηγή: *KYDORA Website Production Copy V1* (Notion). |
| `styles/globals.css` | Design tokens και όλο το CSS. Πηγή: *Website High-Fidelity Design Brief V1*. |
| `lib/notion.js` | Ανάγνωση ακινήτων από τη βάση KYDORA Properties. Read-only. |
| `app/[locale]/` | Οι σελίδες ανά γλώσσα. |
| `public/` | Λογότυπα και σύμβολα από το KYDORA Brand Pack. |

## Κανόνες

Το website **δεν είναι master βάση**. Διαβάζει μόνο ακίνητα που έχουν
`Έγκριση Δημοσίευσης = Approved` και `Κατάσταση` σε `Active` ή `Under Offer`,
και μόνο τα πεδία του Safe-to-Publish Listing Schema V1. Στοιχεία ιδιοκτήτη,
ακριβής διεύθυνση και εσωτερικά scores δεν φεύγουν ποτέ προς τα έξω.

Η παλέτα είναι κλειδωμένη: Deep Olive `#3F4636`, Warm Ivory `#F2EFE6`,
Charcoal `#1E1F1F`, Stone `#B7B1A6`, Bronze `#A88A5A`. Αλλαγή μόνο με
αναθεώρηση του brief στο Notion.

## Τοπική ανάπτυξη

```bash
cp .env.example .env.local   # και συμπλήρωσε τα κλειδιά
npm install
npm run dev
```

## Μεταβλητές περιβάλλοντος

Μπαίνουν στο Vercel (Settings → Environment Variables), ποτέ στον κώδικα.

| Μεταβλητή | Τι είναι |
|---|---|
| `NOTION_TOKEN` | Integration token, μόνο ανάγνωση |
| `NOTION_PROPERTIES_DB` | ID της βάσης KYDORA Properties |
| `SITE_URL` | Η διεύθυνση του site |
| `SITE_PUBLIC` | `true` μόνο μετά το launch |

## Εκκρεμότητες

- [ ] Φωτογραφίες ακινήτων — κάθε `.plate` στον κώδικα είναι θέση φωτογραφίας
- [ ] Σελίδα Property Detail
- [ ] Σελίδες Seller / Buyer / Developers
- [ ] Φόρμες με σύνδεση στο CRM (πηγή + Property ID)
- [ ] Cookie consent και νομικές σελίδες
