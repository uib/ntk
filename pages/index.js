import Head from 'next/head'
import Link from 'next/link'
import { ServiceLink } from '../components/servicelink'
import styles from '../styles/Home.module.css'
import { fetch_services } from '../utils/fetch'
import { useState } from 'react'

export default function Home({services, synced_date}) {
  const [filter, setFilter] = useState('');
  const filter_lc = filter.trim().toLowerCase();
  const filtered_services = services.filter(svc =>
    !filter_lc || svc.search_body.includes(filter_lc)
  );
  return (
    <>
      <Head>
        <title>UiBs tjenesteportefølje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <input
            value={filter}
            onChange={event => setFilter(event.target.value)}
            placeholder="Søk"
        />
        <h1>UiBs tjeneste&shy;portefølje ({filtered_services.length || "ingen"}{filter_lc ? ` med «${filter}»` : undefined})</h1>
        <ul className={styles.serviceList}>
        { filtered_services.map(svc =>
            <li key={svc.id}>
              <ServiceLink service={svc} />
            </li>)
        }
        </ul>
        <p className={styles.timeStamp}><em>Data hentet fra UiBhjelp {synced_date}Z</em></p>
        { filtered_services.length < 20
            ? <p><br/>Finner du ikke tjenesten kan du jo vurdere å<br/><br/>
                 <a className="button" href="https://hjelp.uib.no/tas/secure/assetmgmt/card.html?action=new&unid=new&subtype=5D377B47-0828-44B0-B091-D685B5AC0F07">Registrere en ny</a>
              </p>
            : undefined
        }

      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const services = await fetch_services();
  return {
    props: {
      services: services.map(svc => (
        {
          id: svc.id,
          short_name: svc.short_name,
          name: svc.name,
          lifecycle: svc.lifecycle,
          search_body: [
            svc.asset_name,
            svc.name,
            svc.description,
            svc.internal_notes,
            svc.owner,
            svc.supplier,
            ...svc.refs.map(r => r.href),
            ...svc.people.map(p => p.person),
          ].join('\n').toLowerCase(),
        }
      )),
      synced_date: services.map(svc => svc.meta.sdate).reduce((p,c) => p < c ? p : c, 'na').substr(0, 16).replace('T', ' '),
    }
  }
}