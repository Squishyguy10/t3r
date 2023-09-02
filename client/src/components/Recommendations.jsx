import React, { Component } from 'react';
import { ListBulletIcon, MapPinIcon } from '@heroicons/react/24/outline';

class Recommendations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gptMsg: 'Basjalagoong', // GET THIS FROM BACKEND API CALL UTILIZING THE 
        };
    }

    render() {
        return (
            <div className='container px-5 mx-auto text-center lg:px-40'>
                <div className='flex flex-col w-full mb-10'>
                    <ListBulletIcon className='mx-auto inline-block w-10 py-10' />
                    <h1 className='sm:text-4xl text-3xl font-medium title-font font-display pb-10'>
                        Recommendations
                    </h1>

                    <p className='text-lg pb-52'>{this.state.gptMsg}</p>
                </div>
                <div className='flex flex-col w-full mb-10'>
                    <MapPinIcon className='mx-auto inline-block w-10 py-10' />
                    <h1 className='sm:text-4xl text-3xl font-medium title-font font-display pb-10'>
                        Nearby Facilities
                    </h1>
                </div>
            </div>
        );
    }

}

export default Recommendations;