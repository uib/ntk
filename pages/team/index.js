import { services_by_team, team_slug } from '../../utils/fetch';
import Link from 'next/link';

export default function Teams({teams}) {
    return (
        <div>
            <h1>Forvaltingsteam med tjenester</h1>
            <ul>
                {teams.map(t => <li key={t.slug}><Link href={"/team/" + t.slug}>{t.name} ({t.count})</Link></li>)}
            </ul>
        </div>
    );
}


export async function getStaticProps(context) {
    const team_svcs = await services_by_team();
    let teams = [];
    for (const t of team_svcs.entries()) {
        teams.push(
            {
                slug: t[0],
                name: t[1][0].operatorgroup_secondline ?? "⚠︎ Tjenester som mangler forvaltingsteam",
                count: t[1].length,
            }
        )
    }    
    teams = teams.sort((a,b) => a.name.localeCompare(b.name));
    return {
        props: { teams },
    };
}

