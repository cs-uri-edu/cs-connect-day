import './PartnerSection.css';

import fidelityLogo from '../assets/partner-logos/fidelity.png';
import dfcscLogo from '../assets/partner-logos/dfcsc.webp';


const partners = [
    {
        name: "Fidelity",
        logo: fidelityLogo,
        url: "https://www.fidelity.com"
    },
    {
        name: "URI’s Digital Forensics & Cyber Security Center",
        logo: dfcscLogo,
        url: "https://web.uri.edu/cs/dfcsc/"
    },
    {
        name: "TBD",
        logo: null,
        url: "TBD"
    },
    {
        name: "TBD",
        logo: null,
        url: "TBD"
    },
    {
        name: "TBD",
        logo: null,
        url: "TBD"
    },
    {
        name: "TBD",
        logo: null,
        url: "TBD"
    },
    {
        name: "TBD",
        logo: null,
        url: "TBD"
    },
    {
        name: "TBD",
        logo: null,
        url: "TBD"
    }
];


function PartnerSection() {
  return (
    <section className="partners">
      <div className="partners__header">
        <div>
            <p className="section-eyebrow">Industry Partners</p>
            <h2>Connect with employers, alumni, and technology leaders.</h2>
        </div>

        <a href="/" className="partners__button">
          Partner With Us
        </a>
      </div>

      <div className="partners__grid">
        {partners.map((partner) => (
          <div className="partner-card" key={partner.name}>
            <div className="partner-card__logo">
                {partner.logo ? (
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        className="partner-logo"
                    />
                ) : (
                    <span><strong>{partner.name}</strong></span>
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnerSection;