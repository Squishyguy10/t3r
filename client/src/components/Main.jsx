import React, { useState, useEffect } from 'react';
import { BookOpenIcon, ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import { HashLink } from 'react-router-hash-link';

function Main() {
    // fade in text
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const textOffset = document.getElementById('fade-in-text').offsetTop;
            window.scrollY > textOffset-window.innerHeight+500 ? setIsVisible(true) : setIsVisible(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });


    return (
        <div>
            <div className='h-screen bg-nature-bg'>
                <div className='h-screen bg-black/50'>
                    <div className='opacity-100 container px-5 pt-24 pb-10 mx-auto text-center lg:px-40'>
                        <h1 className='text-8xl pb-10 font-display text-green-400 font-bold'>
                            THE 3 R'S
                        </h1>
                        <h1 className='text-5xl pt-24 font-inter text-white'>
                            MAKING THE PLANET BETT3R
                        </h1>
                        <div className="mt-60">
                            <HashLink smooth to='/#about'>
                                <ChevronDoubleDownIcon className='inline-block w-10 text-green-100 animate-bobbing' />
                            </HashLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is T3R? */}
            <div className="bg-vine-bg">
                <div id="about" className='container px-5 pt-16 mx-auto text-center lg:px-40 pb-80'>
                    <div id="fade-in-text" className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}> 
                        <div className='flex flex-col w-full mb-40'>
                            <BookOpenIcon className='mx-auto inline-block w-10 mt-40 text-green-700' />
                            
                            <h1 className='sm:text-4xl font-medium title-font mb-4 text-green-800 py-3 font-display'>
                                What is T3R? 
                            </h1>
                            <p className='lg:w-3/5 sm:text-xl mx-auto leading-relaxed text-base text-green-700'>
                                T3R is an app that aims to make the world a more sustainable place.
                                Through the 3Rs principle of sustainability (reducing, reusing, and recycling),
                                we implemented multiple innovative solutions to conserve ecological balance, via
                                reducing food waste and recycling!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Main;