import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight, faCodeBranch, faQuestion, faBomb, faCircleInfo, faBug, faPencil, faScroll, faCode, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ServiceLink } from '../components/servicelink';
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

function peopleWithRoles(svc, ...role) {
  return svc.people
    .filter(d => role.includes(d.role))
    .map(d => <div className={styles.person} title={d.role} key={d.person}><FontAwesomeIcon icon={faUser} /> {d.person}</div>);
}

function format_date(isodate, len=16) {
  let ret = isodate.replace('T', ' ').substr(0, len);
  if (len >= 13 && isodate[isodate.length-1] == 'Z') {
    ret += 'Z';
  }
  return ret;
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
          <Fact title="Forvaltingsteam">{svc.operatorgroup_secondline}{peopleWithRoles(svc, "Kontaktperson Drift/forvaltning", "Utvikler")}</Fact>
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
                      .map(link => <div key={link.unid}><ServiceLink service={link.parent}/></div> )}
          </Fact>
          <Fact title="Leverer data til">
            {svc.links.filter(link => link.rel?.name === 'Leverer data til' && link.parent.unid == svc.unid)
                      .map(link => <div key={link.unid}><ServiceLink service={link.child}/></div> )}
          </Fact>

          <Fact title="Innloggingstjenester i bruk">
            {svc.links.filter(link => link.rel?.name === 'Tilbyr innlogging for' && link.child.unid == svc.unid)
                      .map(link => <div key={link.unid}><ServiceLink service={link.parent}/></div> )}
          </Fact>
          <Fact title="Tilbyr innlogging for">
            {svc.links.filter(link => link.rel?.name === 'Tilbyr innlogging for' && link.parent.unid == svc.unid)
                      .map(link => <div key={link.unid}><ServiceLink service={link.child}/></div> )}
          </Fact>

          <Fact title="Påvirkes av">
            {svc.links.filter(link => link.rel === null && link.child.unid == svc.unid)
                      .map(link => <div key={link.unid}><ServiceLink service={link.parent}/></div> )}
          </Fact>
          <Fact title="Påvirker">
            {svc.links.filter(link => link.rel === null && link.parent.unid == svc.unid)
                      .map(link => <div key={link.unid}><ServiceLink service={link.child}/></div> )}
          </Fact>
        </div>

        <div className={styles.timeStamp}>
          as of {format_date(svc.meta.sdate)}
          , modified {format_date(svc.meta.mdate, 10)}
        </div>

        <div className={styles.bottomNav}>
          <Link href="/"><a className="button">Tilbake</a></Link>
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
  const services_by_unid = new Map(services.map(d => [d.unid, d]));
  function add_svc_attrs(s1) {
    const s2 = services_by_unid.get(s1.unid);
    if (s2) {
      s1.id = s2.id;
      s1.short_name = s2.short_name;
      s1.name = s2.name;
      s1.lifecycle = s2.lifecycle;
    }
    else {
      let [id, ...name] = s1.asset_name.split(' ');
      s1.id = id;
      s1.name = s1.short_name = name.join(' ');
      s1.lifecycle = "9-Unknown";
    }
  }
  for (const svc of services) {
    if (svc.id == context.params.id) {
      for (const link of svc.links) {
        if (link.parent.unid != svc.unid) {
          add_svc_attrs(link.parent);
        }
        if (link.child.unid != svc.unid) {
          add_svc_attrs(link.child);
        }
      }
      return { props: { svc } };
    }
  }
  return { notFound: true }
}