import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from '../helpers/Image';
import { DataContext } from '../DataProvider';

function Header() {
    const { url } = useContext(DataContext);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsNavbarHidden(true); // Scrolling down
            } else {
                setIsNavbarHidden(false); // Scrolling up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const { hash } = location;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <Navbar className={`nav-bar ${isNavbarHidden ? 'navbar-hidden' : ''}`} data-bs-theme="dark" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/#home">
                    <Image src={`${url}/assets/images/hh-shark-white.png`} alt="Navigation Bar Logo" className="navbar-logo" />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/#home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/#services">Services</Nav.Link>
                    <Nav.Link as={Link} to="/#contact">Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
