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
| `app/api/lead/` | Εγγραφή leads στη βάση KYDORA Επαφές & Leads. Ξεχωριστό κλειδί, μόνο insert. |
| `lib/notify.js` | Email ειδοποίησης για κάθε νέο lead. Δεν μπλοκάρει ποτέ την καταχώριση. |
| `components/` | Κάρτα ακινήτου και φόρμα επικοινωνίας. |
| `content/guides.js` | Οι οδηγοί GR/EN. Δημοσιεύονται μόνο μετά από έγκριση στο Notion. |

### Οδηγοί σε προσχέδιο

Οδηγός με `draft: true` φαίνεται **μόνο όσο το site είναι κλειστό**. Μόλις μπει
`SITE_PUBLIC=true`, εξαφανίζεται μόνος του από τη λίστα, από τη σελίδα του και
από το sitemap — ώστε κείμενο που δεν έχει περάσει νομικό έλεγχο να μην μπορεί
να βγει δημόσια κατά λάθος. Μετά την έγκριση: `draft: false`, τίποτα άλλο.

| Οδηγός | Κατάσταση |
|---|---|
| `elenchos-prin-ti-dimosiefsi` | Εγκεκριμένος, ζωντανός |
| `allodapos-agorastis` | **Προσχέδιο — εκκρεμεί νομικός έλεγχος** (νόμος, φόροι, προθεσμίες) |
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
| `NOTION_TOKEN` | Ανάγνωση ακινήτων. Μόνο Read content. |
| `NOTION_PROPERTIES_DB` | ID της βάσης KYDORA Properties |
| `NOTION_LEADS_TOKEN` | Εγγραφή leads. **Ξεχωριστό κλειδί, μόνο Insert content.** |
| `NOTION_LEADS_DB` | ID της βάσης KYDORA Επαφές & Leads |
| `RESEND_API_KEY` | Αποστολή email ειδοποίησης. Χωρίς αυτό, η φόρμα δουλεύει σιωπηλά. |
| `LEAD_NOTIFY_TO` | Πού πάει η ειδοποίηση. Πολλές διευθύνσεις με κόμμα. |
| `LEAD_NOTIFY_FROM` | Αποστολέας. Προαιρετικό μέχρι να επαληθευτεί το kydora.gr. |
| `SITE_URL` | Η διεύθυνση του site |
| `SITE_PUBLIC` | `true` μόνο μετά το launch |

## Εκκρεμότητες

- [ ] Φωτογραφίες ακινήτων — κάθε `.plate` στον κώδικα είναι θέση φωτογραφίας
- [ ] Σελίδες Seller / Buyer / Developers
- [ ] Ειδικές φόρμες Seller / Buyer / Investor / Developer (Contact V1 §5) — τώρα όλα περνούν από τη γενική
- [ ] Φίλτρα και ταξινόμηση στη σελίδα ακινήτων (Listing & Search V1 §2–3)
- [ ] Υπολογιστές δόσης και εξόδων αγοράς (Property Detail V1 §8)
- [ ] Gallery, κάτοψη, παρόμοια ακίνητα (Property Detail V1 §6, §10)
- [ ] Cookie consent και νομικές σελίδες
- [ ] **Νομικός έλεγχος του οδηγού `allodapos-agorastis`** — μετά: `draft: false`
- [ ] Επανέλεγχος φορολογικών νούμερων του οδηγού κάθε Ιανουάριο
- [ ] **Διαγραφή του `/api/notion-check` πριν το launch** — διαγνωστικό, όχι production
