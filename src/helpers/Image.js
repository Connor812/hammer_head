import React, { useState, useEffect } from 'react';
import "../assets/css/home.css";

function Image({ src, alt, className }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
    }, [src]);

    return (
        <>
            {isLoaded ? (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                />
            ) :
                <div className={`${className} loading`}></div>}
        </>
    );
}

export default Image;