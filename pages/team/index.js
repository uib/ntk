import { services_by_team, team_slug } from '../../utils/fetch';
import Link from 'next/link';
import styles from '../../styles/Team.module.css';

export default function Teams({teams}) {
    return (
        <article>
            <h1>Forvaltere med tjenester</h1>
            <p>Vi bruker operatørgrupper i UiBhjelp til å peke ut de som har ansvar for å
                forvalte tjenestene. Lenkene under går til sider som lister opp tjeneste som hører
                under hvert enkel forvalter.
            </p>
            <table className={styles.teamTable}>
                <thead>
                <tr><th>Forvalter</th><th>Antall tjenester</th></tr>
                </thead>
                <tbody>
{teams.map(t => <tr key={t.slug}><td><Link href={"/team/" + t.slug}>{t.name}</Link></td><td>{t.count}</td></tr>)}
                </tbody>
            </table>
        </article>
    );
}


export async function getStaticProps(context) {
    const team_svcs = await services_by_team();
    let teams = [];
    for (const t of team_svcs.entries()) {
        teams.push(
            {
                slug: t[0],
                name: t[1].name ?? "⚠︎ Tjenester som mangler forvalter",
                count: t[1].services.length,
            }
        )
    }    
    teams = teams.sort((a,b) => a.name.localeCompare(b.name));
    return {
        props: { teams },
    };
}

