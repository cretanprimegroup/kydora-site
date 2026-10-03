// Νομικά κείμενα ιστοσελίδας KYDORA, GR/EN.
//
// ΠΗΓΕΣ
// 1. KYDORA Privacy Notice & Marketing Consent V1 (Notion) — locked 14/09/2026.
//    Από εκεί έρχονται: υπεύθυνος επεξεργασίας, νόμιμες βάσεις ανά σκοπό,
//    χρόνοι διατήρησης, δικαιώματα, κανόνας data minimization.
// 2. Το αγγλικό κείμενο που είναι ΗΔΗ ΔΗΜΟΣΙΟ στο kydora.gr/en/privacy-policy
//    (effective 18/09/2026). Κρατάμε τη δομή και την ουσία του — δεν αλλάζει
//    σιωπηλά κείμενο που έχουν ήδη διαβάσει επισκέπτες.
// 3. KYDORA Website Legal + SEO Finishing Pack V1 (Notion) — ποιες σελίδες
//    απαιτούνται και ποια disclaimers πάνε πού.
//
// ΤΙ ΑΛΛΑΖΕΙ ΣΕ ΣΧΕΣΗ ΜΕ ΤΟ ΔΗΜΟΣΙΟ ΚΕΙΜΕΝΟ
// - Προστίθεται ελληνική εκδοχή. Ελληνική επιχείρηση που απευθύνεται σε Έλληνες
//   ιδιοκτήτες δεν μπορεί να έχει ενημέρωση GDPR μόνο στα αγγλικά.
// - Κατονομάζονται οι πραγματικοί αποδέκτες/εκτελούντες: Vercel (hosting),
//   Notion (καταχώριση αιτημάτων), Resend (email ειδοποίησης), Google (analytics).
// - Το «analytics δεν έχει υλοποιηθεί» γίνεται «analytics μόνο με συγκατάθεση»,
//   γιατί πλέον υπάρχει.
//
// ΚΑΝΟΝΑΣ: καμία συνάρτηση μέσα στα δεδομένα (serialization boundary).
// ΚΑΝΟΝΑΣ: κανένα νούμερο, προθεσμία ή στοιχείο που δεν έχει επιβεβαιωθεί.
//
// ⚖️ ΕΚΚΡΕΜΕΙ ΝΟΜΙΚΟΣ ΕΛΕΓΧΟΣ ΣΕ ΟΛΑ. Δες README.

// Στοιχεία εταιρείας — από το Privacy Notice V1. Μία πηγή, για να μη
// διαφωνήσουν ποτέ μεταξύ τους οι τέσσερις σελίδες.
export const entity = {
  legalName: 'Cretan Prime Group L.P.',
  brand: 'KYDORA — Real Estate & Investments',
  afm: '803168861',
  gemi: '191201158000',
  // Αριθμός μητρώου μεσίτη — εκδόθηκε, επιβεβαιώθηκε 03/10/2026.
  // ⚠️ Η ΑΚΡΙΒΗΣ ΕΠΙΣΗΜΗ ΔΙΑΤΥΠΩΣΗ εκκρεμεί επιβεβαίωση από τη δικηγόρο:
  // ποιο μητρώο και ποιο Επιμελητήριο αναγράφονται μαζί με τον αριθμό.
  // Λάθος διατύπωση σε υποχρεωτική ένδειξη είναι σαν να μην υπάρχει.
  broker: '159',
  seatEl: 'Πλατανιάς, Χανιά, Κρήτη',
  seatEn: 'Platanias, Chania, Crete, Greece',
  phone: '+30 28218 21705',
  phoneHref: '+302821821705',
  mobile: '+30 697 488 2014',
  mobileHref: '+306974882014',
  email: 'info@kydora.gr',
};

// Ημερομηνία ισχύος. Το δημόσιο αγγλικό κείμενο έχει 18/09/2026· η έκδοση με
// την ελληνική μετάφραση και τους κατονομασμένους παρόχους είναι νέα.
export const effective = '2026-10-02';
export const consentVersion = 'kydora-consent-v1';

export const legalDocs = [
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'privacy-policy',
    el: {
      title: 'Πολιτική Απορρήτου',
      description:
        'Ποια προσωπικά δεδομένα επεξεργάζεται η KYDORA μέσω του kydora.gr, με ποια νόμιμη βάση, σε ποιους κοινοποιούνται, για πόσο διατηρούνται και ποια δικαιώματα έχετε.',
      intro: [
        'Η παρούσα πολιτική αφορά την επεξεργασία προσωπικών δεδομένων μέσω του ιστότοπου kydora.gr. Αφορά όσα συμβαίνουν εδώ: τις φόρμες επικοινωνίας, τα τεχνικά δεδομένα της επίσκεψης και τα cookies.',
        'Δεν είναι γενική συγκατάθεση για όλα. Κάθε σκοπός επεξεργασίας έχει τη δική του νόμιμη βάση, και αυτές αναγράφονται παρακάτω χωριστά.',
      ],
      sections: [
        {
          h: '1. Υπεύθυνος επεξεργασίας',
          p: [
            'Cretan Prime Group L.P., με εμπορική ταυτότητα KYDORA — Real Estate & Investments. ΑΦΜ 803168861, Αρ. Γ.Ε.ΜΗ. 191201158000, έδρα Πλατανιάς, Χανιά, Κρήτη.',
            'Για κάθε ζήτημα προσωπικών δεδομένων: info@kydora.gr ή +30 28218 21705.',
          ],
        },
        {
          h: '2. Ποια δεδομένα συλλέγουμε από τον ιστότοπο',
          defs: [
            ['Όσα συμπληρώνετε σε φόρμα.', 'Ονοματεπώνυμο, email και/ή τηλέφωνο, και το μήνυμά σας. Προαιρετικά: εταιρεία, θέμα αιτήματος, κωδικός ακινήτου που σας ενδιαφέρει, προτιμώμενη ημέρα επικοινωνίας.'],
            ['Τεχνικά δεδομένα της επίσκεψης.', 'Διεύθυνση IP, τύπος συσκευής και προγράμματος περιήγησης, σελίδα από την οποία ήρθατε. Αυτά υπάρχουν αναγκαστικά σε κάθε αίτημα προς οποιονδήποτε ιστότοπο.'],
            ['Δεδομένα στατιστικής ανάλυσης.', 'Μόνο εφόσον δώσετε τη σχετική συγκατάθεση. Δείτε την Πολιτική Cookies.'],
          ],
          after: [
            'Δεν ζητάμε και δεν θέλουμε μέσω του ιστότοπου αντίγραφα ταυτότητας, ΑΦΜ, τραπεζικά παραστατικά ή άλλα ευαίσθητα έγγραφα. Αν χρειαστούν σε μεταγενέστερο στάδιο, περνούν από χωριστή, ασφαλή διαδικασία. Παρακαλούμε μην τα επισυνάπτετε σε φόρμα ή email.',
          ],
        },
        {
          h: '3. Σκοποί και νόμιμες βάσεις',
          defs: [
            ['Απάντηση στο αίτημά σας και επικοινωνία μαζί σας.', 'Προσυμβατικά μέτρα κατόπιν αιτήματός σας.'],
            ['Παροχή μεσιτικών και συναφών υπηρεσιών, εφόσον προχωρήσουμε.', 'Εκτέλεση σύμβασης.'],
            ['Τήρηση υποχρεωτικών φορολογικών και κανονιστικών στοιχείων.', 'Νομική υποχρέωση.'],
            ['Ασφάλεια του ιστότοπου, αποτροπή καταχρηστικών υποβολών, τεκμηρίωση σε περίπτωση διαφοράς.', 'Έννομο συμφέρον, στο μέτρο που είναι αναλογικό.'],
            ['Στατιστική ανάλυση επισκεψιμότητας.', 'Συγκατάθεση, την οποία μπορείτε να ανακαλέσετε οποτεδήποτε.'],
            ['Ενημερώσεις για ακίνητα και υπηρεσίες, εφόσον τις ζητήσετε.', 'Συγκατάθεση, χωριστή και προαιρετική. Δεν αποτελεί προϋπόθεση για να σας απαντήσουμε.'],
          ],
        },
        {
          h: '4. Σε ποιους κοινοποιούνται',
          p: [
            'Μόνο όπου είναι απαραίτητο, και μόνο στα αναγκαία δεδομένα:',
          ],
          defs: [
            ['Εξουσιοδοτημένο προσωπικό της KYDORA.', 'Όσοι χειρίζονται την υπόθεσή σας.'],
            ['Πάροχοι υποδομής που ενεργούν για λογαριασμό μας.', 'Vercel Inc. (φιλοξενία ιστότοπου), Notion Labs Inc. (καταχώριση και διαχείριση αιτημάτων), Resend (αποστολή της εσωτερικής ειδοποίησης για νέο αίτημα). Ενεργούν βάσει σύμβασης επεξεργασίας και μόνο κατ’ εντολή μας.'],
            ['Google.', 'Μόνο για στατιστική ανάλυση και μόνο εφόσον έχετε συναινέσει.'],
            ['Επαγγελματίες που εμπλέκονται στην υπόθεση.', 'Δικηγόροι, συμβολαιογράφοι, μηχανικοί, λογιστές — όταν και όπου χρειάζεται για τη συγκεκριμένη υπόθεση.'],
            ['Δημόσιες αρχές.', 'Όταν υπάρχει νόμιμη υποχρέωση.'],
          ],
          after: [
            'Δεν πωλούμε προσωπικά δεδομένα. Δεν τα διαβιβάζουμε σε portals ή συνεργάτες όταν δεν είναι αναγκαίο για τον συγκεκριμένο σκοπό: κατά κανόνα χρησιμοποιούμε κωδικό ακινήτου και όχι στοιχεία προσώπων.',
          ],
        },
        {
          h: '5. Διαβιβάσεις εκτός ΕΟΧ',
          p: [
            'Ορισμένοι από τους παραπάνω παρόχους είναι εγκατεστημένοι στις ΗΠΑ ή επεξεργάζονται δεδομένα εκτός ΕΟΧ. Σε αυτές τις περιπτώσεις εφαρμόζεται ο κατάλληλος νόμιμος μηχανισμός διαβίβασης — απόφαση επάρκειας ή Τυποποιημένες Συμβατικές Ρήτρες — με τις απαιτούμενες εγγυήσεις.',
            'Αν θέλετε λεπτομέρειες για συγκεκριμένο πάροχο, ζητήστε τις στο info@kydora.gr.',
          ],
        },
        {
          h: '6. Χρόνος διατήρησης',
          defs: [
            ['Αίτημα που δεν εξελίχθηκε σε συνεργασία.', 'Έως 24 μήνες από την τελευταία ουσιαστική επικοινωνία.'],
            ['Πραγματική σχέση μεσιτείας χωρίς ολοκληρωμένη συναλλαγή.', '5 χρόνια από τη λήξη της υπόθεσης.'],
            ['Ολοκληρωμένες συναλλαγές και υποχρεωτικά συναλλακτικά έγγραφα.', '5 χρόνια από την ολοκλήρωση, ή όσο επιβάλλει ειδική φορολογική ή κανονιστική υποχρέωση.'],
            ['Συγκατάθεση για ενημερώσεις.', 'Έως την ανάκλησή της.'],
          ],
          after: ['Μεγαλύτερη διατήρηση μόνο όταν υπάρχει ενεργή νομική αξίωση ή διαφορά.'],
        },
        {
          h: '7. Τα δικαιώματά σας',
          p: [
            'Έχετε δικαίωμα ενημέρωσης, πρόσβασης, διόρθωσης, διαγραφής, περιορισμού της επεξεργασίας, φορητότητας και εναντίωσης. Όπου η επεξεργασία βασίζεται σε συγκατάθεση, μπορείτε να την ανακαλέσετε οποτεδήποτε, χωρίς να επηρεάζεται η νομιμότητα της προηγούμενης επεξεργασίας.',
            'Ασκήστε τα στο info@kydora.gr ή στο +30 28218 21705. Απαντάμε στις προθεσμίες που ορίζει ο Κανονισμός. Πριν σας δώσουμε δεδομένα ή εκτελέσουμε ευαίσθητο αίτημα μπορεί να χρειαστεί εύλογη επαλήθευση της ταυτότητάς σας — για τη δική σας προστασία.',
          ],
        },
        {
          h: '8. Καταγγελία',
          p: [
            'Αν θεωρείτε ότι η επεξεργασία των δεδομένων σας παραβιάζει τη νομοθεσία, έχετε δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα: Κηφισίας 1–3, Αθήνα, τηλ. +30 210 6475600, contact@dpa.gr, www.dpa.gr.',
            'Θα χαρούμε να το συζητήσουμε πρώτα μαζί σας, αλλά το δικαίωμα είναι δικό σας και δεν προϋποθέτει τίποτα.',
          ],
        },
        {
          h: '9. Ασφάλεια',
          p: [
            'Εφαρμόζουμε τεχνικά και οργανωτικά μέτρα, περιορισμό πρόσβασης στα απολύτως αναγκαία και αρχές privacy by design. Ο ιστότοπος λειτουργεί αποκλειστικά μέσω HTTPS. Τα αιτήματα από τις φόρμες καταχωρίζονται σε σύστημα με περιορισμένη πρόσβαση.',
            'Καμία μετάδοση δεδομένων στο διαδίκτυο δεν είναι απολύτως ασφαλής και δεν ισχυριζόμαστε το αντίθετο.',
          ],
        },
        {
          h: '10. Αυτοματοποιημένες αποφάσεις',
          p: [
            'Δεν λαμβάνεται απόφαση που σας αφορά αποκλειστικά με αυτοματοποιημένο τρόπο. Χρησιμοποιούμε εργαλεία για ταξινόμηση, προετοιμασία κειμένων και οργάνωση εργασίας, αλλά κάθε ουσιαστική κρίση περνάει από άνθρωπο.',
          ],
        },
        {
          h: '11. Αλλαγές',
          p: [
            'Αν αλλάξουν οι υπηρεσίες ή οι νομικές απαιτήσεις, η πολιτική επικαιροποιείται και αναγράφεται νέα ημερομηνία ισχύος. Σε ουσιώδεις αλλαγές ενημερώνουμε με πιο εμφανή τρόπο.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      description:
        'What personal data KYDORA processes through kydora.gr, on what lawful basis, who receives it, how long it is kept, and what rights you have.',
      intro: [
        'This policy covers the processing of personal data through the kydora.gr website: the contact forms, the technical data of your visit, and cookies.',
        'It is not a blanket consent. Each purpose has its own lawful basis, and those are set out separately below.',
      ],
      sections: [
        {
          h: '1. Data controller',
          p: [
            'Cretan Prime Group L.P., trading as KYDORA — Real Estate & Investments. VAT (ΑΦΜ) 803168861, Companies Registry (Γ.Ε.ΜΗ.) 191201158000, registered in Platanias, Chania, Crete, Greece.',
            'For any data protection matter: info@kydora.gr or +30 28218 21705.',
          ],
        },
        {
          h: '2. What we collect from the website',
          defs: [
            ['What you type into a form.', 'Your name, email and/or phone, and your message. Optionally: company, the nature of your enquiry, the reference of a property you are interested in, and a preferred day to be contacted.'],
            ['Technical data of the visit.', 'IP address, device and browser type, referring page. These necessarily exist in every request to any website.'],
            ['Analytics data.', 'Only if you give the relevant consent. See the Cookie Policy.'],
          ],
          after: [
            'We do not ask for, and do not want, copies of ID documents, tax numbers, bank statements or other sensitive documents through this website. If any are needed at a later stage, they go through a separate secure process. Please do not attach them to a form or an email.',
          ],
        },
        {
          h: '3. Purposes and lawful bases',
          defs: [
            ['Answering your enquiry and contacting you.', 'Pre-contractual steps taken at your request.'],
            ['Providing brokerage and related services, if we proceed.', 'Performance of a contract.'],
            ['Keeping mandatory tax and regulatory records.', 'Legal obligation.'],
            ['Website security, preventing abusive submissions, evidence in the event of a dispute.', 'Legitimate interests, to the extent proportionate.'],
            ['Website analytics.', 'Consent, which you may withdraw at any time.'],
            ['Updates about properties and services, if you ask for them.', 'Consent — separate and optional. It is never a condition of us replying to you.'],
          ],
        },
        {
          h: '4. Who receives it',
          p: ['Only where necessary, and only the data that is necessary:'],
          defs: [
            ['Authorised KYDORA personnel.', 'Those handling your matter.'],
            ['Infrastructure providers acting on our behalf.', 'Vercel Inc. (website hosting), Notion Labs Inc. (recording and managing enquiries), Resend (sending our internal new-enquiry notification). They act under a data processing agreement and only on our instructions.'],
            ['Google.', 'For analytics only, and only if you have consented.'],
            ['Professionals involved in the matter.', 'Lawyers, notaries, engineers, accountants — when and where required for that specific matter.'],
            ['Public authorities.', 'Where there is a legal obligation.'],
          ],
          after: [
            'We do not sell personal data. We do not pass it to portals or partners where it is not necessary for the specific purpose: as a rule we use a property reference rather than a person’s details.',
          ],
        },
        {
          h: '5. Transfers outside the EEA',
          p: [
            'Some of the providers above are established in the United States or process data outside the EEA. Where that happens, an appropriate transfer mechanism applies — an adequacy decision or Standard Contractual Clauses — with the required safeguards.',
            'If you would like the detail for a specific provider, ask at info@kydora.gr.',
          ],
        },
        {
          h: '6. Retention',
          defs: [
            ['An enquiry that did not become an engagement.', 'Up to 24 months from the last substantive contact.'],
            ['A genuine brokerage relationship without a completed transaction.', '5 years from the end of the matter.'],
            ['Completed transactions and mandatory transaction records.', '5 years from completion, or as long as a specific tax or regulatory obligation requires.'],
            ['Consent to receive updates.', 'Until you withdraw it.'],
          ],
          after: ['Longer retention only where there is a live legal claim or dispute.'],
        },
        {
          h: '7. Your rights',
          p: [
            'You have the right to be informed, and rights of access, rectification, erasure, restriction of processing, portability and objection. Where processing rests on consent, you may withdraw it at any time, without affecting the lawfulness of processing already carried out.',
            'Exercise them at info@kydora.gr or +30 28218 21705. We respond within the timescales the Regulation sets. Before releasing data or acting on a sensitive request we may need to verify your identity reasonably — for your own protection.',
          ],
        },
        {
          h: '8. Complaints',
          p: [
            'If you believe the processing of your data breaches the law, you have the right to complain to the Hellenic Data Protection Authority: 1–3 Kifisias Avenue, Athens, Greece, tel. +30 210 6475600, contact@dpa.gr, www.dpa.gr.',
            'We would welcome the chance to discuss it with you first, but the right is yours and is not conditional on that.',
          ],
        },
        {
          h: '9. Security',
          p: [
            'We apply technical and organisational measures, restrict access to what is strictly necessary, and work to privacy-by-design principles. The website is served exclusively over HTTPS. Form enquiries are recorded in a system with restricted access.',
            'No transmission of data over the internet is completely secure, and we do not claim otherwise.',
          ],
        },
        {
          h: '10. Automated decisions',
          p: [
            'No decision affecting you is taken by automated means alone. We use tools for classification, drafting and organising work, but every substantive judgement passes through a person.',
          ],
        },
        {
          h: '11. Changes',
          p: [
            'If our services or the legal requirements change, this policy is updated and carries a new effective date. For material changes we give more prominent notice.',
          ],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cookie-policy',
    el: {
      title: 'Πολιτική Cookies',
      description:
        'Ποια cookies χρησιμοποιεί το kydora.gr, ποια απαιτούν τη συγκατάθεσή σας και πώς αλλάζετε την επιλογή σας οποτεδήποτε.',
      intro: [
        'Σύντομη εκδοχή: ο ιστότοπος λειτουργεί πλήρως χωρίς κανένα cookie. Στατιστικά συλλέγουμε μόνο αν το επιτρέψετε, και μπορείτε να αλλάξετε γνώμη όποτε θέλετε.',
      ],
      sections: [
        {
          h: 'Τι είναι τα cookies',
          p: [
            'Μικρά αρχεία που αποθηκεύει ο ιστότοπος στη συσκευή σας για να θυμάται κάτι. Στην ίδια κατηγορία εντάσσονται και παρόμοιες τεχνολογίες τοπικής αποθήκευσης.',
          ],
        },
        {
          h: 'Απαραίτητα',
          p: [
            'Δεν απαιτούν συγκατάθεση, γιατί χωρίς αυτά ο ιστότοπος δεν μπορεί να λειτουργήσει όπως του ζητήσατε.',
            'Εμείς χρησιμοποιούμε ένα και μόνο: την εγγραφή της δικής σας επιλογής για τα cookies. Αν δεν τη θυμόμασταν, θα σας ρωτούσαμε ξανά σε κάθε σελίδα.',
          ],
        },
        {
          h: 'Στατιστικά',
          p: [
            'Google Analytics, για να βλέπουμε πόσοι επισκέπτονται τον ιστότοπο, από ποια πηγή έρχονται και ποιες σελίδες διαβάζονται. Το χρησιμοποιούμε για να αποφασίζουμε τι περιεχόμενο αξίζει να γράψουμε.',
            'Δεν φορτώνει τίποτα από την Google πριν δώσετε τη συγκατάθεσή σας. Αν την αρνηθείτε, δεν γίνεται κανένα αίτημα προς τους διακομιστές της Google και δεν τοποθετείται κανένα cookie.',
          ],
        },
        {
          h: 'Marketing',
          p: [
            'Δεν χρησιμοποιούμε cookies διαφημιστικής στόχευσης, pixels ή remarketing. Δεν εμφανίζουμε κατηγορία που δεν υπάρχει· αν προστεθεί κάποια τέτοια τεχνολογία, θα προστεθεί και χωριστή επιλογή εδώ και στο banner, πριν φορτώσει.',
          ],
        },
        {
          h: 'Τι άλλο δεν κάνουμε',
          p: [
            'Οι γραμματοσειρές του ιστότοπου σερβίρονται από το δικό μας domain, άρα η επίσκεψή σας δεν γνωστοποιείται σε πάροχο γραμματοσειρών. Δεν ενσωματώνουμε χάρτες, βίντεο ή widgets τρίτων που θα φόρτωναν δικά τους cookies.',
          ],
        },
        {
          h: 'Πώς αλλάζετε την επιλογή σας',
          p: [
            'Από τον σύνδεσμο «Ρυθμίσεις Cookies» στο υποσέλιδο, σε κάθε σελίδα. Η αλλαγή ισχύει αμέσως· αν ανακαλέσετε τη συγκατάθεση για στατιστικά, σταματάμε να φορτώνουμε το Analytics και διαγράφουμε τα σχετικά cookies.',
            'Μπορείτε επίσης να διαγράψετε ή να μπλοκάρετε cookies από τις ρυθμίσεις του προγράμματος περιήγησής σας.',
          ],
        },
      ],
    },
    en: {
      title: 'Cookie Policy',
      description:
        'Which cookies kydora.gr uses, which ones need your consent, and how to change your choice at any time.',
      intro: [
        'The short version: this website works perfectly well with no cookies at all. We only collect analytics if you allow it, and you can change your mind whenever you like.',
      ],
      sections: [
        {
          h: 'What cookies are',
          p: [
            'Small files a website stores on your device in order to remember something. Similar local-storage technologies fall into the same category.',
          ],
        },
        {
          h: 'Strictly necessary',
          p: [
            'These need no consent, because without them the site cannot do what you asked it to do.',
            'We use exactly one: the record of your own cookie choice. If we did not remember it, we would have to ask you again on every page.',
          ],
        },
        {
          h: 'Analytics',
          p: [
            'Google Analytics, so we can see how many people visit, where they come from and which pages get read. We use it to decide what content is worth writing.',
            'Nothing loads from Google before you consent. If you decline, no request is made to Google’s servers and no cookie is set.',
          ],
        },
        {
          h: 'Marketing',
          p: [
            'We use no advertising, tracking or remarketing cookies or pixels. We do not show a category that does not exist; if such a technology is ever added, a separate choice will appear here and in the banner before it loads.',
          ],
        },
        {
          h: 'What else we don’t do',
          p: [
            'The site’s fonts are served from our own domain, so your visit is not disclosed to a font provider. We embed no third-party maps, videos or widgets that would load cookies of their own.',
          ],
        },
        {
          h: 'How to change your choice',
          p: [
            'Through the “Cookie Settings” link in the footer, on every page. The change takes effect immediately; if you withdraw consent to analytics, we stop loading it and delete the related cookies.',
            'You can also delete or block cookies through your browser’s own settings.',
          ],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'terms-of-use',
    el: {
      title: 'Όροι Χρήσης',
      description:
        'Οι όροι υπό τους οποίους χρησιμοποιείτε το kydora.gr: τι είναι και τι δεν είναι το περιεχόμενό του, και τι ισχύει για τις πληροφορίες ακινήτων.',
      intro: [
        'Χρησιμοποιώντας αυτόν τον ιστότοπο αποδέχεστε τους παρακάτω όρους. Είναι σύντομοι και γραμμένοι για να διαβαστούν.',
      ],
      sections: [
        {
          h: 'Τι είναι αυτός ο ιστότοπος',
          p: [
            'Παρουσίαση των υπηρεσιών της KYDORA και των ακινήτων που διαθέτουμε προς πώληση, μαζί με ενημερωτικό υλικό για την αγορά της Κρήτης.',
            'Δεν αποτελεί δημόσια πρόταση προς σύναψη σύμβασης, ούτε δέσμευση για διαθεσιμότητα ή τιμή.',
          ],
        },
        {
          h: 'Πληροφορίες ακινήτων',
          p: [
            'Οι πληροφορίες βασίζονται στα στοιχεία που έχουμε στη διάθεσή μας κάθε στιγμή και μπορεί να μεταβληθούν. Νομικά, τεχνικά, πολεοδομικά και φορολογικά στοιχεία επιβεβαιώνονται από τους αρμόδιους επαγγελματίες πριν από οποιαδήποτε συναλλαγή.',
            'Όπου κάποιο στοιχείο δεν έχει επιβεβαιωθεί, το δηλώνουμε ως τέτοιο αντί να το παρουσιάσουμε ως δεδομένο. Αυτό είναι πολιτική μας, όχι νομική εγγύηση για κάθε λεπτομέρεια.',
          ],
        },
        {
          h: 'Εκτιμήσεις και επενδυτικά σενάρια',
          p: [
            'Καμία εκτίμηση απόδοσης, υπεραξίας ή μισθωτικού εισοδήματος δεν αποτελεί εγγύηση. Όπου παρουσιάζονται υπολογισμοί, αναγράφονται οι παραδοχές και η ημερομηνία τους.',
            'Τίποτα σε αυτόν τον ιστότοπο δεν συνιστά εξατομικευμένη νομική, φορολογική, τεχνική ή επενδυτική συμβουλή.',
          ],
        },
        {
          h: 'Οδηγοί και ενημερωτικό περιεχόμενο',
          p: [
            'Τα κείμενα έχουν ενημερωτικό χαρακτήρα και αναφέρουν την ημερομηνία ελέγχου των στοιχείων. Οι νόμοι, οι φορολογικοί συντελεστές και οι προθεσμίες μεταβάλλονται· για την περίπτωσή σας απευθυνθείτε στον δικό σας δικηγόρο, μηχανικό ή φοροτεχνικό.',
          ],
        },
        {
          h: 'Πνευματική ιδιοκτησία',
          p: [
            'Τα κείμενα, οι φωτογραφίες, το λογότυπο και ο σχεδιασμός ανήκουν στην Cretan Prime Group L.P. ή στους δικαιοδόχους της. Επιτρέπεται η παραπομπή με σύνδεσμο και η εύλογη παράθεση με αναφορά στην πηγή· δεν επιτρέπεται η αναδημοσίευση ή εμπορική χρήση χωρίς έγγραφη άδεια.',
          ],
        },
        {
          h: 'Αποδεκτή χρήση',
          p: [
            'Μην υποβάλλετε ψευδή στοιχεία, στοιχεία τρίτου χωρίς δικαίωμα, ή μαζικές αυτοματοποιημένες υποβολές. Διατηρούμε το δικαίωμα να μην απαντήσουμε σε καταχρηστικά αιτήματα.',
          ],
        },
        {
          h: 'Διαθεσιμότητα και σύνδεσμοι',
          p: [
            'Καταβάλλουμε εύλογη προσπάθεια να είναι ο ιστότοπος διαθέσιμος και ακριβής, χωρίς να εγγυόμαστε αδιάλειπτη λειτουργία. Για ιστότοπους τρίτων στους οποίους παραπέμπουμε δεν φέρουμε ευθύνη ως προς το περιεχόμενό τους.',
          ],
        },
        {
          h: 'Εφαρμοστέο δίκαιο',
          p: [
            'Εφαρμόζεται το ελληνικό δίκαιο. Αρμόδια είναι τα δικαστήρια Χανίων, χωρίς να περιορίζονται τα δικαιώματα που σας αναγνωρίζει η νομοθεσία προστασίας καταναλωτή ως κατοίκου άλλου κράτους μέλους.',
          ],
        },
      ],
    },
    en: {
      title: 'Terms of Use',
      description:
        'The terms on which you use kydora.gr: what the content is and is not, and what applies to property information.',
      intro: [
        'By using this website you accept the terms below. They are short, and written to be read.',
      ],
      sections: [
        {
          h: 'What this website is',
          p: [
            'A presentation of KYDORA’s services and of the properties we offer for sale, together with informational material about the Cretan market.',
            'It is not a public offer capable of acceptance, nor a commitment as to availability or price.',
          ],
        },
        {
          h: 'Property information',
          p: [
            'Information is based on the material available to us at any given time and may change. Legal, technical, planning and tax matters are confirmed by the appropriate professionals before any transaction.',
            'Where something has not been verified, we say so rather than presenting it as fact. That is our policy, not a legal warranty as to every detail.',
          ],
        },
        {
          h: 'Estimates and investment scenarios',
          p: [
            'No estimate of return, capital growth or rental income is a guarantee. Where calculations are shown, their assumptions and date are stated.',
            'Nothing on this website constitutes personalised legal, tax, technical or investment advice.',
          ],
        },
        {
          h: 'Guides and informational content',
          p: [
            'These texts are informational and state the date their facts were checked. Laws, tax rates and deadlines change; for your own situation consult your own lawyer, engineer or tax adviser.',
          ],
        },
        {
          h: 'Intellectual property',
          p: [
            'The text, photography, logo and design belong to Cretan Prime Group L.P. or its licensors. Linking and fair quotation with attribution are welcome; republication or commercial use requires written permission.',
          ],
        },
        {
          h: 'Acceptable use',
          p: [
            'Do not submit false information, another person’s details without the right to do so, or bulk automated submissions. We reserve the right not to respond to abusive enquiries.',
          ],
        },
        {
          h: 'Availability and links',
          p: [
            'We make reasonable efforts to keep the site available and accurate, without warranting uninterrupted operation. We are not responsible for the content of third-party websites we link to.',
          ],
        },
        {
          h: 'Governing law',
          p: [
            'Greek law applies. The courts of Chania have jurisdiction, without limiting the consumer protection rights the law gives you as a resident of another member state.',
          ],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'legal-notice',
    el: {
      title: 'Νομική Γνωστοποίηση',
      description:
        'Τα επίσημα στοιχεία της εταιρείας που λειτουργεί το kydora.gr: επωνυμία, ΑΦΜ, Γ.Ε.ΜΗ., έδρα και στοιχεία επικοινωνίας.',
      intro: [
        'Τα στοιχεία του φορέα που λειτουργεί αυτόν τον ιστότοπο.',
      ],
      sections: [
        {
          h: 'Φορέας',
          defs: [
            ['Επωνυμία.', 'Cretan Prime Group L.P.'],
            ['Εμπορικό σήμα.', 'KYDORA — Real Estate & Investments'],
            ['ΑΦΜ.', '803168861'],
            ['Αρ. Γ.Ε.ΜΗ.', '191201158000'],
            ['Αριθμός μητρώου μεσίτη ακινήτων.', '159'],
            ['Έδρα.', 'Πλατανιάς, Χανιά, Κρήτη'],
          ],
        },
        {
          h: 'Επικοινωνία',
          defs: [
            ['Τηλέφωνο.', '+30 28218 21705'],
            ['Κινητό.', '+30 697 488 2014'],
            ['Email.', 'info@kydora.gr'],
          ],
        },
        {
          h: 'Δραστηριότητα',
          p: [
            'Μεσιτεία και συμβουλευτική ακινήτων στην Περιφερειακή Ενότητα Χανίων και στην Κρήτη.',
          ],
        },
        {
          h: 'Σχετικές σελίδες',
          p: [
            'Για την επεξεργασία προσωπικών δεδομένων δείτε την Πολιτική Απορρήτου. Για τα cookies δείτε την Πολιτική Cookies. Για τους όρους χρήσης του ιστότοπου δείτε τους Όρους Χρήσης.',
          ],
        },
      ],
    },
    en: {
      title: 'Legal Notice',
      description:
        'The official details of the company operating kydora.gr: name, VAT and registry numbers, registered office and contact details.',
      intro: ['The details of the entity operating this website.'],
      sections: [
        {
          h: 'Entity',
          defs: [
            ['Legal name.', 'Cretan Prime Group L.P.'],
            ['Trading as.', 'KYDORA — Real Estate & Investments'],
            ['VAT number (ΑΦΜ).', '803168861'],
            ['Companies Registry (Γ.Ε.ΜΗ.).', '191201158000'],
            ['Real estate agent registration number.', '159'],
            ['Registered office.', 'Platanias, Chania, Crete, Greece'],
          ],
        },
        {
          h: 'Contact',
          defs: [
            ['Telephone.', '+30 28218 21705'],
            ['Mobile.', '+30 697 488 2014'],
            ['Email.', 'info@kydora.gr'],
          ],
        },
        {
          h: 'Activity',
          p: ['Real estate brokerage and advisory in the Regional Unit of Chania and across Crete.'],
        },
        {
          h: 'Related pages',
          p: [
            'For the processing of personal data see the Privacy Policy. For cookies see the Cookie Policy. For the terms on which you use this website see the Terms of Use.',
          ],
        },
      ],
    },
  },
];

export const legalSlugs = legalDocs.map((d) => d.slug);

export function getLegalDoc(slug) {
  return legalDocs.find((d) => d.slug === slug) || null;
}
