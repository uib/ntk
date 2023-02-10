import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { fetch_services } from '../utils/fetch'

export default function Home({services}) {
  return (
    <>
      <Head>
        <title>UiBs tjenestekatalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1>UiBs katalog over aktive bruker&shy;tjenester ({services.length})</h1>
        <div className={styles.serviceContainer}>
        { services.map(svc =>
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
        .filter(svc => svc.lifecycle.match(/^[23]-/) && svc.servicetype == "Bruker-tjeneste")
        .sort((a, b) => (a.name || a.short_name).toLowerCase().localeCompare((b.name || b.short_name).toLowerCase(), 'nb'))
        .map(({id, short_name, name, description}) => ({id, short_name, name, description}))
    }
  }
}