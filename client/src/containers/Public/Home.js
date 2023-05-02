import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Navigation, Search } from './';
import { Intro, Contact } from '../../components';
import { useSelector } from 'react-redux';

const Home = () => {
    const {isLoggedIn} = useSelector(state => state.auth)

    return (
        <div className="w-full flex flex-col items-center h-full">
            <Header />
            <Navigation />
            {isLoggedIn && <Search />}
            <div className=" w-1100 flex flex-col items-center justify-start mt-3">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    );
};

export default Home;
