import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { fetch_services } from '../utils/fetch'

export default function Home({services}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>UiBs tjenesteportefølje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>UiBs tjenesteportefølje</h1>
        <ul className={styles.serviceList}>
        { services.map(svc => <li key={svc.id}><Link href={'/' + svc.id}><a><span className={styles.serviceId}>{svc.id}</span> {svc.short_name}</a></Link></li>) }
        </ul>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.uib.no">Universitetet i Bergen</a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const services = await fetch_services();
  return {
    props: { services: services.map(({id, short_name}) => ({id, short_name})) }
  }
}