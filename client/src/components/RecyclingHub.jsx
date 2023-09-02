import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function RecyclingHub() {
    return (
        <div className='container px-5 mx-auto text-center lg:px-40'>
            <div className='flex flex-col w-full mb-10'>
                <ArrowPathIcon className='mx-auto inline-block w-10 py-10' />
                <h1 className='sm:text-4xl text-3xl font-medium title-font font-display'>
                    Smart Recycling
                </h1>
            </div>

            {/* <h1 className='text-2xl font-medium mb-10'></h1> */}
            <div className='p-[30%] pt-4'>
                <div className='shadow-md shadow-gray-600 rounded-md bg-[url("../public/question.jpg")] bg-none bg-center'>
                    <h1 className='text-2xl pt-[6%] font-bold pb-[70%]'>
                        Complete the survey to get recommendations:
                    </h1>
                    <div className='pb-10'>
                        <Link to='/survey'>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
                                Get Started <span className='ml-1'> ➤ </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
            
    );

}

export default RecyclingHub;