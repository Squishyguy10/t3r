import React from 'react';
import { BookOpenIcon, ChevronDoubleDownIcon, ShoppingCartIcon, ArrowPathIcon} from '@heroicons/react/24/outline';
import { HashLink } from 'react-router-hash-link';
import FadeInText from './FadeInText';

function Main() {
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
                            <HashLink smooth to='/#about-t3r'>
                                <ChevronDoubleDownIcon className='inline-block w-10 text-green-100 animate-bobbing' />
                            </HashLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is T3R? */}
            <div className="bg-vine-bg">
                <div id="about-t3r" className='container px-5 pt-16 mx-auto text-center lg:px-40 pb-80'>
                    <FadeInText>
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
                    </FadeInText>
                    <div className="mt-20">
                        <HashLink smooth to='/#our-supermarket-program'>
                            <ChevronDoubleDownIcon className='inline-block w-10 animate-bobbing' />
                        </HashLink>
                    </div>
                </div>
            </div>

            <div id="our-supermarket-program" className='container px-5 pt-16 mx-auto text-center lg:px-40 pb-80'>
                <FadeInText>
                    <div className='flex flex-col w-full mb-40'>
                        <ShoppingCartIcon className='mx-auto inline-block w-10 mt-40 text-green-700' />
                        <h1 className='sm:text-4xl font-medium title-font mb-4 text-green-800 py-3 font-display'>
                            Our Supermarket Program
                        </h1>
                        <p className='lg:w-3/5 sm:text-xl mx-auto leading-relaxed text-base text-green-700'>
                            Over one third of all food products produced yearly end up wasted,
                            a lot of which come from supermarkets. With over 3 billion people
                            not being to afford a healthy diet, we wanted someway to prevent such food waste
                            and make the world more sustainable. Thus, we decided to create a program
                            where companies can list food for lower prices (that are nearing the expiration date)
                            and individuals can view the listed items and store locations nearby for pickup. 
                        </p>
                    </div>
                </FadeInText>
                <div className="mt-20">
                    <HashLink smooth to='/#our-recycling-program'>
                        <ChevronDoubleDownIcon className='inline-block w-10 animate-bobbing' />
                    </HashLink>
                </div>
            </div>

            <div id="our-recycling-program" className='container px-5 pt-16 mx-auto text-center lg:px-40 pb-80'>
                <FadeInText>
                    <div className='flex flex-col w-full mb-40'>
                        <ArrowPathIcon className='mx-auto inline-block w-10 mt-40 text-green-700' />
                        <h1 className='sm:text-4xl font-medium title-font mb-4 text-green-800 py-3 font-display'>
                            Our Recycling Program
                        </h1>
                        <p className='lg:w-3/5 sm:text-xl mx-auto leading-relaxed text-base text-green-700'>
                            Fortnite ella babagee
                        </p>
                    </div>
                </FadeInText>
            </div>
        </div>
    );

}

export default Main;