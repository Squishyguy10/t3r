import React from 'react';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function AccountPortalSupermarket() {

    let username = 'Laymin HK'; // get the username from the local storage

    return (
        <div className='container px-5 mx-auto text-center lg:px-40'>
            <div className='flex flex-col w-full mb-10'>
                <DocumentChartBarIcon className='mx-auto inline-block w-10 py-10' />
                <h1 className='sm:text-4xl text-3xl font-medium title-font font-display mb-10'>
                    Welcome back {username}!
                </h1>

                <div className='pb-5'>
                    <Link to='/catalogue/supermarket'>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
                            View Item Catalogue
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to='/add-item'>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
                            Add Items
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );

}

export default AccountPortalSupermarket;