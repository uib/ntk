import Link from 'next/link';
import { fetch_services } from '../utils/fetch';

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
  
export default function Service({svc}) {
  return (
      <article>
          <h1>{svc.id} {svc.name}</h1>
          <Link href="/"><a>Tilbake</a></Link>
      </article>
  );
}