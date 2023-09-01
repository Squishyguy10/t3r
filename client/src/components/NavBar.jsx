import React, { useEffect, useState } from 'react';


function NavBar() {

    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight - windowHeight;
        const percentage = (scrollY / bodyHeight) * 100;
        setScrollPercentage(percentage);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const opacity = scrollPercentage >= 100 ? 0 : 1 - scrollPercentage / 2;

    const headerStyles = {
        backgroundColor: `rgba(20, 55, 25, ${opacity})`,
        transition: 'background-color 0.3s ease',
    };

    return (
        <header style={headerStyles} className='md:sticky top-0 z-10'>
            <div className='container flex flex-wrap p-2 flex-col md:flex-row items-center text-green-400'>
                <a className='title-font font-medium mb-4 md:mb-0'>
                    <a href='/' className='ml-3 text-2xl text-green-500 font-bold'>
                        T3R
                    </a>
                </a>
                <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-green-700 flex flex-wrap items-center text-xl justify-center'>
                    <a href='/supermarket-hub' className='mr-5 hover:text-green-200'>
                        Supermarket Program
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
