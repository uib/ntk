import { fetch_services, get_service } from '../utils/fetch.js';
import { generate_badge } from '../utils/badge.js';
import fs from 'fs';

let [,,service_id] = process.argv;

if (!service_id) {
    console.log('No service ID provided. Here are the available services:');
    const services = await fetch_services();
    for (const service of services) {
        console.log(`${service.id}: ${service.name}`);
    }
    process.exit(0);
}

if (/^\d+$/.test(service_id)) {
    service_id = `TJ${service_id.padStart(4, '0')}`;
}

const service = await get_service(service_id);

if (!service) {
    console.error(`Service with id '${service_id}' not found.`);
    process.exit(1);
}

const svg = generate_badge(service);
const path = `${service.id}-badge.svg`;
fs.writeFileSync(path, svg)
console.log('Wrote badge to ', path);
