import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { fetch_services } from '../utils/fetch'
import { useState } from 'react'

export default function Home({services}) {
  const [filter, setFilter] = useState({
    "Digitale forskningstjenester": true,
    "Utdanningstjenester": false,
    "Administrasjon og formidling": false,
  });
  const filtered_services = services.filter(svc => filter[svc.business_domain]);

  return (
    <>
      <Head>
        <title>UiBs tjenestekatalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1>UiBs katalog over tilbudte bruker&shy;tjenester ({filtered_services.length})</h1>
        { Object.keys(filter).map(k =>
        <label key={k}>
          <input
            type="checkbox"
            checked={filter[k]}
            onChange={() => setFilter(prev => ({...prev, [k]: !prev[k]})) }
          /> {k}
        </label>
        )
        }
        <div className={styles.serviceContainer}>
        { filtered_services.map(svc =>
            <Link href={'/' + svc.id} key={svc.id}>
              <code>{svc.id}</code>
              <h3>{svc.name}</h3>
              <p>{svc.description}</p>
            </Link>)
        }
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const services = await fetch_services();
  return {
    props: {
      services: services
        .filter(svc => svc.lifecycle.match(/^[23] -/) && svc.servicetype == "Brukertjeneste")
        .sort((a, b) => (a.name || a.short_name).toLowerCase().localeCompare((b.name || b.short_name).toLowerCase(), 'nb'))
        .map(({id, short_name, name, description, business_domain}) => ({id, short_name, name, description, business_domain}))
    }
  }
}