import { ServiceLink } from '../../components/servicelink';
import { fetch_services } from '../../utils/fetch';

export default function Team({team_name, services}) {
    return (
        <div>
            <h1>Team {team_name} ({services.length})</h1>
            <ul>
            { services.map(svc => <li key="svc.unid"><ServiceLink service={svc} fullname /></li>) }
            </ul>
        </div>
    );
}

function team_slug(team_name) {
    return String(team_name).
        toLowerCase().
        replaceAll('/', '-').
        replaceAll('(', '').
        replaceAll(')', '').
        replaceAll('æ', 'ae').
        replaceAll('ø', 'o').
        replaceAll('å', 'a').
        replace(/\s+/g, '-').
        replace(/-+/g, '-');
}

async function services_by_team() {
    const services = await fetch_services();
    let res = new Map();
    for (const svc of services) {
        const team = team_slug(svc.operatorgroup_secondline);
        if (!res.has(team)) {
            res.set(team, []);
        }
        res.get(team).push(svc);
    }
    return res;
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