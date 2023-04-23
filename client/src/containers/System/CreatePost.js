import React from 'react';
import icons from '../../ultils/icons'
import { Address, Overview } from '../../components';

const { BsCameraFill, ImBin } = icons

const CreatePost = () => {
    return (
        <div className="px-6">
            <h1 className="text-3xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h1>
            <div className="flex gap-4">
                <div className="py-4 flex flex-col gap-8 flex-auto">
                    <Address />
                    <Overview />
                    <div className='w-full mb-6'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                        <div className='w-full'>
                            <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor='file' >
                                <BsCameraFill color='blue' size={50}/>
                                Thêm ảnh
                            </label>
                            <input hidden type='file' id='file' />
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex-none">maps</div>
            </div>
        </div>
    );
};

export default CreatePost;
