import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Image from '../helpers/Image';
import services from "../assets/services/services.json";
import { DataContext } from '../DataProvider';
import Carousel from 'react-bootstrap/Carousel';
import "../assets/css/service.css";

import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";

function Service() {
    const { url } = useContext(DataContext);
    const { id } = useParams();
    const service = services.find(service => service.id === id);
    const [showAllReviews, setShowAllReviews] = useState(false);

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
                <Link to={`/quote/${service.id}`} className='button button-blue'>Get Quote</Link>
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

