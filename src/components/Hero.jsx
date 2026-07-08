import { useEffect, useState } from 'react';
import logo from '../assets/vertical-logo.png';
import './Hero.css';

function Hero() {
  const eventDate = new Date('September 18, 2026 08:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }

    return {
      days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero__left">
        <p className="hero__eyebrow">
          September 18, 2026 <br /> Memorial Union Ballroom
        </p>

        <img src={logo} alt="URI CS Connect Day Logo" className="hero__logo" />
      </div>

      <div className="hero__right">
        <h1>URI CS Connect Day</h1>

        <p className="hero__description">
          URI CS Connect Day brings students, alumni, faculty, and industry partners
          together for conversations about computing careers, emerging technologies,
          recruiting, and the evolving role of AI in the workplace.
        </p>

        <div className="countdown" aria-label="Countdown to URI CS Connect Day">
          <div className="countdown__item">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>

          <div className="countdown__item">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>

          <div className="countdown__item">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>

          <div className="countdown__item">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;