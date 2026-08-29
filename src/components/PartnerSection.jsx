// Import Link for client-side navigation to the Partner With Us page
import { Link } from 'react-router-dom';

// Import participating organizations section styling
import './PartnerSection.css';

// Import logos for participating organizations
import algoarenaLogo from '../assets/partner-logos/algoarena.png';
import axialLogo from '../assets/partner-logos/axialsearch.png';
import brownLogo from '../assets/partner-logos/brown.png';
import codepathLogo from '../assets/partner-logos/codepath.png';
import databricksLogo from '../assets/partner-logos/databricks.png';
import electricLogo from '../assets/partner-logos/electricboat.png';
import fidelityLogo from '../assets/partner-logos/fidelity.png';
import schneiderLogo from '../assets/partner-logos/schneider.png';
import dfcscLogo from '../assets/partner-logos/dfcsc.webp';


// Import logos for participating organizations
const partners = [
    {
        name: "AlgoArena",
        logo: algoarenaLogo,
        url: "https://algoarena.net/"
    },
    {
        name: "Axial Search",
        logo: axialLogo,
        url: "https://axialsearch.com/"
    },
    {
        name: "Brown University",
        logo: brownLogo,
        url: "https://cs.brown.edu/"
    },
    {
        name: "Codepath",
        logo: codepathLogo,
        url: "https://www.codepath.org/"
    },
    {
        name: "Databricks",
        logo: databricksLogo,
        url: "https://www.databricks.com/"
    },
    {
        name: "Electric Boat",
        logo: electricLogo,
        url: "https://www.gdeb.com/"
    },
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
        name: "URI’s Digital Forensics & Cyber Security Center",
        logo: dfcscLogo,
        url: "https://web.uri.edu/cs/dfcsc/"
    }
];


function PartnerSection() {
  return (
    <section className="partners" aria-labelledby="partners-heading">
      <div className="partners__header">
        <div>
            <p className="section-eyebrow">Participating Organizations</p>
            <h2 id="partners-heading">Connect with the organizations joining us for CS Connect Day.</h2>
        </div>

        {/* Link to information for organizations interested in partnering with the event */}
        <Link to="/partner-with-us" className="partners__button">
          Partner With Us
        </Link>
      </div>

      {/* Grid of participating organization logos */}
      <div className="partners__grid">
        
        {/* Create one logo card for each organization in the partners array */}
        {partners.map((partner) => (
          <div className="partner-card" key={partner.name}>

            {/* Display the linked logo when available, otherwise display the organization name */}
            <div className="partner-card__logo">
                {partner.logo ? (
                    <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`Visit ${partner.name}`}
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