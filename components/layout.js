import Link from "next/link";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Hjem</Link></li>
                <li><Link href="/all">Bruker&shy;tjenester</Link></li>
                <li><Link href="/team">Team</Link></li>
                <li><a href="https://tjenester.app.uib.no">Power BI</a></li>
                <li><Link href="/om">Om</Link></li>
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