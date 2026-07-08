import './Footer.css';

import handshakeLogo from '../assets/socials/handshake-white.png';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="footer">

            <div className="footer__left">
                <a
                    href="https://www.uri.edu/"
                    target="_blank"
                    rel="noreferrer"
                >
                    University of Rhode Island
                </a>

                <a
                    href="https://web.uri.edu/cs/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Department of Computer Science and Statistics
                </a>
            </div>

            <div className="footer__right">

                <a 
                    href="https://app.joinhandshake.com/stu/events/1957249" 
                    aria-label="Handshake URI CS Connect Day Event"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={handshakeLogo} alt="Handshake" />
                </a>

                <a
                    href="https://www.facebook.com/uri.ccee/"
                    aria-label="URI CCEE Facebook"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaFacebookF />
                </a>

                <a
                    href="https://www.instagram.com/uriccee/"
                    aria-label="URI CCEE Instagram"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://x.com/URICCEE"
                    aria-label="URI CCEE X"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaXTwitter />
                </a>

            </div>

        </footer>
    );
}

export default Footer;