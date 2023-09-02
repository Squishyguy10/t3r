import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function SupermarketHub() {
    return (
        <div className='w-full h-screen text-center'>
            <div className='flex flex-col mb-10'>
                <h1 className='sm:text-4xl text-3xl font-medium title-font font-display pt-16'>
                    <ShoppingBagIcon className='mr-4 inline-block w-10' />
                    Supermarket Program
                </h1>
            </div>

            <h1 className='text-2xl font-medium mb-10'>Select your portal:</h1>

            {/*Buttons*/}
            <div className='grid sm:grid-cols-2 px-[30%] gap-16 pt-8 justify-center'>
                <div className='shadow-md shadow-gray-600 rounded-md bg-[url("../public/supermarketStaff.jpg")]'>
                    <h1 className='text-2xl text-white pt-[6%] font-bold pr-[55%] pb-[60%]'>
                        Company
                    </h1>
                    <div className='pt-[20%] pl-[55%] pb-[10%]'>
                        <Link to='/login/supermarket'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg'>
                                Go
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='shadow-md shadow-gray-600 rounded-md bg-[url("../public/customer.jpg")]'>
                    <h1 className='text-2xl text-white pt-[6%] font-bold pr-[55%] pb-[60%]'>
                        Customer
                    </h1>
                    <div className='pt-[20%] pl-[55%] pb-[10%]'>
                        <Link to='/login/customer'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg'>
                                Go
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
            
    );

}

export default SupermarketHub;