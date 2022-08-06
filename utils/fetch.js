export async function fetch_services() {
    const res = await fetch('https://gw-uib.intark.uh-it.no/tk-topdesk/svc.json?app=nexttk');
    const services = await res.json();
    return services;
}