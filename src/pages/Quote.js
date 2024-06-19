import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import services from '../assets/services/services.json';

import { PostData } from "../utils/PostData";
import "../assets/css/quote.css";

function Quote() {
    const formRef = useRef();
    const navigate = useNavigate();
    const serviceId = useParams().id;
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(formRef.current);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (!name || !email || !phone || !message) {
            scrollToTop();
            setError('Please fill out all required fields.');
            return;
        }

        if (!emailRegex.test(email)) {
            scrollToTop();
            setError('Please enter a valid email address.');
            return;
        }

        if (!phoneRegex.test(phone)) {
            scrollToTop();
            setError('Please enter a valid phone number in the format 519-718-3002.');
            return;
        }

        const serviceCheckboxes = formRef.current.querySelectorAll('input[type="checkbox"]');
        const selectedServices = Array.from(serviceCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

        // If all fields are filled out and valid, you can submit the form data here.
        PostData("send-quote.php", { name, email, phone, services: selectedServices, message })
            .then((response) => {
                if (response.status === 'success') {
                    navigate('/quote_success');
                } else if (response.status === 'error') {
                    scrollToTop();
                    setError("Message failed to send.");
                }
            })
            .catch((error) => {
                scrollToTop();
                setError("Message failed to send. " + error);
            });

    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }


    return (
        <main className="quote">
            <section className="quote-container">
                <h1>Get a Quote</h1>
                <form className="quote-form" ref={formRef}>
                    <div className="form-input">
                        {error && <Alert variant="danger" className='text-center'>{error}</Alert>}
                        <label htmlFor="name">Name<span className='red'>*</span></label>
                        <input className="quote-input" type="text" id="name" name="name" required placeholder='Name' />
                    </div>
                    <div className="form-input">
                        <label htmlFor="email">Email<span className='red'>*</span></label>
                        <input className="quote-input" type="email" id="email" name="email" required placeholder='example@email.com' />
                    </div>
                    <div className="form-input">
                        <label htmlFor="phone">Phone<span className='red'>*</span></label>
                        <input className="quote-input" type="tel" id="phone" name="phone" required placeholder='519-718-3002' />
                    </div>
                    <div className="form-input">
                        <label htmlFor="service">Service<span className='red'>*</span></label>
                        {services.map((service, index) => (
                            <div key={index}>
                                <input id={service.id} type="checkbox" value={service.name} key={service.id} style={{ margin: "10px" }} defaultChecked={serviceId === service.id} />
                                <label htmlFor={service.id}>{service.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="form-input">
                        <label htmlFor="message">Message<span className='red'>*</span></label>
                        <textarea id="message" name="message" rows={8} required placeholder='Please Detail Your Property As Best As You Can'></textarea>
                    </div>
                    <center>
                        <button className="button button-blue" type="button" onClick={(e) => handleSubmit(e)}>Submit Quote</button>
                    </center>
                </form>
            </section>
        </main>
    )
}

export default Quote;