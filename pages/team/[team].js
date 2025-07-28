import Link from 'next/link';
import { ServiceLink } from '../../components/servicelink';
import { services_by_team } from '../../utils/fetch';

export default function Team({team_name, services}) {
    return (
        <div>
            { team_name ? <h1>Tjenestene til forvalter<br/>{team_name} ({services.length})</h1>
                        : <h1>Tjenester som mangler forvalter ({services.length})</h1>
            }
            <table>
              <thead>
              <tr>
                <td></td>
                <td>BS</td>
                <td>FF</td>
                <td>TF</td>
              </tr>
              </thead>
              <tbody>
            { services.map(svc =>
              <tr key="svc.unid">
                <td><ServiceLink service={svc} fullname /></td>
                <td>{team_name && svc.operatorgroup_firstline  === team_name ? "☑️" : (svc.operatorgroup_firstline  ? "⬜️" : "➖")}</td>
                <td>{team_name && svc.operatorgroup_secondline === team_name ? "☑️" : (svc.operatorgroup_secondline ? "⬜️" : "➖")}</td>
                <td>{team_name && svc.operatorgroup_thirdline  === team_name ? "☑️" : (svc.operatorgroup_thirdline  ? "⬜️" : "➖")}</td>
              </tr>)
            }
              </tbody>
            </table>
            <p><Link href="/team" className="button">Tilbake til forvalteroversikten</Link></p>
        </div>
    );
}

export async function getStaticPaths() {
    const team_svcs = await services_by_team();
    return {
        paths: [...team_svcs.keys()].map(team => ({params: { team }})),
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context) {
    const team_svcs = await services_by_team();
    const svcs = team_svcs.get(context.params.team);
    return {
        props: {
            team_name: svcs.name,
            team_slug: context.params.team,
            services: svcs.services,
        }
    };
}
