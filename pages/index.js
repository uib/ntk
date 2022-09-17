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
        />
        <h1>UiBs tjeneste&shy;portefølje ({filtered_services.length}{filter_lc ? ` med "${filter}"` : undefined})</h1>
        <ul className={styles.serviceList}>
        { filtered_services.map(svc =>
            <li key={svc.id}>
              <ServiceLink service={svc} />
            </li>)
        }
        </ul>
        <p><em>Data hentet fra UiBhjelp {synced_date}Z</em></p>
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
            svc.id,
            svc.asset_name,
            svc.name,
            svc.description
          ].join('\n').toLowerCase(),
        }
      )),
      synced_date: services.map(svc => svc.meta.sdate).reduce((p,c) => p < c ? p : c, 'na').substr(0, 16).replace('T', ' '),
    }
  }
}