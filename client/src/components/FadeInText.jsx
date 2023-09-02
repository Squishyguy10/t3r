import React, { useState, useEffect } from 'react';

const FadeInText = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const textOffset = document.getElementById('fade-in-text').offsetTop;
            window.scrollY > textOffset-window.innerHeight+200 ? setIsVisible(true) : setIsVisible(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    return (
        <div
            id="fade-in-text"
            className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
        {children}
        </div>
    );
};

export default FadeInText;