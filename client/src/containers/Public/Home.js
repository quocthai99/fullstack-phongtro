import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Navigation, Search } from './';
import { Intro, Contact } from '../../components'

const Home = () => {
    return (
        <div className="w-full flex flex-col items-center h-full">
            <Header />
            <Navigation />
            <Search />
            <div className=" w-1100 flex flex-col items-center justify-start mt-3">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    );
};

export default Home;
