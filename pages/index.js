import Head from 'next/head'
import Link from 'next/link'
import { ServiceLink } from '../components/servicelink'
import styles from '../styles/Home.module.css'
import { fetch_services } from '../utils/fetch'

export default function Home({services, synced_date}) {
  return (
    <>
      <Head>
        <title>UiBs tjenesteportefølje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1>UiBs tjeneste&shy;portefølje ({services.length})</h1>
        <ul className={styles.serviceList}>
        { services.map(svc =>
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
      services: services.map(({id, short_name, name, lifecycle}) => ({id, short_name, name, lifecycle})),
      synced_date: services.map(svc => svc.meta.sdate).reduce((p,c) => p < c ? p : c, 'na').substr(0, 16).replace('T', ' '),
    }
  }
}