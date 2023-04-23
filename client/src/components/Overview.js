import React, {useState} from 'react';
import { InputReadOnly, Select, InputFormV2 } from '../components';
import { useSelector } from 'react-redux';

const target = [
    {code: 'male', value: 'Nam'},
    {code: 'female', value: 'Nu'}
]

const Overview = () => {
    const { categories } = useSelector((state) => state.app);
    const [category, setCategory] = useState('')
    const [sex, setSex] = useState('')
    const { currentData } = useSelector(state => state.user)

    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
            <div className="w-full flex flex-col gap-4">
                <div className="w-1/2">
                    <Select label="Loại chuyên mục" options={categories} value={category} setValue={setCategory} />
                </div>
                <InputFormV2 label="Tiêu đề" />
                <div className='flex flex-col gap-2' >
                    <label htmlFor='desc' >Noi dung mo ta</label>
                    <textarea id='desc' cols="30" rows="10" className='w-full rounded-md outline-none border border-gray-300 p-2' ></textarea>
                </div>
                <div className='w-1/2 flex flex-col gap-4'>
                    <InputReadOnly label="Thong tin lien he" value={currentData?.name || currentData?.username} />
                    <InputReadOnly label="Dien thoai" value={currentData?.phone} />
                    <InputFormV2 label="Gia cho thue" unit="Dong" />
                    <InputFormV2 label="Dien tich" unit="m2" />
                    <Select options={target} value={sex} setValue={setSex} label="Doi tuong cho thue" />
                </div>
            </div>
        </div>
    );
};

export default Overview;
