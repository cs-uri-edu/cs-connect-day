import { useEffect, useState } from 'react';
import logo from '../assets/vertical-logo2.png';
import './Hero.css';

function getTimeLeft(eventDate) {
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

function Hero() {
  const eventDate = new Date('2026-09-18T08:30:00-04:00').getTime();

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

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
            <span aria-hidden="true">{timeLeft.days}</span>
            <p aria-hidden="true">Days</p>
            <span className="sr-only">{timeLeft.days} days</span>
          </div>

          <div className="countdown__item">
            <span aria-hidden="true">{timeLeft.hours}</span>
            <p aria-hidden="true">Hours</p>
            <span className="sr-only">{timeLeft.hours} hours</span>
          </div>

          <div className="countdown__item">
            <span aria-hidden="true">{timeLeft.minutes}</span>
            <p aria-hidden="true">Minutes</p>
            <span className="sr-only">{timeLeft.minutes} minutes</span>
          </div>

          <div className="countdown__item">
            <span aria-hidden="true">{timeLeft.seconds}</span>
            <p aria-hidden="true">Seconds</p>
            <span className="sr-only">{timeLeft.seconds} seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;