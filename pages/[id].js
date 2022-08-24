import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight, faCodeBranch, faQuestion, faBomb, faCircleInfo, faBug, faPencil, faScroll, faCode, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Service.module.css'
import { fetch_services } from '../utils/fetch';

function Ref({type, href}) {
  const iconMap = new Map(Object.entries({
    "Brukerdokumentasjon": <FontAwesomeIcon icon={faQuestion} />,
    "Kildekode": <FontAwesomeIcon icon={faCode} />,
    "Produksjonsmiljø": <FontAwesomeIcon icon={faSquareArrowUpRight} />,
    "Systemdokumentasjon": <FontAwesomeIcon icon={faCircleInfo} />,
    "Testmiljø": <FontAwesomeIcon icon={faBug} />,
    "Utviklingsmiljø": <FontAwesomeIcon icon={faCodeBranch} />,
    'Tjenestebeskrivelse': <FontAwesomeIcon icon={faScroll} />,
    "Rediger": <FontAwesomeIcon icon={faPencil} />,
  }));
  return (
    <a className={styles.ref} href={href} title={type}>{iconMap.get(type) ?? <FontAwesomeIcon icon={faBomb} /> }</a>
  );
}

function Fact({title, children}) {
  if (!children || children.length == 0)
    return null;

  return (
    <div className={styles.fact}>
      <div>{title}</div>
      {children}
    </div>
  );
}

function peopleWithRoles(svc, role) {
  return svc.people
    .filter(d => d.role == role)
    .map(d => <div className={styles.person} title={d.role} key={d.person}><FontAwesomeIcon icon={faUser} /> {d.person}</div>);
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
      <Head>
        <title>{svc.name}</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.refContainer}>
        { refs.map(ref => <Ref type={ref.type} href={ref.href} key={ref.type + ref.href}/>)}
        </div>
        <div>
          <span className={styles.serviceId}>{svc.id}</span>
          {' '}
          { svc.name != svc.short_name && <span className={styles.serviceShortName}>{svc.short_name}</span> }
        </div>
        <h1>{svc.name}</h1>
        <p>{svc.description}</p>

        <div className={styles.factContainer}>
          <Fact title="Tjenesteeier">{svc.owner}{peopleWithRoles(svc, "Kontaktperson Tjenesteeier")}</Fact>
          <Fact title="Brukerstøtte">{svc.operatorgroup_firstline}{peopleWithRoles(svc, "Kontaktperson Brukerstøtte")}</Fact>
          <Fact title="Forvaltingsteam">{svc.operatorgroup_secondline}{peopleWithRoles(svc, "Kontaktperson Drift/forvaltning")}</Fact>
          <Fact title="Leverandør">{svc.supplier}</Fact>
          <Fact title="Forretningsområde">{svc.business_domain}</Fact>
          <Fact title="Tjenestetype">{svc.servicetype}</Fact>
          <Fact title="Kritikalitet">{svc.criticality}</Fact>
          <Fact title="Livssyklus">
            {svc.lifecycle}
            {svc.retirement_candidate && ' (Kandidat for utfasing)'}
          </Fact>
        </div>
        <div className={styles.factContainer}>
          <Fact title="Får data fra">
            {svc.links.filter(link => link.rel?.name === 'Leverer data til' && link.child.unid == svc.unid)
                      .map(link => <div key={link.unid}><Link href={'/' + link.parent.asset_name.split(' ')[0]}>{link.parent.asset_name}</Link></div> )}
          </Fact>
          <Fact title="Leverer data til">
            {svc.links.filter(link => link.rel?.name === 'Leverer data til' && link.parent.unid == svc.unid)
                      .map(link => <div key={link.unid}><Link href={'/' + link.child.asset_name.split(' ')[0]}>{link.child.asset_name}</Link></div> )}
          </Fact>

          <Fact title="Innloggingstjenester i bruk">
            {svc.links.filter(link => link.rel?.name === 'Tilbyr innlogging for' && link.child.unid == svc.unid)
                      .map(link => <div key={link.unid}><Link href={'/' + link.parent.asset_name.split(' ')[0]}>{link.parent.asset_name}</Link></div> )}
          </Fact>
          <Fact title="Tilbyr innlogging for">
            {svc.links.filter(link => link.rel?.name === 'Tilbyr innlogging for' && link.parent.unid == svc.unid)
                      .map(link => <div key={link.unid}><Link href={'/' + link.child.asset_name.split(' ')[0]}>{link.child.asset_name}</Link></div> )}
          </Fact>

          <Fact title="Påvirkes av">
            {svc.links.filter(link => link.rel === null && link.child.unid == svc.unid)
                      .map(link => <div key={link.unid}><Link href={'/' + link.parent.asset_name.split(' ')[0]}>{link.parent.asset_name}</Link></div> )}
          </Fact>
          <Fact title="Påvirker">
            {svc.links.filter(link => link.rel === null && link.parent.unid == svc.unid)
                      .map(link => <div key={link.unid}><Link href={'/' + link.child.asset_name.split(' ')[0]}>{link.child.asset_name}</Link></div> )}
          </Fact>
        </div>

        <div className={styles.bottomNav}>
          <Link href="/"><a className="backlink">Tilbake</a></Link>
        </div>
      </div>
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