import ReactMarkdown from "react-markdown";

export default function About() {
    return (
        <article>
            <ReactMarkdown>
            {`
## Om Tjenester

Dette nettstedet gir en oversikt over IT-tjenestene ved Universitetet i Bergen.

Vi skiller mellom *tjeneste&shy;katalogen* som er en oversikt over tjenestene som
tilbys og kan tas i bruk, og *tjeneste&shy;porteføljen* som også inneholder tjenester
som er planlagt, under utvikling eller tjenester som nå er faset ut og avviklet.
Det er nyttig for universitetet å ha god kvalitet i denne oversikten for styring
og effektiv drift.

Hva er nå en *tjeneste* og da særlig en *IT-tjeneste*? Dette er jo et ord som vi
bruker i dagligtalen og alle synes å forstå, men i sammenhenger som denne så bør
vi ha en mer presis definisjon av hva vi mener. Dette blir litt abstrakt, men
...

> Vi *definerer en tjeneste* som en *navngitt enhet av noe* som tilbys av *noen* og som *andre* kan benytte i et tidsrom for å oppnå en ønsket effekt. Den som tilbyr tjenesten kalles *tjenesteyter*. Den andre parten kalles *bruker*. Det foreligger en eksplisitt eller underforstått avtale om betingelser for bruk og om kvaliteten i tjenesten. Et annet viktig aspekt ved tjenester er at brukeren skjermes for kompleksitet, kunnskap, usikkerhet og spesifikke kostnader ved å frembringe tjenesten.
>
> En *IT-tjeneste* er en tjeneste hvor *IT-teknologi inngår* som den viktigste delen av grensesnittet mot brukeren eller måten den ønskede effektet frambringes.

Nesten alt som IT-avdelingen gjør er å tilby IT-tjenester, men det er også mange
andre enheter som tilbyr IT-tjenester ved universitetet, samt at vi har avtaler
om kjøp av IT-tjenester fra eksterne leverandører som kan benyttes av
universitetets ansatte og studenter. *Alle disse IT-tjenestene inngår i denne
katalogen.*

### Roller

I definisjonen over har vi nevnt to roller i forbindelse med tjenester, nemlig
*tjenesteyter* og *bruker*. Men det er mange andre begreper som brukes i denne
oversikten og generelt om tjenester som kan trenge litt mer forklaring.

Et sett med begrep man kan komme over er *produsent* og *konsument*, som jo
egentlig er teminologi fra varehandel. Hvis dette brukes er det ofte i
sammenhenger hvor man fokuserer på hvordan tjenester produseres, som f.eks.
kommer dette til uttrykk i at vi på IT-avdelingen har begynt å snakke om
produktorganisering for å fokusere på hvordan tjenesteproduksjonen skjer hos
oss. Et annen rolle som ofte kommer opp er *kunde* som alternativ til konsument.
Dette brukes når man fokuserer på hvem som betaler for tjenester og kanskje
skriver under på kontrakter om bruk. I større organisasjoner er ikke nødvendig
kunderollen sammenfallende med den som faktisk bruker tjenesten.

Ved universitetet har vi bestemt at alle tjenester skal ha formell
organisatorisk eier. Det betyr at formell leder ved utpekt enhet har rollen
*tjenesteeier* men dette omtales ofte som om at selve enheten er tjenesteeier.
Som oftest vil det være utpekt en eller flere personer ved avdelingen som i
praksis forvalter ansvaret og disse har fått rollen *tjenesteansvarlig*. (Hvis
ingen er utpekt som tjenesteansvarlig, så tilfaller den rollen tjenesteeier.
Hvis ingen er utpekt som tjenesteeier for en IT-tjeneste så tilfallen denne
rollen IT-direktøren.)

En annen viktig rolle hos tjenesteyter er *brukerstøtte* som er kontaktpunktet
for brukere som trenger hjelp til å benytte tjenesten. Vi bruker også begrepet
*forvaltingsteam* om de som i praktisk vedlikeholder og tilrettelegger for
tjenesten og som brukerstøtte vil kunne delegere problemsaker til. Vi har valgt
å representere både brukerstøtte og forvaltingsteam ved operatørgrupper i
UiBhjelp, og disse vil framkomme i denne oversikten.

Mange IT-tjenester realiseres ved hjelp av et IT-system, og det er ikke alltid
like lett å skille mellom hva som er tjenesten og hva som er systemet – og ofte
har disse til og med samme navn. Man vil ofte derfor støtte på begreper som
*systemeier* og *systemansvarlig* som egentlig brukes som synonymer for
tjenesteeier og tjenesteansvarlig. Vi prøver å bevege oss bort fra dette, med vi
har f.eks. enda
[SIP](https://regler.app.uib.no/regler/Del-4-OEkonomi-eiendom-og-IKT/4.3-Informasjons-og-kommunikasjonsteknologi/Styringssystem-for-informasjonssikkerhet-SIP-Del-1-Styrende-del/#definisjoner)
som bruker og definerer disse begrepene.

I personvernsammenheng så støter man også på de juridiske rollebegrepene
*behandlingsansvarlig* og *databehandler*. Når behandligen av personopplysninger
skjer i en tjeneste, så er dette virksomhetene som tilbyr en tjeneste og
leverandørene.

### Strukturen

Tjenesteproteføljen vedlikeholdes hos UiB som en del av "Asset
Management"-modulen i UiBhjelp. Hver tjeneste representeres med en post som
angir identifikasjon og felter som beskriver tjenesten.

Data om tjenestene er tilgjengelig i et
[API](https://api-uib.intark.uh-it.no/catalog/api/3bf4bb7a-c730-4ccf-b4bb-7ac730fccfec)
som er grunnlaget for denne katalogvisningen, men som også lett kan konsumeres
direkte f.eks. av Excel når man trenger utdrag fra porteføljen til ulike
oversikter.

            `}
            </ReactMarkdown>
        </article>
    )
}