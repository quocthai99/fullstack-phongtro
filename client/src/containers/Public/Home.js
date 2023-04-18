import React, { useEffect } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Navigation, Search } from './';
import { Intro, Contact } from '../../components';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
        dispatch(actions.getProvinces());
    }, []);

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
