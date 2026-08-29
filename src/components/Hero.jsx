// Import React hooks for managing state and side effects
import { useEffect, useState } from 'react';

// Import logo for hero section 
import logo from '../assets/vertical-logo2.png';

// Import styling for hero section
import './Hero.css';


/*
    Calculate the amount of time remaining until the event
    eventDate is a Unix timestamp representing the event date/time in milliseconds
*/
function getTimeLeft(eventDate) {
  // Get the current date/time as a Unix timestamp in milliseconds
  const now = new Date().getTime();

  // Calculate the number of milliseconds remaining until the event
  const distance = eventDate - now;

  // Once the event time has passed, keep all countdown values at zero
  if (distance <= 0) {
    return {days: '00', hours: '00', minutes: '00', seconds: '00',};
  }

   /*
        Convert the remaining milliseconds into days, hours, minutes, and seconds
        padStart() ensures each value contains at least two digits (e.g., 8 becomes "08")
    */
   return {
    days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
    hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
    minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0'),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
  };
}


function Hero() {
  /*
      Set the event date/time and convert it to a Unix timestamp
      -04:00 specifies the UTC offset for Eastern Daylight Time on September 18, 2026
  */
  const eventDate = new Date('2026-09-18T08:30:00-04:00').getTime();

  /*
      Store the current countdown values in component state
      getTimeLeft() is called when the state is initially created so the countdown displays the correct values immediately
  */
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventDate));


  /*
      Start a timer that recalculates the countdown every second
      Updating timeLeft with setTimeLeft() causes React to re-render the component with the new countdown values
  */
   useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(eventDate));
    }, 1000);

    /*
        Clear the timer when the Hero component is removed to prevent the interval from continuing unnecessarily
    */
    return () => clearInterval(timer);

  }, [eventDate]);


  return (
    <section className="hero">

      {/* Left side containing event date/location and logo */}
      <div className="hero__left">
        <p className="hero__eyebrow">
          September 18, 2026 <br /> Memorial Union Ballroom
        </p>
        <img src={logo} alt="URI CS Connect Day Logo" className="hero__logo" />
      </div>

      {/* Right-side information card */}
      <div className="hero__right">
        <h1>URI CS Connect Day</h1>
        <p className="hero__description">
          URI CS Connect Day brings students, alumni, faculty, and industry partners
          together for conversations about computing careers, emerging technologies,
          recruiting, and the evolving role of AI in the workplace.
        </p>

        {/* Countdown displaying time remaining until the event */}
        <div className="countdown" aria-label="Countdown to URI CS Connect Day">
          {/* Days remaining */}
          <div className="countdown__item">
            <span aria-hidden="true">{timeLeft.days}</span>
            <p aria-hidden="true">Days</p>

            {/* Provide the complete value/label to screen readers */}
            <span className="sr-only">{timeLeft.days} days</span>
          </div>

          {/* Hours remaining */}
          <div className="countdown__item">
            <span aria-hidden="true">{timeLeft.hours}</span>
            <p aria-hidden="true">Hours</p>
            <span className="sr-only">{timeLeft.hours} hours</span>
          </div>

          {/* Minutes remaining */}
          <div className="countdown__item">
            <span aria-hidden="true">{timeLeft.minutes}</span>
            <p aria-hidden="true">Minutes</p>
            <span className="sr-only">{timeLeft.minutes} minutes</span>
          </div>

          {/* Seconds remaining */}
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

// Export the Hero component so it can be used on the Home page
export default Hero;