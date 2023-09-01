import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function SupermarketHub() {

    return (

        <div className='container px-5 mx-auto text-center lg:px-40'>
            <div className='flex flex-col w-full mb-10'>
                <ShoppingBagIcon className='mx-auto inline-block w-10 py-10' />
                <h1 className='sm:text-4xl text-3xl font-medium title-font font-display'>
                    Leaderboards
                </h1>
            </div>

            <h1 className='text-2xl font-medium mb-10'>Choose your portal:</h1>

            {/*Buttons*/}
            <div className='pb-5'>
                <Link to='/login/supermarket'>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
                        Supermarket
                    </button>
                </Link>
            </div>

            <div>
                <Link to='/login/customer'>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
                        Customer
                    </button>
                </Link>
            </div>
        </div>
            
    );

}

export default SupermarketHub;