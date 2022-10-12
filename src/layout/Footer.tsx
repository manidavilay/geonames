import { IoLogoLinkedin, IoIosLink } from "react-icons/io";
import "./Footer.scss";

const Footer = () => {
  return (
        <footer className="footer">
            <div className="footer__top">
                <p>
                    This website was made by<a href="https://manidavilay.com" target="_blank" rel="noreferrer" className="footer__link">Manida VILAY</a>, a french frontend developer in
                    order to practise and earn experience in React|TypeScript. 
                </p>
                <p>
                    Feel free to check her personal website or linkedin below
                </p>
                <div className="footer__links">
                    <a href="https://manidavilay.com" target="_blank" rel="noreferrer" className="footer__link">
                        <IoIosLink size={30} />
                    </a>
                    <a href="https://www.linkedin.com/in/manida-vilay/" target="_blank" rel="noreferrer" className="footer__link">
                        <IoLogoLinkedin size={30} />
                    </a>
                </div>
            </div>
            <div className="footer__bottom">
                <p>
                    © Manida Vilay - 2022
                </p>
            </div>
        </footer>
  );
};

export default Footer;
