import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        } else {
            // Scroll to the element with the corresponding ID if the hash exists
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;
