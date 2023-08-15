import "./styles.css";
import {BsLinkedin, BsGithub, BsFacebook, BsInstagram} from "react-icons/bs";
import {AiOutlineCopyrightCircle} from  "react-icons/ai"

const Footer = () => {
    return (
        <footer className="footer">
            <h2 className="footer_heading"> Report an issue </h2>
            <div className="form_container">
                <div className="form_sub_container">
                    <form>
                        <input type="text" placeholder="Enter Name..." /> <br/>
                        <input type="email" placeholder="Enter Email..." /> <br/>
                        <textarea placeholder="Enter Message..." /> <br/>
                        <input type="submit" value="Send" />
                    </form>
                </div>
                <div className="social_links">
                    <p className="social_links_para"> You're most welcomed to contact me through : </p>
                    <a href="#" className="social_anchors"> <BsLinkedin /> </a>
                    <a href="#" className="social_anchors"> <BsGithub /> </a>
                    <a href="#" className="social_anchors"> <BsFacebook /> </a>
                    <a href="#" className="social_anchors"> <BsInstagram /> </a>
                </div>
            </div>
            <div className="copyright">
                <AiOutlineCopyrightCircle /> Copyright. All rights reserved
            </div>
        </footer>
    )
}

export default Footer;