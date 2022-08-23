import Link from "next/link";

export function ServiceLink({service, fullname}) {
    let name = service.short_name;
    if (fullname && service.name != name) {
        name += ': ' + service.name;
    }
    return (
        <Link href={'/' + service.id }>
            <a>
                <code>{service.id}</code> {name}
            </a>
        </Link>
    );
}