import Hero from '../components/Hero';
import AgendaHighlights from '../components/AgendaHighlights';
import PartnerSection from '../components/PartnerSection';
import RegisterSection from '../components/RegisterSection';

function Home() {
  return (
    <main id="main-content">
      <Hero />
      <AgendaHighlights />
      <RegisterSection />
      <PartnerSection />
    </main>
  );
}

export default Home;