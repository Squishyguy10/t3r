import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';


function AccountPortalCustomer() {


    return (
        <div className='container px-5 mx-auto text-center lg:px-40 py-80'>
            <div className='flex flex-col w-full mb-10'>
                <CheckCircleIcon className='mx-auto inline-block w-10 py-7 text-green-600' />
                <h1 className='text-lg font-bold mb-10'>
                    YOUR PURCHASE WAS SUCCESSFUL <br /> THANK YOU FOR MAKING EARTH A BETT3R PLACE!
                </h1>
            </div>
        </div>
    );

}

export default AccountPortalCustomer;