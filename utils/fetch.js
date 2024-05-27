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
        const team2 = team_slug(svc.operatorgroup_secondline);
        const team3 = team_slug(svc.operatorgroup_thirdline);
        if (!res.has(team2)) {
            res.set(team2, {name: svc.operatorgroup_secondline, services: []});
        }
        if (!res.has(team3)) {
            res.set(team3, {name: svc.operatorgroup_thirdline, services: []});
        }
        res.get(team2).services.push(svc);
        if (team2 != team3 && team3 != "null")
            res.get(team3).services.push(svc);
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