import Link from 'next/link';
import styles from '../styles/Service.module.css'
import { fetch_services } from '../utils/fetch';

function Fact({title, children}) {
  return (
    <div className={styles.fact}>
      <div>{title}</div>
      {children}
    </div>
  );
}

export default function Service({svc}) {
  return (
    <>
      <main className={styles.main}>
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