import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

function Main() {

    return (
        <div className='h-screen bg-nature-bg'>
            <div className='h-screen opacity-90 bg-black/50'>
                <div className='opacity-100 container px-5 pt-24 pb-10 mx-auto text-center lg:px-40'>
                    <h1 className='text-7xl pb-10 font-display text-green-400 font-bold'>
                        THE 3 R'S
                    </h1>


                    {/* What is T3R? */}
                    <div className='container px-5 pt-40 mx-auto text-center lg:px-40'>
                        <div className='flex flex-col w-full mb-40 '>
                            <BookOpenIcon className='mx-auto inline-block w-10 mt-40 text-green-200' />
                            
                            <h1 className='sm:text-4xl text-5xl font-medium title-font mb-4 text-green-400 py-3 font-display'>
                                What is T3R? 
                            </h1>
                            <p className='lg:w-3/4 mx-auto leading-relaxed text-base text-green-200'>
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