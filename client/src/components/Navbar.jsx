import React from 'react';


function NavBar() {

    return (
        <header className='bg-green-200 md:sticky top-0 z-10'>
            <div className='container flex flex-wrap p-2 flex-col md:flex-row items-center text-green-700'>
                <a className='title-font font-medium mb-4 md:mb-0'>
                    <a href='/' className='ml-3 text-2xl text-green-800 font-bold'>
                        T3R
                    </a>
                </a>
                <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-green-700 flex flex-wrap items-center text-xl justify-center'>
                    <a href='/supermarket-hub' className='mr-5 hover:text-green-400'>
                        Supermarket Program
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;