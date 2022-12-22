import Link from "next/link";
import styles from '../styles/Home.module.css'

export function ServiceLink({service, fullname}) {
    let name = service.short_name;
    if (fullname && service.name != name) {
        name += ': ' + service.name;
    }
    return (
        <Link href={'/' + service.id }
              className={styles['lifecycle-' + service.lifecycle.substr(0, 1)] + ' ' + styles.servicelink}
              title={(!fullname && service.name != service.short_name) ? service.name : undefined}
        >
            <code>{service.id}</code> {name}
        </Link>
    );
}