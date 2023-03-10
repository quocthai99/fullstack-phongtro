import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { apiCategory } from '../../services/category';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';

const notActive = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary1';
const active = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary2';

const Navigation = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await apiCategory();
            if (response?.data.err === 0) {
                setCategories(response.data.response);
            }
        };

        fetchCategory();
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center bg-secondary1 text-white">
            <div className="w-1100 flex h-[40px] items-center text-sm font-medium ">
                <NavLink
                    to={`/`}
                    className={({ isActive }) => (isActive ? active : notActive)}
                >
                    trang chu
                </NavLink>
                {categories?.length > 0 &&
                    categories.map((item) => {
                        return (
                            <div key={item.code} className="h-full flex justify-center items-center">
                                <NavLink
                                    to={`${formatVietnameseToString(item.value)}`}
                                    className={({ isActive }) => (isActive ? active : notActive)}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Navigation;
