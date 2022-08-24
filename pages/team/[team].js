import Link from 'next/link';
import { ServiceLink } from '../../components/servicelink';
import { services_by_team } from '../../utils/fetch';

export default function Team({team_name, services}) {
    return (
        <div>
            <h1>Tjenestene til team<br/>{team_name} ({services.length})</h1>
            <ul>
            { services.map(svc => <li key="svc.unid"><ServiceLink service={svc} fullname /></li>) }
            </ul>
            <p><Link href="/team"><a className="backlink">Tilbake til team-listen</a></Link></p>
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
            team_name: svcs[0].operatorgroup_secondline,
            team_slug: context.params.team,
            services: svcs,
        }
    };
}