import './Footer.css';

import handshakeLogo from '../assets/socials/handshake-white.png';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">

                <div className="footer__column">
                    <h2>Event</h2>

                    <p>September 18, 2026</p>
                    <p>Memorial Union Ballroom, 50 Lower College Rd, Kingston, RI 02881</p>
                    <a href="mailto:kathryn_vani@uri.edu">kathryn_vani@uri.edu</a>
                </div>

                <div className="footer__column">
                    <h2>Department</h2>

                    <a href="https://web.uri.edu/cs/" target="_blank" rel="noreferrer">
                        Department of Computer Science and Statistics
                    </a>

                    <a href="https://career.uri.edu/" target="_blank" rel="noreferrer">
                        Career Center for Experiential Education
                    </a>

                </div>

                <div className="footer__column footer__column--social">
                    <h2>Connect</h2>

                    <div className="footer__socials">
                        <a href="https://app.joinhandshake.com/stu/events/1957249" aria-label="Handshake URI CS Connect Day Event" target="_blank" rel="noreferrer">
                            <img src={handshakeLogo} alt="Handshake" />
                        </a>

                        <a href="https://www.facebook.com/uri.ccee/" aria-label="URI CCEE Facebook" target="_blank" rel="noreferrer">
                            <FaFacebookF />
                        </a>

                        <a href="https://www.instagram.com/uriccee/" aria-label="URI CCEE Instagram" target="_blank" rel="noreferrer">
                            <FaInstagram />
                        </a>

                        <a href="https://www.linkedin.com/company/uri-ccee/posts/?feedView=all" aria-label="URI CCEE Linkedin" target="_blank" rel="noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

            </div>

            <div className="footer__bottom">
                <p>© 2026 URI CS Connect Day</p>
            </div>
        </footer>
    );
}

export default Footer;