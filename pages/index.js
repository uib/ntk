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
        <ul>
        { services.map(svc => <li key={svc.id}><Link href={'/' + svc.id}><a>{svc.asset_name}</a></Link></li>) }
        </ul>
      </main>

      <footer className={styles.footer}>
        Universitetet i Bergen
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const services = await fetch_services();
  return {
    props: { services: services.map(({id, asset_name}) => ({id, asset_name})) }
  }
}