import React, { useEffect } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Navigation, Search } from './';
import { Intro, Contact } from '../../components';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
    }, []);
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
