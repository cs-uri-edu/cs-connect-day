// Import Link for client-side navigation to the Program page
import { Link } from 'react-router-dom';

// Import agenda highlights styling
import './AgendaHighlights.css';


// Array of objects containing the content for each agenda highlight
const agendaItems = [
  {
    time: '9:00 AM – 9:10 AM',
    title: 'Welcome Address',
    location: 'Memorial Union Ballroom',
    description:
      'Opening remarks from URI academic leadership welcoming students, alumni, faculty, and invited guests.',
  },
  {
    time: '9:10 AM – 10:00 AM',
    title: 'Fireside Chat',
    subtitle: 'Computing in the Age of AI',
    location: 'Memorial Union Ballroom',
    description:
      'An interactive conversation with Dr. Michael L. Littman exploring the future of artificial intelligence, how AI is reshaping computing and computer science education, and what these changes mean for students preparing for careers in technology.',
  },
  {
    time: '10:00 AM – 11:00 AM',
    title: 'Industry Panel',
    subtitle: 'How AI Is Reshaping Hiring & Tech Workforce',
    location: 'Memorial Union Ballroom',
    description:
      'Industry leaders discuss how AI is changing recruiting, technical roles, and the skills and experiences employers value as students prepare to enter an evolving technology workforce.',
  },
  {
    time: '11:15 AM – 12:15 PM',
    title: 'Alumni Roundtable',
    subtitle: 'From URI To Industry',
    location: 'Memorial Union Ballroom',
    description:
      'URI CS alumni share their paths from college to industry, career growth, and lessons learned along the way.',
  },
  {
    time: '12:30 PM – 1:50 PM',
    title: 'Networking Lunch',
    location: 'Memorial Union Lounge',
    description:
      'Students connect with employers, alumni, faculty, and graduate program representatives.',
  },
  {
    time: '2:00 PM – 5:00 PM',
    title: 'Workshops',
    location: 'Bliss & Fascitelli Center for Advanced Engineering',
    description:
      'Hands-on sessions focused on AI and data tools, cloud technologies, and emerging industry practices.',
  },
];


function AgendaHighlights() {
  return (
    <section className="agenda-highlights" aria-labelledby="agenda-highlights-heading">

      {/* Agenda highlights header and button to program page */}
      <div className="agenda-highlights__header">
        <div>
          <p className="section-eyebrow">Agenda Highlights</p>
          <h2 id="agenda-highlights-heading">A full day of connection, insight, and career preparation.</h2>
        </div>

        <Link to="/program" className="agenda-highlights__button">
          View Full Program
        </Link>
      </div>

      {/* Timeline containing all agenda highlight cards */}
      <div className="timeline">

        {/* Loop through agendaItems and create one timeline card for each session */}
        {agendaItems.map((item) => (
          <article className="timeline__item" key={item.title}>
            <div className="timeline__marker" aria-hidden="true">
              <span></span>
            </div>

            <div className="timeline__card">
              <div className="timeline__time">{item.time}</div>

              <div className="timeline__content">
                <div>
                  <h3>{item.title}</h3>
                  {item.subtitle && (<p className="timeline__subtitle">{item.subtitle}</p>)}
                  <p className="timeline__location">{item.location}</p>
                </div>

                <div>
                  <p className="timeline__description">{item.description}</p>
                  {item.featuredLines && (
                    <div className="timeline__featured">
                      {item.featuredLines.map((line, lineIndex) => (
                        <p className="timeline__featured-line" key={lineIndex}>
                          {typeof line === 'string' ? (line) : (
                            <>
                              <span className="timeline__featured-label">
                                {line.label}:
                              </span>{' '}
                              {line.text}
                            </>
                          )}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Export the Agenda Highlights component so it can be used on the Home page
export default AgendaHighlights;