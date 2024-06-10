import Head from 'next/head'
import Link from 'next/link'
import { ServiceLink } from '../components/servicelink'
import styles from '../styles/Domain.module.css'
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
            <details key={domain.name} className={styles.domain} open={domain.refs.length < 3}>
              <summary>{domain.name} { domain.refs.length > 2 ? <span className={styles.count}>({domain.refs.length})</span> : undefined }</summary>
              <table>
                <tbody>
                {
                  domain.refs.map(ref =>
                    <tr key={ref.id + '-' + ref.href}>
                      <td>
                        <Link href={ref.href}>
                          <FontAwesomeIcon icon={faSquareArrowUpRight} />&nbsp;
                          {ref.href_key}
                        </Link>
                      </td>
                      <td>
                        <ServiceLink service={ref} />
                      </td>
                    </tr>
                  )
                }
                </tbody>
              </table>
            </details>
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
    if (svc.id == "TJ0303") continue;
    for (const ref of svc.refs) {
      if (ref.type == "Produksjonsmiljø" && ref.href) {
        let schemeless = ref.href.replace(/^(ssh|ldap|http)s?:\/\//, "");
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