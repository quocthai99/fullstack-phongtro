import React, { memo } from 'react';
import anonAvatar from '../assets/anon-avatar.png';
import icons from '../ultils/icons';

const { BsDot, BsTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
    return (
        <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4">
            <img src={anonAvatar} alt="avatar" className="w-16 h-16 object-contain rounded-full" />
            <h3 className="text-xl font-medium">{userData?.name}</h3>
            <span className="flex items-center">
                <BsDot color="green" size={28} />
                <span>Đang hoạt động</span>
            </span>
            <a className="bg-[#13BB7B] mb-3 py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold" href='tel:' >
                <BsTelephoneFill />
                {userData?.phone}
            </a>
            <a className="bg-white flex items-center justify-center gap-2 w-full rounded-md text-black font-bold text-lg" href={`https://zalo.me/${userData?.zalo}`} >
                <SiZalo color='blue' size={35} />
            </a>
        </div>
    );
};

export default memo(BoxInfo);
