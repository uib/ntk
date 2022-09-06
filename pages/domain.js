import Head from 'next/head'
import Link from 'next/link'
import { ServiceLink } from '../components/servicelink'
import styles from '../styles/Home.module.css'
import { fetch_services } from '../utils/fetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';

export default function Domain({domains}) {
  
  return (
    <>
      <Head>
        <title>UiBs tjenestekatalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        {
          domains.map(domain =>
            <div key={domain.name}>
              <h2>{domain.name}</h2>
              <table>
              {
                domain.refs.map(ref =>
                  <tr key={ref.href}>
                    <td>
                      <Link href={ref.href}>
                        <a>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />&nbsp;
                        {ref.href_key}
                        </a>
                      </Link>
                    </td>
                    <td>
                      <ServiceLink service={ref} />
                    </td>
                  </tr>
                )
              } 
              </table>
            </div>
          )
        }
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const services = await fetch_services();

  let prod_refs = [];
  for (const svc of services) {
    for (const ref of svc.refs) {
      if (ref.type == "Produksjonsmiljø") {
        let schemeless = ref.href.replace(/^(ldap|http)s?:\/\//, "");
        let [host, path] = schemeless.split('/', 2);
        let host_lst = host.split('.');
        let topdomain = [host_lst.pop(), host_lst.pop()].reverse().join('.');
        let key = host_lst.join('.');
        if (!key) {
          key = '...';
        }
        if (path) {
          const maxpath = 8;
          key += '/' + path.substr(0, maxpath);
          if (path.length > maxpath) {
            key += '...';
          }
        }
        prod_refs.push({
          domain: topdomain,
          href_key: key,
          href: ref.href,
          id: svc.id,
          unid: svc.unid,
          short_name: svc.short_name,
          name: svc.name,
          type: svc.servicetype,
          criticality: svc.criticality,
          lifecycle: svc.lifecycle,
        })
      }
    }
  }
  prod_refs = prod_refs
    .sort((a, b) => (-(a.domain == 'uib.no') + (b.domain == 'uib.no')) ||
                    a.domain.localeCompare(b.domain, 'nb') ||
                    a.href_key.localeCompare(b.href_key, 'nb'));

  let domains = [];
  for (const ref of prod_refs) {
    if (domains.length == 0 || domains[domains.length-1].name != ref.domain) {
      domains.push({
        name: ref.domain,
        refs: [],
      });
    }
    domains[domains.length-1].refs.push(ref);
  }

  return {
    props: { domains }
  }
}