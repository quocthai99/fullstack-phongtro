import React from 'react';
import { text } from '../../ultils/constant';
import { Province } from '../../components';
import { List } from './';

const HomePage = () => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div>
                <h1 className="text-[28px] font-bold ">{text.HOME_TITLE}</h1>
                <p className="text-sm text-gray-700 ">{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4' >
                <div className='w-[70%] ' >
                    <List />
                </div>
                <div className="w-[30%] border border-red-600">Side bar</div>
            </div>
        </div>
    );
};

export default HomePage;
