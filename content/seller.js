// Σελίδα Πώληση / Sell with KYDORA.
//
// ΠΗΓΗ: "KYDORA Website Production Copy V1 — Seller Landing Page GR/EN" (Notion),
// production copy draft 13/09/2026, μαζί με την ενημέρωση 19/09/2026 για τη
// δημόσια διατύπωση της υπηρεσίας αξιολόγησης.
//
// ΔΥΟ ΚΑΝΟΝΕΣ ΑΠΟ ΤΗΝ ΠΗΓΗ, ΔΕΝ ΠΑΡΑΒΙΑΖΟΝΤΑΙ:
// 1. Δεν χρησιμοποιείται δημόσια ο όρος «πιστοποιημένη εκτίμηση» για την
//    εμπορική αξιολόγηση. Όπου απαιτείται επίσημη εκτίμηση, γίνεται μέσω
//    πιστοποιημένου συνεργάτη.
// 2. Καμία υπόσχεση για τιμή πώλησης, χρόνο πώλησης ή εγγυημένο αποτέλεσμα.
//
// Η φόρμα πρώτης επαφής ΔΕΝ ζητά πλήρη φάκελο ακινήτου ούτε έγγραφα
// ιδιοκτησίας — ρητή απόφαση της πηγής, και ταιριάζει με το Privacy Notice.
//
// ΚΑΝΟΝΑΣ: καμία συνάρτηση μέσα στα δεδομένα.

export const seller = {
  el: {
    slug: 'polisi',
    meta: {
      title: 'Πώληση ακινήτου στα Χανιά',
      description:
        'Η σωστή πώληση ξεκινά πριν από τη δημοσίευση. Αξιολόγηση, εμπορική τοποθέτηση, προετοιμασία και προσωπική εκπροσώπηση — με δωρεάν αρχική εμπορική αξιολόγηση.',
    },
    hero: {
      eyebrow: 'Πώληση με την KYDORA',
      heading: 'Το ακίνητό σας αξίζει περισσότερα από μία αγγελία.',
      body: 'Η σωστή πώληση ξεκινά πριν από τη δημοσίευση. Με σωστή αξιολόγηση, εμπορική τοποθέτηση, παρουσίαση, στοχευμένη προβολή και προσωπική εκπροσώπηση, οργανώνουμε κάθε στάδιο με έναν στόχο: μια καλύτερα προετοιμασμένη και πιο καθαρή διαδικασία πώλησης.',
      cta: 'Συζητήστε το ακίνητό σας μαζί μας',
      quote: 'We don’t just list. We represent.',
    },
    // Ενημέρωση 19/09/2026. Μπαίνει ψηλά γιατί είναι ο λόγος που ένας
    // ιδιοκτήτης σηκώνει το τηλέφωνο: δεν δεσμεύεται σε τίποτα.
    offer: {
      heading: 'Δωρεάν αρχική εμπορική αξιολόγηση',
      body: 'Εξετάζουμε τα βασικά χαρακτηριστικά του ακινήτου, τα διαθέσιμα στοιχεία της αγοράς και τη στρατηγική πώλησης, ώστε να αποκτήσετε μια πρώτη τεκμηριωμένη εικόνα πριν αποφασίσετε πώς θα κινηθείτε.',
      note: 'Για ιδιοκτήτες που θέλουν πλήρη γραπτή ανάλυση χωρίς ενεργή αποκλειστική ανάθεση, διατίθεται ξεχωριστά η Αναφορά Εμπορικής Αξιολόγησης & Στρατηγικής Πώλησης. Σε Αποκλειστική Ανάθεση KYDORA, η πλήρης αναφορά περιλαμβάνεται χωρίς πρόσθετη χρέωση.',
      disclaimer:
        'Η εμπορική αξιολόγηση της KYDORA δεν αποτελεί πιστοποιημένη εκτίμηση. Όπου απαιτείται επίσημη πιστοποιημένη εκτίμηση, η υπηρεσία παρέχεται μέσω κατάλληλου πιστοποιημένου συνεργάτη.',
    },
    difference: {
      heading: 'Η αγγελία είναι μόνο ένα μέρος της πώλησης.',
      body: 'Ένα ακίνητο δεν χρειάζεται απλώς να εμφανιστεί στην αγορά. Χρειάζεται να τοποθετηθεί σωστά μέσα σε αυτή. Πριν δημοσιεύσουμε, εξετάζουμε τα δεδομένα, την κατάσταση του ακινήτου, το κοινό στο οποίο απευθύνεται, τον τρόπο παρουσίασης και τη στρατηγική διάθεσης.',
    },
    process: {
      heading: 'Από την πρώτη αξιολόγηση έως την ολοκλήρωση.',
      steps: [
        ['Αξιολόγηση', 'Κατανοούμε το ακίνητο, τα βασικά δεδομένα και τον στόχο του ιδιοκτήτη.'],
        ['Τιμολόγηση', 'Διαμορφώνουμε τεκμηριωμένη εμπορική τοποθέτηση με βάση τα διαθέσιμα στοιχεία και τις συνθήκες της αγοράς.'],
        ['Προετοιμασία', 'Εντοπίζουμε τι χρειάζεται πριν το ακίνητο παρουσιαστεί δημόσια.'],
        ['Αφήγηση & παρουσίαση', 'Δημιουργούμε καθαρή αφήγηση και κατάλληλο οπτικό υλικό για το πραγματικό κοινό του ακινήτου.'],
        ['Προβολή', 'Επιλέγουμε τα κατάλληλα κανάλια αντί για αδιάκριτη δημοσίευση παντού.'],
        ['Διαχείριση ενδιαφέροντος', 'Οργανώνουμε και αξιολογούμε τα εισερχόμενα αιτήματα πριν από τα επόμενα βήματα.'],
        ['Επισκέψεις', 'Συντονίζουμε τις επισκέψεις και καταγράφουμε ουσιαστική ανατροφοδότηση.'],
        ['Διαπραγμάτευση', 'Υποστηρίζουμε τη διαδικασία με σαφή επικοινωνία και οργανωμένη πληροφόρηση.'],
        ['Συναλλαγή', 'Συντονίζουμε τα επόμενα βήματα με τους κατάλληλους επαγγελματίες έως την ολοκλήρωση.'],
        ['Ενημέρωση', 'Ο ιδιοκτήτης έχει καθαρή εικόνα για δραστηριότητα, ενδιαφέρον και πρόοδο.'],
      ],
    },
    mandates: {
      heading: 'Η εκπροσώπηση προσαρμόζεται στο ακίνητο και στον στόχο.',
      options: [
        ['Open Listing', 'Για περιπτώσεις όπου ο ιδιοκτήτης επιλέγει μη αποκλειστική συνεργασία, με σαφείς όρους και οργανωμένη διαχείριση των ενεργειών της KYDORA.'],
        ['KYDORA Exclusive', 'Ενιαία στρατηγική εκπροσώπησης με ολοκληρωμένη προετοιμασία, εμπορική τοποθέτηση, marketing, διαχείριση ενδιαφέροντος και συστηματική ενημέρωση.'],
        ['Signature Representation', 'Ενισχυμένη προσέγγιση για επιλεγμένα premium, ιδιαίτερα ή επενδυτικού ενδιαφέροντος ακίνητα, όπου απαιτείται πιο εξειδικευμένη παρουσίαση και στοχευμένη διάθεση.'],
      ],
      note: 'Η τελική μορφή συνεργασίας και οι όροι συμφωνούνται πριν από οποιαδήποτε ενέργεια προώθησης.',
    },
    marketing: {
      heading: 'Δεν προωθούμε όλα τα ακίνητα με τον ίδιο τρόπο.',
      body: 'Η εικόνα, το μήνυμα και τα κανάλια πρέπει να υπηρετούν το ίδιο το ακίνητο. Ανάλογα με την περίπτωση, η στρατηγική μπορεί να περιλαμβάνει επαγγελματική φωτογράφιση και video, δίγλωσση παρουσίαση, επιλεγμένες πλατφόρμες ακινήτων, τα ψηφιακά κανάλια της KYDORA, στοχευμένες καμπάνιες και άμεση προσέγγιση κατάλληλων αγοραστών ή συνεργατών.',
    },
    demand: {
      heading: 'Η σωστή προβολή χρειάζεται και το σωστό κοινό.',
      body: 'Δεν μετράμε την επιτυχία μόνο σε προβολές ή clicks. Μας ενδιαφέρει ποιος ενδιαφέρεται, γιατί ενδιαφέρεται και αν υπάρχει πραγματική δυνατότητα να προχωρήσει. Η KYDORA οργανώνει τα αιτήματα ενδιαφέροντος, τις επισκέψεις και την ανατροφοδότηση ώστε η στρατηγική να βελτιώνεται με πραγματικά δεδομένα.',
    },
    expect: {
      heading: 'Καθαρή επικοινωνία. Συγκεκριμένα επόμενα βήματα.',
      items: [
        'Μία αρχική συζήτηση για το ακίνητο και τον στόχο σας.',
        'Συλλογή των βασικών πληροφοριών που χρειάζονται για την πρώτη αξιολόγηση.',
        'Πρόταση προσέγγισης και τρόπου εκπροσώπησης.',
        'Συμφωνία πριν από οποιαδήποτε δημόσια προώθηση.',
        'Συστηματική παρακολούθηση ενδιαφέροντος και επόμενων ενεργειών.',
      ],
    },
    // Εσωτερικός σύνδεσμος προς τον οδηγό. Ο ιδιοκτήτης που θέλει απόδειξη
    // ότι ο έλεγχος είναι πραγματικός, τον διαβάζει.
    proof: {
      heading: 'Τι σημαίνει «προετοιμασία» στην πράξη',
      body: 'Έχουμε δημοσιεύσει τη διαδικασία ελέγχου που περνάει κάθε ακίνητο πριν βγει προς πώληση: ποια έγγραφα ζητάμε, ποιοι έλεγχοι γίνονται, και τι κάνουμε με όσα δεν επιβεβαιώνονται.',
      cta: 'Διαβάστε τον οδηγό',
      href: '/odigoi/elenchos-prin-ti-dimosiefsi',
    },
    faq: {
      heading: 'Συχνές ερωτήσεις πριν από την πώληση',
      items: [
        [
          'Πρέπει να έχω αποφασίσει ήδη την τιμή;',
          'Όχι. Η πρώτη συζήτηση μπορεί να ξεκινήσει πριν έχετε καταλήξει σε ζητούμενη τιμή. Η εμπορική τοποθέτηση εξετάζεται με βάση το ακίνητο, τα διαθέσιμα συγκριτικά στοιχεία και τις συνθήκες της αγοράς.',
        ],
        [
          'Τι χρειάζεται πριν δημοσιευτεί το ακίνητο;',
          'Εξαρτάται από την περίπτωση. Ελέγχουμε ποια βασικά στοιχεία, έγγραφα και υλικό χρειάζονται ώστε η παρουσίαση να είναι ακριβής και η διαδικασία να μη δημιουργεί περιττές καθυστερήσεις αργότερα.',
        ],
        [
          'Είναι απαραίτητη η αποκλειστική ανάθεση;',
          'Όχι σε κάθε περίπτωση. Όταν όμως επιλεγεί αποκλειστική εκπροσώπηση, μπορεί να επιτρέψει πιο ενιαία στρατηγική, καλύτερο έλεγχο της παρουσίασης και πιο καθαρή διαχείριση του ενδιαφέροντος.',
        ],
      ],
    },
    form: {
      heading: 'Ας ξεκινήσουμε με μία σύντομη συζήτηση.',
      intro: 'Πείτε μας τα βασικά. Δεν χρειάζεται να συμπληρώσετε πλήρη φάκελο ακινήτου σε αυτό το στάδιο.',
    },
    close: {
      heading: 'Πριν δημοσιεύσετε το ακίνητό σας, ας δούμε πώς πρέπει να τοποθετηθεί στην αγορά.',
      cta: 'Συζητήστε το ακίνητό σας μαζί μας',
    },
  },

  en: {
    slug: 'polisi',
    meta: {
      title: 'Selling property in Chania',
      description:
        'A considered sale begins before a property goes live. Assessment, positioning, preparation and personal representation — starting with a free initial commercial assessment.',
    },
    hero: {
      eyebrow: 'Sell with KYDORA',
      heading: 'Your property deserves more than a listing.',
      body: 'A considered sale begins before a property goes live. Through assessment, positioning, presentation, targeted distribution and personal representation, we structure each stage around one objective: a better prepared and clearer sale process.',
      cta: 'Discuss Your Property With Us',
      quote: 'We don’t just list. We represent.',
    },
    offer: {
      heading: 'A free initial commercial assessment',
      body: 'We look at the property’s core characteristics, the available market information and the selling strategy, so that you have a first evidence-informed picture before deciding how to proceed.',
      note: 'For owners who want a full written analysis without an active exclusive mandate, the Commercial Assessment & Selling Strategy Report is available separately. Under a KYDORA Exclusive mandate, the full report is included at no additional charge.',
      disclaimer:
        'A KYDORA commercial assessment is not a certified valuation. Where a formal certified valuation is required, it is provided through an appropriately certified partner.',
    },
    difference: {
      heading: 'The listing is only one part of the sale.',
      body: 'A property should not simply appear on the market. It should be positioned within it. Before publication, we consider the available data, the property’s condition, its likely audience, presentation requirements and the appropriate route to market.',
    },
    process: {
      heading: 'From initial assessment through completion.',
      steps: [
        ['Assessment', 'Understand the property, the available facts and the owner’s objective.'],
        ['Pricing', 'Develop an evidence-informed market position using available information and current market conditions.'],
        ['Preparation', 'Identify what should be addressed before public presentation.'],
        ['Storytelling & media', 'Build a clear narrative and appropriate visual presentation for the property’s actual audience.'],
        ['Distribution', 'Select relevant channels rather than publishing indiscriminately.'],
        ['Qualification', 'Organise and assess incoming enquiries before progressing them.'],
        ['Viewings', 'Coordinate viewings and capture meaningful feedback.'],
        ['Negotiation', 'Support the process through clear communication and organised information.'],
        ['Transaction', 'Coordinate next steps with the appropriate professionals through completion.'],
        ['Reporting', 'Keep the owner informed about activity, demand and progress.'],
      ],
    },
    mandates: {
      heading: 'Representation should fit the property and the objective.',
      options: [
        ['Open Listing', 'For owners choosing non-exclusive cooperation, with clear terms and organised management of KYDORA’s own activity.'],
        ['KYDORA Exclusive', 'One coordinated representation strategy covering preparation, positioning, marketing, enquiry management and reporting.'],
        ['Signature Representation', 'An enhanced approach for selected premium, distinctive or investment-led properties requiring more specialised presentation and targeted distribution.'],
      ],
      note: 'The final representation model and terms are agreed before any marketing activity begins.',
    },
    marketing: {
      heading: 'Not every property should be marketed in the same way.',
      body: 'Visual presentation, messaging and distribution should serve the property itself. Depending on the mandate, the strategy may include professional photography and video, bilingual presentation, property portals, KYDORA digital channels, targeted campaigns and direct outreach to suitable buyers or partners.',
    },
    demand: {
      heading: 'The right exposure also requires the right audience.',
      body: 'We do not measure success only in views or clicks. What matters is who is interested, why they are interested and whether there is a realistic path forward. KYDORA organises leads, viewings and feedback so the strategy can evolve around meaningful information.',
    },
    expect: {
      heading: 'Clear communication. Defined next steps.',
      items: [
        'An initial conversation about your property and objectives.',
        'Collection of the essential information needed for an initial assessment.',
        'A proposed representation and go-to-market approach.',
        'Agreement before any public marketing begins.',
        'Structured monitoring of interest and next actions.',
      ],
    },
    proof: {
      heading: 'What “preparation” means in practice',
      body: 'We have published the review every property goes through before it reaches the market: which documents we ask for, which checks are carried out, and what we do with anything that cannot be confirmed.',
      cta: 'Read the guide',
      href: '/odigoi/elenchos-prin-ti-dimosiefsi',
    },
    faq: {
      heading: 'Frequently asked questions before selling',
      items: [
        [
          'Do I need to have decided on an asking price already?',
          'No. The first conversation can happen before you have settled on a price. Market positioning should be considered in the context of the property, available comparables and current market conditions.',
        ],
        [
          'What should be ready before the property goes live?',
          'It depends on the property. We identify the essential information, documentation and presentation material needed to market it accurately and reduce avoidable delays later in the process.',
        ],
        [
          'Is an exclusive mandate always required?',
          'No. However, where exclusive representation is chosen, it can allow for a more coordinated strategy, stronger control of presentation and clearer management of buyer interest.',
        ],
      ],
    },
    form: {
      heading: 'Start with a short conversation.',
      intro: 'Tell us the essentials. You do not need to complete a full property file at this stage.',
    },
    close: {
      heading: 'Before you list your property, let’s consider how it should be positioned in the market.',
      cta: 'Discuss Your Property With Us',
    },
  },
};

export const sellerSlug = 'polisi';
