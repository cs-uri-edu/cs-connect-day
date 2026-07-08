import Hero from '../components/Hero';
import AgendaHighlights from '../components/AgendaHighlights';
import PartnerSection from '../components/PartnerSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <main>
      <Hero />
      <AgendaHighlights />
      <PartnerSection />
    </main>
  );
}

export default Home;