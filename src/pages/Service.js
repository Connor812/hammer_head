import React, { useContext, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '../helpers/Image';
import services from "../assets/services/services.json";
import { DataContext } from '../DataProvider';
import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import "../assets/css/service.css";

import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { SendQuote } from '../utils/SendQuote';

function Service() {
    const { url } = useContext(DataContext);
    const { id } = useParams();
    const formRef = useRef();
    const navigate = useNavigate();
    const service = services.find(service => service.id === id);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [error, setError] = useState(null);
    const [showQuote, setShowQuote] = useState(false);

    function StarRating({ score }) {
        const fullStars = Math.floor(score);
        const halfStars = Math.round(score - fullStars);
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {[...Array(fullStars)].map((e, i) => <IoMdStar key={i} />)}
                {[...Array(halfStars)].map((e, i) => <IoIosStarHalf key={i + fullStars} />)}
                {[...Array(emptyStars)].map((e, i) => <IoIosStarOutline key={i + fullStars + halfStars} />)}
            </>
        );
    }

    const reviewsToShow = showAllReviews ? service.reviews : service.reviews.slice(0, 3);

    return (
        <main className='service-display'>
            <div className="service-description">
                <h1>{service.name}</h1>
                <p>{service.description}</p>
                <br />
                <button type="button" className="button button-blue" onClick={() => setShowQuote(!showQuote)}>Get Quote</button>
                <Collapse in={showQuote}>
                    <section className="quote-container">
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
                                        <input id={service.id} type="checkbox" value={service.name} key={service.id} style={{ margin: "10px" }} defaultChecked={id === service.id} />
                                        <label htmlFor={service.id}>{service.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="form-input">
                                <label htmlFor="message">Message<span className='red'>*</span></label>
                                <textarea id="message" name="message" rows={8} required placeholder='Please Detail Your Property As Best As You Can'></textarea>
                            </div>
                            <center>
                                <button className="button button-blue" type="button" onClick={(e) => SendQuote(e, formRef, setError, navigate)}>Request Quote</button>
                            </center>
                        </form>
                    </section>
                </Collapse>
                <div className='service-reviews'>
                    <h2>Reviews</h2>
                    {reviewsToShow.map((review, index) => (
                        <div className="review" key={index}>
                            <div className="profile-image-name">
                                <Image src={review.image} alt={`${review.name} profile`} className="profile-image" />
                                <div className='review-rating'>
                                    {review.name}
                                    <br />
                                    <StarRating score={review.rating} />
                                </div>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                    {service.reviews.length > 3 && (
                        <button className="toggle-reviews-btn" onClick={() => setShowAllReviews(!showAllReviews)}>
                            {showAllReviews ? 'View Less' : 'View More...'}
                        </button>
                    )}
                </div>
            </div>
            <div className='service-carousel-wrapper'>
                <div className='service-carousel-container'>
                    <Carousel>
                        <Carousel.Item>
                            <Image src={`${url}${service.image}`} alt={service.name} className="service-image" text="First image" />
                        </Carousel.Item>
                        {service.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <Image src={`${url}${image}`} alt={`image ${index}`} className="service-image" />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </main>
    );
}

export default Service;

