import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default function Links() {
  const md = `
  Nyttige lenker
  ===================================

  - **[epost]**
  - **[kalender]**
  - **[1password]**
  - **[Objectnet Slack]**
  - **[Knowit Slack]**
  - **[Timeføring]**
  - **[Utlegg]**
  - **[CVPartner]**
  - **[Simployer]**
  - **[Seatit]**
  - **[Objectnet på Sharepoint]**
  - **[Objectnet fag på Sharepoint]**
  - **[Helpit]**
  - **[Firmahytter]**
  - **[OKR]**
  - **[Kompetansekartlegging]**
  - **[Personalhåndbok]**
  - **[Hva Skjer]**
  - **[github - Objectnet]**
  - **[github - Knowit]**
  - **[Kantine]**
  - **[Forsikring]**
  - **[Eyr]**

  [epost]: http://epost.knowit.no/
  [kalender]: http://kalender.knowit.no/
  [1password]: https://knowit.1password.eu
  [Objectnet Slack]: https://knowitobjectnet.slack.com/
  [Knowit Slack]: https://knowit.slack.com/signup
  [Timeføring]: https://timer.knowit.no/
  [Utlegg]: https://knowit.unit4cloud.no/
  [CVPartner]: https://cv.knowit.no/
  [Simployer]: https://my.simployer.com/       
  [Seatit]: https://seatit.knowit.no/
  [Objectnet på Sharepoint]: https://knowit.sharepoint.com/sites/Org-320-internal
  [Objectnet fag på Sharepoint]: https://knowit.sharepoint.com/sites/Local-320-fagrommet
  [Helpit]: https://helpit.knowit.se/
  [Firmahytter]: https://booking.minfirmahytte.no/vacation-rentals
  [OKR]: https://okr.knowit.no/knowit-objectnet/
  [Kompetansekartlegging]: https://kompetanse.knowit.no/
  [Personalhåndbok]: https://handbooks.simployer.com/nb-no/handbook/104949
  [Hva Skjer]: https://hvaskjer.knowit.no/
  [github - Objectnet]: https://github.com/Knowit-Objectnet
  [github - Knowit]: https://github.com/knowit
  [Kantine]: https://tullin.munu.shop/
  [Forsikring]: https://www.gjensidige.no/
  [Eyr]: https://eyr.md/no/
  `
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(md)) }}
    ></div>
  )
}
