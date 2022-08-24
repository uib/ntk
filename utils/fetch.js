let services = null;
let services_fetch_time = null;

export async function fetch_services() {
    if (services) {
        const age = Date.now() - services_fetch_time;
        console.log(`Returning services from cache with age=${age/1000}s`)
        return services;
    }
    const before = Date.now();
    const res = await fetch('https://gw-uib.intark.uh-it.no/tk-topdesk/svc.json?app=nexttk');
    services = await res.json();
    services = services.filter(svc => !svc.meta.archived);
    const after = Date.now();
    console.log(`Fetched data from tk-topdesk API in ${after - before}ms`)
    services_fetch_time = after;
    return services;
}

export async function services_by_team() {
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

export function team_slug(team_name) {
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