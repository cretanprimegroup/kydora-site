// Κοινή κάρτα ακινήτου για Home και Properties.
// Κανόνες περιεχομένου: Properties Listing & Search V1 §4 — εικόνα, δημόσιος τίτλος,
// προσεγγιστική τοποθεσία, τιμή, λίγα επαληθευμένα στοιχεία, κωδικός, badge μόνο όπου ορίζεται.

export function money(n, locale) {
  if (typeof n !== 'number') return null;
  return new Intl.NumberFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function area(n, locale) {
  if (typeof n !== 'number') return null;
  return (
    new Intl.NumberFormat(locale === 'el' ? 'el-GR' : 'en-GB').format(n) +
    (locale === 'el' ? ' τ.μ.' : ' m²')
  );
}

export default function PropertyCard({ p, t, locale }) {
  const meta = [area(p.area, locale), p.location].filter(Boolean).join(' · ');
  const badge =
    p.mandate === 'Exclusive'
      ? t.properties.exclusive
      : p.mandate === 'Open'
        ? t.properties.open
        : '';

  return (
    <a className="card" href={`/${locale}/akinita/${p.slug}`}>
      <div className="plate shot">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title || ''} />
        ) : (
          <>
            <span className="mark" aria-hidden="true" />
            <span className="ph">{t.properties.photoPending}</span>
          </>
        )}
      </div>
      <h3>{p.title}</h3>
      {meta ? <p className="meta">{meta}</p> : null}
      <div className="row">
        <span className="price">{money(p.price, locale) || t.detail.onRequest}</span>
        {badge ? <span className="badge">{badge}</span> : null}
      </div>
    </a>
  );
}
