import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
    const router = useRouter();
    return (
        <nav>
            <ul>
                <li><Link href="/"><img src="/logo.svg" alt="Hjem" className="logo" /></Link></li>
                <li className={router.pathname == "/" ? "active" : ""}><Link href="/">Porte&shy;føljen</Link></li>
                <li className={router.pathname == "/all" ? "active" : ""}><Link href="/all">Bruker&shy;tjenester</Link></li>
                <li className={router.pathname == "/domain" ? "active" : ""}><Link href="/domain">Domene&shy;navn</Link></li>
                <li className={router.pathname == "/team" ? "active" : ""}><Link href="/team">Forvaltere</Link></li>
                <li><a href="https://tjenester.app.uib.no">Power BI</a></li>
                <li className={router.pathname == "/om" ? "active" : ""}><Link href="/om">Om</Link></li>
            </ul>
        </nav>
    );
}

function Footer() {
    return <footer><a href="https://www.uib.no">Universitetet i Bergen</a></footer>;
}

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
