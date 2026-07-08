import './AgendaHighlights.css';

const agendaItems = [
  {
    time: '9:00 AM – 9:10 AM',
    title: 'Welcome Address',
    location: 'Memorial Union Ballroom',
    description:
      'Opening remarks from URI leadership welcoming students, alumni, faculty, and industry partners.',
    featured: 'Department Chair • Dean',
  },
  {
    time: '9:10 AM – 10:00 AM',
    title: 'Keynote Address',
    location: 'Memorial Union Ballroom',
    description:
      'An invited speaker shares industry insight on computing careers, AI, and emerging opportunities.',
    featured: 'Invited Keynote Speaker',
  },
  {
    time: '10:00 AM – 12:30 PM',
    title: 'Panels',
    location: 'Memorial Union Ballroom',
    description:
      'Employers and alumni discuss recruiting, interviews, AI in hiring, and career pathways.',
    featured: 'Industry Partners • Alumni',
  },
  {
    time: '12:30 PM – 1:50 PM',
    title: 'Networking Lunch',
    location: 'Atrium 1',
    description:
      'Students connect with employers, alumni, faculty, and graduate program representatives.',
    featured: 'Featured Employers',
  },
  {
    time: '2:00 PM – 5:00 PM',
    title: 'Workshops',
    location: 'Bliss & Fascitelli Center for Advanced Engineering',
    description:
      'Hands-on sessions focused on technical interview preparation, AI tools, cloud deployment, and emerging technologies.',
    featured: 'AI • MLOps • Cloud • Career Prep',
  },
];

function AgendaHighlights() {
  return (
    <section className="agenda-highlights">
      <div className="agenda-highlights__header">
        <div>
          <p className="section-eyebrow">Agenda Highlights</p>
          <h2>A full day of connection, insight, and career preparation.</h2>
        </div>

        <a href="/" className="agenda-highlights__button">
          View Full Agenda
        </a>
      </div>

      <div className="timeline">
        {agendaItems.map((item, index) => (
          <article className="timeline__item" key={index}>
            <div className="timeline__marker">
              <span></span>
            </div>

            <div className="timeline__card">
              <div className="timeline__time">{item.time}</div>

              <div className="timeline__content">
                <div>
                  <h3>{item.title}</h3>
                  <p className="timeline__location">{item.location}</p>
                </div>

                <div>
                  <p className="timeline__description">{item.description}</p>
                  <p className="timeline__featured">{item.featured}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AgendaHighlights;