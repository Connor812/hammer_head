import React, { useContext } from 'react';
import Image from '../helpers/Image';
import { DataContext } from '../DataProvider';

function Footer() {

    const { url } = useContext(DataContext);

    return (
        <footer id="contact">
            <div className='footer-left-side'>
                <Image src={`${url}/assets/images/white-shark.png`} alt="White Shark Footer Logo" className="footer-logo" />
                <h3>Hammer Head Home Services</h3>
                <p>
                    3049 COCKSHUTT RD WATERFORD ON  N0E 1Y0
                    <br />
                    519-718-3002
                </p>
            </div>
            <div className='footer-right-side'>
                <div className='footer-right-side-top'>
                    <input type="text" placeholder="Enter Email" />
                    <button>Send</button>
                </div>
                <hr />
                <div className='footer-right-side-bottom'>
                    <ul>
                        <li><b>Services</b></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                    </ul>
                    <ul>
                        <li><b>Contact</b></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                        <li><a href="#windows" className="underline-animation">Windows</a></li>
                    </ul>
                </div>
            </div>

        </footer>
    )
}

export default Footer;