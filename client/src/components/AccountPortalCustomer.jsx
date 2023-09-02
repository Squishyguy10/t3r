import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function AccountPortalCustomer() {

    let username = localStorage.getItem("username");

    return (
        <div className='container px-5 mx-auto text-center lg:px-40'>
            <div className='flex flex-col w-full mb-10'>
                <ShoppingCartIcon className='mx-auto inline-block w-10 py-10' />
                <h1 className='sm:text-4xl text-3xl font-medium title-font font-display mb-10'>
                    Welcome back {username}!
                </h1>

                <div className='pb-5'>
                    <Link to='/catalogue/customer'>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
                            View Item Catalogue
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );

}

export default AccountPortalCustomer;