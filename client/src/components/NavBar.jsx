import React, { useEffect, useState } from 'react';


function NavBar() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const percentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            setScrollPercentage(percentage);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const opacity = scrollPercentage >= 100 ? 0 : 1 - scrollPercentage / 2;

    const headerStyles = {
        backgroundColor: `rgba(20, 55, 25, ${opacity})`,
        transition: 'background-color 0.3s ease',
    };

    return (
        <header style={headerStyles} className='md:sticky top-0'>
            <div className='container flex text-green-400 items-center ml-[36.25%]'>
                <nav className='text-xl'>
                    <a href='/supermarket-hub' className='hover:text-green-200'>
                        Supermarket Program
                    </a>
                </nav>
                <div className='ml-8 title-font font-medium'>
                    <a href='/'>
                        <img src='logo2.png' alt='T3R' className='text-2xl text-green-500 font-bold text-xl' width="60"/>
                    </a>
                </div>
                <nav className='text-xl'>
                    <a href='/supermarket-hub' className='hover:text-green-200 ml-8'>
                        Recycling Program
                    </a>
                </nav>
                
            </div>
        </header>
    );
}

export default NavBar;
