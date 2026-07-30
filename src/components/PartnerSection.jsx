import { Link } from 'react-router-dom';
import './PartnerSection.css';

import fidelityLogo from '../assets/partner-logos/fidelity.png';
import schneiderLogo from '../assets/partner-logos/schneider.png';
import databricksLogo from '../assets/partner-logos/databricks.png';
import dfcscLogo from '../assets/partner-logos/dfcsc.webp';


const partners = [
    {
        name: "Fidelity",
        logo: fidelityLogo,
        url: "https://students.fidelitycareers.com/"
    },
    {
        name: "Schneider Electric",
        logo: schneiderLogo,
        url: "https://careers.se.com/united-states"
    },
    {
        name: "Databricks",
        logo: databricksLogo,
        url: "https://www.databricks.com/"
    },
    {
        name: "URI’s Digital Forensics & Cyber Security Center",
        logo: dfcscLogo,
        url: "https://web.uri.edu/cs/dfcsc/"
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

        <Link to="/partner-with-us" className="partners__button">
          Partner With Us
        </Link>
      </div>

      <div className="partners__grid">
        {partners.map((partner) => (
          <div className="partner-card" key={partner.name}>
            <div className="partner-card__logo">
                {partner.logo ? (
                    <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={'Visit ${partner.name}'}
                    >
                        <img
                            src={partner.logo}
                            alt=""
                            className="partner-logo"
                        />
                        <span className="sr-only">{partner.name}</span>
                    </a>
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