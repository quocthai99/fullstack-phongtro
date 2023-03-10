import React from 'react';
import icons from '../../ultils/icons';
import { SearchItem } from '../../components';

const { GrNext, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons;

const Search = () => {
    return (
        <div className=" p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg gap-2 flex-col lg:flex-row flex items-center justify-around ">
            <SearchItem text="phong tro nha cho thue " fontWeight IconBefore={<MdOutlineHouseSiding />} />
            <SearchItem text="toan quoc" IconBefore={<HiOutlineLocationMarker />} IconAfter={<GrNext />} />
            <SearchItem text="cho gia" IconBefore={<TbReportMoney />} IconAfter={<GrNext />} />
            <SearchItem text="chon dien tich" IconBefore={<RiCrop2Line />} IconAfter={<GrNext />} />
            <button
                type="button"
                className="outline-none py-2 px-4 w-full bg-secondary1 text-[13px] text-white flex items-center justify-center gap-2 font-medium rounded-lg "
            >
                <FiSearch />
                Tim kiem
            </button>
        </div>
    );
};

export default Search;
