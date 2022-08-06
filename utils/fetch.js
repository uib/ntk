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
    const after = Date.now();
    console.log(`Fetched data from tk-topdesk API in ${after - before}ms`)
    services_fetch_time = after;
    return services;
}