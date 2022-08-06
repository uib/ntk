import Link from 'next/link';
import styles from '../styles/Service.module.css'
import { fetch_services } from '../utils/fetch';

function Ref({type, href}) {
  const iconMap = new Map(Object.entries({
    "Brukerdokumentasjon": "💡",
    "Kildekode": "📃",
    "Produksjonsmiljø": "↗️",
    "Systemdokumentasjon": "⚙️",
    "Testmiljø": "🔬",
    "Utviklingsmiljø": "👩🏼‍💻",
    'Tjenestebeskrivelse': "🛒",
    "Rediger": "✏️"
  }));
  return (
    <a className={styles.ref} href={href} title={type}>{iconMap.get(type) ?? "💣"}</a>
  );
}

function Fact({title, children}) {
  return (
    <div className={styles.fact}>
      <div>{title}</div>
      {children}
    </div>
  );
}

export default function Service({svc}) {
  const refs = [...svc.refs];
  refs.push(...svc.servicelinks.map(d => ({
    type: 'Tjenestebeskrivelse',
    href: 'https://hjelp.uib.no/tas/public/ssp/content/detail/service?unid=' + d.unid,
  })));
  refs.push({
    type: 'Rediger',
    href: 'https://hjelp.uib.no/tas/secure/assetmgmt/card.html?unid=' + svc.unid,
  })

  return (
    <>
      <main className={styles.main}>
        <div className={styles.refContainer}>
        { refs.map(ref => <Ref type={ref.type} href={ref.href} />)}
        </div>
        <div>
          <span className={styles.serviceId}>{svc.id}</span>
          {' '}
          { svc.name != svc.short_name && <span className={styles.serviceShortName}>{svc.short_name}</span> }
        </div>
        <h1>{svc.name}</h1>
        <p>{svc.description}</p>

        <div className={styles.factContainer}>
          <Fact title="Brukerstøtte">{svc.operatorgroup_firstline}</Fact>
          <Fact title="Forretningsområde">{svc.business_domain}</Fact>
          <Fact title="Tjenestetype">{svc.servicetype}</Fact>
          <Fact title="Kritikalitet">{svc.criticality}</Fact>
          <Fact title="Livssyklus">
            {svc.lifecycle}
            {svc.retirement_candidate && ' (Kandidat for utfasing)'}
          </Fact>
          <Fact title="Tjenesteeier">{svc.owner}</Fact>
          <Fact title="Team">{svc.operatorgroup_secondline}</Fact>
          <Fact title="Leverandør">{svc.supplier}</Fact>
        </div>



      </main>
      <footer className={styles.footer}>
        <Link href="/"><a className={styles.backlink}>Tilbake</a></Link>
      </footer>
    </>
  );
}

export async function getStaticPaths() {
  const services = await fetch_services();
  return {
    paths: services.map(svc => ({ params: { id: svc.id } })),
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const services = await fetch_services();
  for (const svc of services) {
    if (svc.id == context.params.id) {
      return { props: { svc } };
    }
  }
  return { notFound: true }
}