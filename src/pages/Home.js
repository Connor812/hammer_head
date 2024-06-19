import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from '../helpers/Image';
import FadeInSection from "../helpers/FadeInSection";
import { DataContext } from '../DataProvider';
import services from '../assets/services/services.json';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

    const { url } = useContext(DataContext);

    return (
        <main id="home">
            <section className="hero-container">
                <Image src={`${url}/assets/images/powerwasher.jpg`} alt="Power Washer" className="hero-img" />
                <div className='floating-logo'>
                    <Image src={`${url}/assets/images/hh-logo-transparent.png`} alt="Hammer Head Home Services" className="hammer-head-hero-logo" />
                    <a href="tel:519-718-3002" className="button button-blue" type="button">519-718-3002</a>
                    <Link to="/quote" className="button button-blue" type="button">Get Quote</Link>
                </div>
            </section>

            <section className='home-services' id="services">
                <h1 className="text-center">At Home Services</h1>
                <hr />
                <Row>
                    {services.map((service, index) => {
                        return (
                            <Col className="service" md={2} key={index}>
                                <h3>
                                    <a className="underline-animation" href={`#${service.id}`}>
                                        {service.name}
                                    </a>
                                </h3>
                            </Col>
                        )
                    })}
                </Row>
            </section>

            <section>
                {services.map((service, index) => {
                    if (index % 2 === 0) {
                        return (
                            <FadeInSection key={index}>
                                <div className="display-services" id={service.id}>
                                    <div className='service-img-container'>
                                        <Image src={`${url}${service.image}`} alt={service.name} className="service-image" />
                                    </div>
                                    <div className="service-description">
                                        <h1>{service.name}</h1>
                                        <p>
                                            {service.description}
                                        </p>
                                        <Link to={`/service/${service.id}`} className="button button-blue">Read More</Link>
                                    </div>
                                </div>
                            </FadeInSection>
                        )
                    } else {
                        return (
                            <FadeInSection key={index}>
                                <div className="display-services display-services-odd" id={service.id}>
                                    <div className='service-img-container'>
                                        <Image src={`${url}${service.image}`} alt={service.name} className="service-image" />
                                    </div>
                                    <div className="service-description">
                                        <h1>{service.name}</h1>
                                        <p>
                                            {service.description}
                                        </p>
                                        <Link to={`/service/${service.id}`} className="button button-white">Read More</Link>
                                    </div>
                                </div>
                            </FadeInSection>
                        )
                    }
                })}
            </section>
            <FadeInSection>
                <section className='home-quote-container'>
                    <div className='quote-image-container'>
                        <Image src={`${url}/assets/images/black-shark.png`} alt="black shark logo" className="home-quote-logo left-logo" />
                    </div>
                    <div className="home-quote">
                        <h1>
                            <i>"Quote About The Business"</i>
                        </h1>
                    </div>
                    <div className='quote-image-container'>
                        <Image src={`${url}/assets/images/black-shark.png`} alt="black shark logo" className="home-quote-logo" />
                    </div>
                </section>
            </FadeInSection>
        </main>
    )
}

export default Home;