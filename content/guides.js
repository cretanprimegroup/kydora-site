// Οδηγοί KYDORA. Πηγή: "KYDORA Website Production Copy V1 — Οδηγός: …" (Notion).
// Κάθε οδηγός δημοσιεύεται μόνο μετά από έγκριση στο Notion.
//
// ΚΑΝΟΝΑΣ (απόφαση 01/10/2026): οι οδηγοί περιγράφουν ΤΙ ελέγχεται, ποτέ ΠΟΤΕ.
// Ο κανονικός έλεγχος γίνεται μετά την ανάθεση — δεν γίνεται διαχείριση
// εγγράφων χωρίς υπογεγραμμένη συγκατάθεση GDPR, και δεν δεσμεύονται
// εργατοώρες σε ακίνητο που μπορεί να μην ανατεθεί. Καμία αναφορά χρόνου.
//
// Όπως και στο copy.js: καμία συνάρτηση μέσα στα δεδομένα.
//
// ΟΔΗΓΟΙ ΣΕ DRAFT: ένας οδηγός με draft: true φαίνεται ΜΟΝΟ όσο το site είναι
// κλειστό. Την ημέρα του launch (SITE_PUBLIC=true) εξαφανίζεται μόνος του —
// από τη λίστα, από τη δική του σελίδα και από το sitemap. Έτσι κείμενο που
// δεν έχει περάσει νομικό έλεγχο δεν μπορεί να βγει δημόσια κατά λάθος.
// Μετά την έγκριση: draft: false. Τίποτα άλλο.

const SITE_PUBLIC = process.env.SITE_PUBLIC === 'true';

const allGuides = [
  {
    slug: 'elenchos-prin-ti-dimosiefsi',
    published: '2026-10-01',
    el: {
      title: 'Τι ελέγχουμε πριν βγει ένα ακίνητο προς πώληση',
      description:
        'Τα έγγραφα, οι έλεγχοι και τα κατώφλια που περνάει κάθε ακίνητο της KYDORA πριν δημοσιευτεί — και τι γίνεται με όσα δεν επιβεβαιώνονται.',
      intro: [
        'Το ίδιο ακίνητο εμφανίζεται συχνά σε έξι διαφορετικά σημεία, με τρεις διαφορετικές τιμές, χωρίς κανένα έγγραφο και με εμβαδόν που αλλάζει ανάλογα με το ποιος το έγραψε. Για τον αγοραστή αυτό σημαίνει χαμένο χρόνο. Για τον ιδιοκτήτη σημαίνει κάτι χειρότερο: ένα ακίνητο που κυκλοφορεί αρκετό καιρό χωρίς σαφήνεια αρχίζει να μοιάζει προβληματικό, ακόμη κι όταν δεν είναι.',
        'Γι᾽ αυτό στην KYDORA ένα ακίνητο δεν δημοσιεύεται όταν συμφωνηθεί η τιμή. Δημοσιεύεται όταν περάσει τον έλεγχο.',
        'Παρακάτω είναι τι ακριβώς κοιτάμε — και, εξίσου σημαντικό, τι κάνουμε με όσα δεν επιβεβαιώνονται.',
      ],
      sections: [
        {
          h: 'Τα έγγραφα',
          p: [
            'Δεν ζητάμε έγγραφα για να γεμίσουμε φάκελο. Κάθε ένα απαντά σε ένα ερώτημα που θα τεθεί αργότερα — από τον δικηγόρο του αγοραστή, από την τράπεζα ή από τον συμβολαιογράφο. Όσο νωρίτερα απαντηθεί, τόσο λιγότερο κοστίζει.',
          ],
          defs: [
            ['Τίτλος ιδιοκτησίας.', 'Ποιος είναι ο ιδιοκτήτης και πώς απέκτησε το ακίνητο. Χωρίς αυτόν δεν υπάρχει συζήτηση· όλα τα υπόλοιπα είναι εικασία.'],
            ['Κτηματολόγιο και ΚΑΕΚ.', 'Αν το ακίνητο είναι καταχωρισμένο, με ποια στοιχεία, και αν αυτά συμφωνούν με τον τίτλο. Οι ασυμφωνίες εδώ είναι συνηθισμένες και σχεδόν πάντα διορθώσιμες — αρκεί να εντοπιστούν πριν, όχι την εβδομάδα του συμβολαίου.'],
            ['Τοπογραφικό διάγραμμα.', 'Τα πραγματικά όρια και το πραγματικό εμβαδόν. Σε οικόπεδα και αγροτεμάχια είναι το κρισιμότερο έγγραφο του φακέλου, γιατί από αυτό κρίνεται τι μπορεί να χτιστεί.'],
            ['Ε9 και ΕΝΦΙΑ.', 'Πώς έχει δηλωθεί το ακίνητο και αν η δήλωση συμφωνεί με την πραγματικότητα και με τον τίτλο.'],
            ['Ηλεκτρονική Ταυτότητα Κτιρίου, όπου εφαρμόζεται.', 'Για κτίσματα είναι απαραίτητη στη μεταβίβαση. Δεν αφορά οικόπεδα χωρίς κτίσμα.'],
            ['Άδειες και τακτοποιήσεις, όπου υπάρχει κτίσμα.', 'Τι έχει κατασκευαστεί με άδεια, τι έχει τακτοποιηθεί, τι εκκρεμεί.'],
          ],
        },
        {
          h: 'Οι δύο έλεγχοι',
          p: ['Τα έγγραφα δείχνουν τι υπάρχει. Δεν λένε αν στέκει.'],
          defs: [
            ['Νομικός έλεγχος.', 'Τίτλοι, βάρη, διεκδικήσεις, κληρονομικά, συνιδιοκτησίες.'],
            ['Έλεγχος μηχανικού.', 'Αρτιότητα και οικοδομησιμότητα, όροι δόμησης, αποκλίσεις μεταξύ αδειών και πραγματικής κατάστασης, τεχνικά ζητήματα του κτίσματος.'],
          ],
          after: [
            'Κανένας από τους δύο δεν σημειώνεται ως ολοκληρωμένος στο σύστημά μας πριν όντως ολοκληρωθεί. Είναι βαρετός κανόνας, και είναι ο λόγος που οι φάκελοί μας αντέχουν.',
          ],
        },
        {
          h: 'Τι γίνεται με όσα δεν επιβεβαιώνονται',
          p: [
            'Εδώ είναι η ουσιαστική διαφορά.',
            'Όταν κάτι δεν έχει επιβεβαιωθεί, δεν το παρουσιάζουμε ως δεδομένο. Δεν γράφουμε «χτίζει 400 τ.μ.» επειδή το ανέφερε ο ιδιοκτήτης. Δεν γράφουμε «κατάλληλο για τουριστική εκμετάλλευση» επειδή ακούγεται καλά. Ό,τι εκκρεμεί καταγράφεται ως εκκρεμές, και λέγεται στον υποψήφιο αγοραστή ως εκκρεμές.',
            'Αυτό μερικές φορές κάνει την αγγελία λιγότερο εντυπωσιακή. Κάνει όμως τη συζήτηση που ακολουθεί πολύ πιο σύντομη.',
          ],
        },
        {
          h: 'Τα κατώφλια πριν τη δημοσίευση',
          p: ['Τέσσερα, με τη σειρά. Κανένα δεν παρακάμπτεται:'],
          ol: [
            ['Πληρότητα στοιχείων', 'τα βασικά δεδομένα υπάρχουν και συμφωνούν μεταξύ τους.'],
            ['Τεκμηρίωση', 'τα κρίσιμα στοιχεία στηρίζονται σε έγγραφο ή σε έλεγχο επαγγελματία.'],
            ['Έγκριση κειμένου', 'το δημόσιο κείμενο έχει ελεγχθεί από άνθρωπο ως προς τα πραγματικά περιστατικά, σε ελληνικά και αγγλικά.'],
            ['Έγκριση δημοσίευσης', 'τελική απόφαση ότι το ακίνητο μπορεί να βγει.'],
          ],
          after: [
            'Αν αλλάξει η τιμή ή κάποιο τεχνικό στοιχείο, το κείμενο και η έγκριση επανελέγχονται. Δεν μένει παλιά πληροφορία στον αέρα.',
          ],
        },
        {
          h: 'Τι δεν βγαίνει ποτέ δημόσια',
          p: [
            'Στοιχεία και επικοινωνία ιδιοκτήτη. ΑΦΜ και προσωπικά έγγραφα. Η ελάχιστη τιμή που δέχεται ο ιδιοκτήτης. Εσωτερικές σημειώσεις και αξιολογήσεις. Οι όροι της ανάθεσης. Η ακριβής θέση, όταν δεν έχει εγκριθεί να δημοσιευτεί.',
            'Ο ιδιοκτήτης αποφασίζει τι γίνεται δημόσιο. Όχι το γραφείο.',
          ],
        },
        {
          h: 'Τι σημαίνει πρακτικά για εσάς',
          defs: [
            ['Αν πουλάτε.', 'Ο έλεγχος γίνεται μία φορά, οργανωμένα, με τη δική μας καθοδήγηση — αντί να γίνει πέντε φορές, βιαστικά, από πέντε διαφορετικούς αγοραστές που θα βρουν τα ίδια κενά και θα τα χρησιμοποιήσουν στη διαπραγμάτευση.'],
            ['Αν αγοράζετε.', 'Ό,τι διαβάζετε σε μια αγγελία μας είτε τεκμηριώνεται είτε δηλώνεται ρητά ως υπό επιβεβαίωση. Δεν θα χρειαστεί να ανακαλύψετε μόνοι σας τι έλειπε.'],
          ],
        },
      ],
      disclaimerHeading: 'Τι δεν είναι αυτός ο έλεγχος',
      disclaimer:
        'Δεν υποκαθιστά τον δικό σας δικηγόρο, μηχανικό ή φοροτεχνικό. Η KYDORA δεν παρέχει νομικές, τεχνικές ή φορολογικές συμβουλές. Οργανώνουμε τη διαδικασία, εντοπίζουμε έγκαιρα τι λείπει και συντονιζόμαστε με τον κατάλληλο επαγγελματία — χωρίς ποτέ να αντικαθιστούμε τη δική του ανεξάρτητη κρίση.',
      cta1: 'Συζητήστε το ακίνητό σας',
      cta2: 'Δείτε τα διαθέσιμα ακίνητα',
    },
    en: {
      title: 'What we check before a property goes to market',
      description:
        'The documents, the reviews and the gates every KYDORA property clears before publication — and what happens to anything that cannot be confirmed.',
      intro: [
        'The same property often appears in six different places, at three different prices, with no documents and a floor area that changes depending on who typed it. For a buyer that is wasted time. For an owner it is worse: a property that circulates long enough without clarity starts to look troubled, even when it isn’t.',
        'So at KYDORA a property is not published when the price is agreed. It is published when it clears the checks.',
        'Here is exactly what we look at — and, just as importantly, what we do with anything that cannot be confirmed.',
      ],
      sections: [
        {
          h: 'The documents',
          p: [
            'We don’t collect documents to fill a folder. Each one answers a question that will be asked later — by the buyer’s lawyer, by a bank, or by the notary. The earlier it is answered, the less it costs.',
          ],
          defs: [
            ['Title deed.', 'Who owns the property and how they acquired it. Without it there is no conversation; everything else is assumption.'],
            ['Cadastre registration and KAEK.', 'Whether the property is registered, with what details, and whether those match the title. Discrepancies here are common and almost always fixable — provided they surface early, not in the week of signing.'],
            ['Topographic survey.', 'The real boundaries and the real area. For plots and land this is the single most important document in the file, because it determines what can be built.'],
            ['E9 and ENFIA declarations.', 'How the property has been declared for tax, and whether the declaration agrees with reality and with the title.'],
            ['Building Identity (Ηλεκτρονική Ταυτότητα Κτιρίου), where applicable.', 'Required at transfer for buildings. Not relevant for bare land.'],
            ['Permits and legalisations, where there is a structure.', 'What was built under permit, what has been regularised, what remains open.'],
          ],
        },
        {
          h: 'The two reviews',
          p: ['Documents show what exists. They don’t say whether it holds up.'],
          defs: [
            ['Legal review.', 'Titles, encumbrances, claims, inheritance matters, co-ownership.'],
            ['Engineering review.', 'Buildability and planning parameters, deviations between permits and what actually stands, technical condition.'],
          ],
          after: [
            'Neither is marked complete in our system before it is genuinely complete. It is a dull rule, and it is why our files survive scrutiny.',
          ],
        },
        {
          h: 'What happens to anything unconfirmed',
          p: [
            'This is where the real difference sits.',
            'Where something has not been verified, we do not present it as fact. We don’t write “400 sq m of buildable area” because the owner mentioned it. We don’t write “suitable for short-term rental” because it sounds good. What is outstanding is recorded as outstanding, and stated to a prospective buyer as outstanding.',
            'This occasionally makes a listing less dazzling. It makes the conversation that follows considerably shorter.',
          ],
        },
        {
          h: 'The gates before publication',
          p: ['Four of them, in order. None is skipped:'],
          ol: [
            ['Completeness', 'the core data exists and is internally consistent.'],
            ['Evidence', 'the material facts rest on a document or a professional’s review.'],
            ['Copy approval', 'the public text has been fact-checked by a person, in Greek and English.'],
            ['Publishing approval', 'a final decision that the property may go out.'],
          ],
          after: [
            'If the price or a technical fact changes, the text and the approval are reviewed again. Stale information does not stay up.',
          ],
        },
        {
          h: 'What never goes public',
          p: [
            'Owner identity and contact details. Tax numbers and personal documents. The minimum price an owner would accept. Internal notes and assessments. Mandate terms. The exact location, where publishing it has not been approved.',
            'The owner decides what becomes public. Not the agency.',
          ],
        },
        {
          h: 'What this means for you',
          defs: [
            ['If you are selling.', 'The work is done once, properly, with our guidance — rather than five times, hurriedly, by five different buyers who will find the same gaps and use them in negotiation.'],
            ['If you are buying.', 'What you read in one of our listings is either documented or explicitly flagged as subject to confirmation. You will not have to discover for yourself what was missing.'],
          ],
        },
      ],
      disclaimerHeading: 'What this review is not',
      disclaimer:
        'It does not replace your own lawyer, engineer or tax adviser. KYDORA does not provide legal, technical or tax advice. We structure the process, identify early what is missing, and coordinate with the appropriate professional — without ever substituting for their independent judgement.',
      cta1: 'Discuss your property',
      cta2: 'Explore available properties',
    },
  },
  {
    slug: 'allodapos-agorastis',
    published: '2026-10-01',
    // ΝΟΜΙΚΟΣ ΕΛΕΓΧΟΣ ΣΕ ΕΚΚΡΕΜΟΤΗΤΑ. Ο οδηγός αναφέρει νόμο, φόρους και
    // προθεσμίες. Δεν γίνεται δημόσιος πριν τον δει δικηγόρος.
    draft: true,
    el: {
      title: 'Τι χρειάζεται ένας αλλοδαπός αγοραστής για να αγοράσει ακίνητο στην Ελλάδα',
      description:
        'ΑΦΜ, φορολογικός εκπρόσωπος, τραπεζικός λογαριασμός, συμβολαιογράφος, έξοδα και Golden Visa — με τη σωστή σειρά, και τι ισχύει ειδικά για την Κρήτη.',
      intro: [
        'Η αγορά ακινήτου στην Ελλάδα από αλλοδαπό δεν είναι δύσκολη. Είναι όμως διαδικαστική, και τα περισσότερα προβλήματα προκύπτουν επειδή κάποιο βήμα έγινε με λάθος σειρά.',
        'Παρακάτω είναι η σειρά.',
      ],
      sections: [
        {
          h: '1. Μπορείτε να αγοράσετε;',
          p: [
            'Πολίτες κρατών της ΕΕ αγοράζουν με τα ίδια δικαιώματα που έχει ένας Έλληνας.',
            'Πολίτες τρίτων χωρών αγοράζουν επίσης ελεύθερα, εκτός από τις περιοχές που έχουν χαρακτηριστεί παραμεθόριες. Εκεί απαιτείται άδεια. Στον κατάλογο περιλαμβάνονται περιοχές όπως η Δωδεκάνησος, ο Έβρος, η Ξάνθη, η Ροδόπη, η Θεσπρωτία, η Λέσβος, η Σάμος, η Χίος, η Θήρα και η Σκύρος.',
            'Η Κρήτη δεν περιλαμβάνεται στον κατάλογο. Αυτό όμως δεν σημαίνει «παντού ελεύθερα». Υπάρχουν ζώνες γύρω από στρατιωτικές εγκαταστάσεις όπου ισχύουν περιορισμοί για αλλοδαπούς αγοραστές — στα Χανιά, χαρακτηριστικά στην περιοχή γύρω από τον Ναύσταθμο.',
            'Γι᾽ αυτό δεν λέμε «στην Κρήτη αγοράζουν όλοι ελεύθερα». Το ελέγχουμε ανά ακίνητο — και επειδή ο κατάλογος των παραμεθορίων μπορεί να μεταβληθεί με υπουργική απόφαση, και επειδή οι τοπικές ζώνες δεν φαίνονται σε καμία αγγελία.',
          ],
        },
        {
          h: '2. ΑΦΜ — πρώτο βήμα, πριν από όλα',
          p: [
            'Χωρίς ελληνικό ΑΦΜ δεν γίνεται τίποτα: ούτε συμβόλαιο, ούτε δήλωση φόρου, ούτε λογαριασμός ρεύματος.',
            'Εκδίδεται στη ΔΟΥ Κατοίκων Εξωτερικού και δεν απαιτεί τη φυσική σας παρουσία — γίνεται με πληρεξούσιο.',
            'Τι χρειάζεται: έντυπο Μ1, έντυπο Μ7 για τον φορολογικό εκπρόσωπο, επικυρωμένο αντίγραφο διαβατηρίου, και πληρεξούσιο θεωρημένο με apostille και επίσημη μετάφραση — ή υπογεγραμμένο σε ελληνικό προξενείο.',
          ],
        },
        {
          h: '3. Φορολογικός εκπρόσωπος',
          p: [
            'Όποιος δεν έχει διεύθυνση αλληλογραφίας στην Ελλάδα πρέπει να ορίσει φορολογικό εκπρόσωπο με φορολογική κατοικία εδώ.',
            'Δεν είναι διαχειριστής και δεν αποφασίζει για εσάς. Είναι η διεύθυνση στην οποία φτάνει η φορολογική αλληλογραφία. Συνήθως ο λογιστής ή ο δικηγόρος σας.',
          ],
        },
        {
          h: '4. Ελληνικός τραπεζικός λογαριασμός',
          p: ['Πρακτικά απαραίτητος: για τον φόρο, για τους λογαριασμούς κοινής ωφέλειας, για τον ΕΝΦΙΑ.'],
          defs: [
            [
              'Το σημείο που ξεχνιέται και κοστίζει.',
              'Κρατήστε τα τραπεζικά παραστατικά που δείχνουν ότι τα χρήματα ήρθαν από το εξωτερικό μέσω τραπεζικού συστήματος. Χρειάζονται αργότερα, αν θελήσετε να επαναπατρίσετε το τίμημα μετά από πώληση, και αν σας ζητηθεί τεκμηρίωση προέλευσης κεφαλαίων. Είναι δύο λεπτά τότε και πολλοί μήνες μετά.',
            ],
          ],
        },
        {
          h: '5. Συμβολαιογράφος και δικηγόρος',
          p: [
            'Η μεταβίβαση γίνεται ενώπιον συμβολαιογράφου. Δεν υπάρχει άλλος δρόμος.',
            'Για τον δικηγόρο: το αν η παράστασή του είναι υποχρεωτική έχει αλλάξει στο παρελθόν και συζητείται ξανά. Θεωρούμε όμως ότι το ερώτημα είναι λάθος τοποθετημένο. Ο έλεγχος τίτλων — τι ακριβώς αγοράζετε, από ποιον, και με τι βάρη — είναι δουλειά δικηγόρου. Δεν παραλείπεται επειδή κάποια στιγμή ο νόμος δεν τον απαιτεί.',
          ],
        },
        {
          h: '6. Τα έξοδα',
          defs: [
            [
              'Φόρος μεταβίβασης: 3%.',
              'Συν δημοτικός φόρος 3% υπολογισμένος πάνω στον ίδιο τον φόρο — συνολικά περίπου 3,09%. Υπολογίζεται στη μεγαλύτερη από τις δύο αξίες: την αντικειμενική ή το τίμημα του συμβολαίου. Τον πληρώνει ο αγοραστής, πριν την υπογραφή, μέσω myPROPERTY.',
            ],
            [
              'ΦΠΑ 24% σε νεόδμητα: σε αναστολή έως 31/12/2026.',
              'Όσο ισχύει η αναστολή, και τα νεόδμητα πληρώνουν φόρο μεταβίβασης αντί για ΦΠΑ.',
            ],
            [
              'Επιπλέον.',
              'Συμβολαιογραφικά και δικηγορικά κατά κλίμακα επί της αξίας, τέλη Κτηματολογίου ή υποθηκοφυλακείου, μεταφράσεις και apostille, μεσιτική αμοιβή.',
            ],
          ],
        },
        {
          h: '7. Golden Visa',
          p: [
            'Η άδεια διαμονής μέσω επένδυσης σε ακίνητα είναι χωριστή διαδικασία με δικούς της κανόνες, και τα όρια επένδυσης έχουν αλλάξει. Δεν είναι αυτόματη συνέπεια της αγοράς: κάποια ακίνητα και κάποιες χρήσεις δεν πληρούν τις προϋποθέσεις.',
            'Αν η διαμονή είναι μέρος του στόχου σας, πείτε το μας πριν επιλέξετε ακίνητο. Αλλάζει ποια ακίνητα έχει νόημα να δείτε.',
          ],
        },
      ],
      disclaimerHeading: 'Τι δεν είναι αυτός ο οδηγός',
      disclaimer:
        'Δεν υποκαθιστά τον δικό σας δικηγόρο, μηχανικό ή φοροτεχνικό. Η KYDORA δεν παρέχει νομικές, τεχνικές ή φορολογικές συμβουλές. Οργανώνουμε τη διαδικασία, εντοπίζουμε έγκαιρα τι λείπει και συντονιζόμαστε με τον κατάλληλο επαγγελματία — χωρίς ποτέ να αντικαθιστούμε τη δική του ανεξάρτητη κρίση. Οι φορολογικοί συντελεστές και οι προθεσμίες μεταβάλλονται· τα στοιχεία ελέγχθηκαν την 1η Οκτωβρίου 2026.',
      cta1: 'Πείτε μας τι αναζητάτε',
      cta2: 'Δείτε τα διαθέσιμα ακίνητα',
    },
    en: {
      title: 'What a foreign buyer needs to purchase property in Greece',
      description:
        'Tax number, tax representative, bank account, notary, costs and the Golden Visa — in the right order, and what applies specifically in Crete.',
      intro: [
        'Buying property in Greece as a foreigner is not difficult. It is procedural — and most of the trouble people run into comes from doing a step in the wrong order.',
        'Here is the order.',
      ],
      sections: [
        {
          h: '1. Are you allowed to buy?',
          p: [
            'Citizens of EU member states buy on the same terms as a Greek national.',
            'Citizens of non-EU countries also buy freely, except in areas designated as border regions, where permission is required. The list includes areas such as the Dodecanese, Evros, Xanthi, Rhodope, Thesprotia, Lesvos, Samos, Chios, Thira and Skyros.',
            'Crete is not on that list. That does not mean “anywhere in Crete, freely”. There are zones around military installations where restrictions apply to foreign buyers — in Chania, notably the area around the naval base.',
            'So we don’t tell you “anyone can buy anywhere in Crete”. We check it per property — both because the border-area list can be changed by ministerial decision, and because these local zones appear in no listing.',
          ],
        },
        {
          h: '2. A Greek tax number (AFM) — before anything else',
          p: [
            'Nothing happens without one: no deed, no tax filing, no electricity account.',
            'It is issued by the Tax Office for Residents Abroad, and you do not need to be in Greece — it can be done under power of attorney.',
            'What it takes: form M1, form M7 appointing a tax representative, a certified copy of your passport, and a power of attorney notarised abroad with apostille and official Greek translation — or signed at a Greek consulate.',
          ],
        },
        {
          h: '3. A tax representative',
          p: [
            'Anyone without a mailing address in Greece must appoint a tax representative who is tax resident here.',
            'This person does not manage your affairs and does not decide anything on your behalf. They are the address your tax correspondence arrives at. Usually your accountant or lawyer.',
          ],
        },
        {
          h: '4. A Greek bank account',
          p: ['Practically necessary: for the transfer tax, for utilities, for the annual property tax.'],
          defs: [
            [
              'The part people forget, and it costs them.',
              'Keep the bank records showing that the funds arrived from abroad through the banking system. You will need them later if you sell and want to repatriate the proceeds, and if you are ever asked to evidence the source of funds. Two minutes at the time; many months afterwards.',
            ],
          ],
        },
        {
          h: '5. Notary and lawyer',
          p: [
            'The transfer is executed before a notary. There is no alternative route.',
            'On the lawyer: whether attendance is legally compulsory has changed before and is debated again. We think that is the wrong question. The title check — what exactly you are buying, from whom, and with what encumbrances — is a lawyer’s work. It is not skipped because the law happens not to require it.',
          ],
        },
        {
          h: '6. The costs',
          defs: [
            [
              'Transfer tax: 3%.',
              'Plus a municipal surcharge of 3% calculated on the tax itself — roughly 3.09% in total. It is assessed on the higher of the objective (tax-assessed) value and the price stated in the deed. The buyer pays it, before signing, through the myPROPERTY platform.',
            ],
            [
              '24% VAT on new builds: currently suspended until 31 December 2026.',
              'While the suspension holds, new builds pay transfer tax instead of VAT.',
            ],
            [
              'On top of that.',
              'Notary and legal fees on a scale related to value, Land Registry fees, translations and apostilles, agency fee.',
            ],
          ],
        },
        {
          h: '7. Golden Visa',
          p: [
            'Residency through property investment is a separate process with its own rules, and the investment thresholds have changed. It is not an automatic consequence of buying: some properties and some uses do not qualify.',
            'If residency is part of your objective, tell us before you choose a property. It changes which properties are worth viewing.',
          ],
        },
      ],
      disclaimerHeading: 'What this guide is not',
      disclaimer:
        'It does not replace your own lawyer, engineer or tax adviser. KYDORA does not provide legal, technical or tax advice. We structure the process, identify early what is missing, and coordinate with the appropriate professional — without ever substituting for their independent judgement. Tax rates and deadlines change; this information was checked on 1 October 2026.',
      cta1: 'Tell us what you’re looking for',
      cta2: 'Explore available properties',
    },
  },
];

// Ό,τι βλέπει το site. Οι drafts κόβονται αυτόματα στο launch.
export const guides = allGuides.filter((g) => !g.draft || !SITE_PUBLIC);

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug) || null;
}
