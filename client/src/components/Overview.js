import React, {useEffect, useState} from 'react';
import { InputReadOnly, Select, InputFormV2 } from '../components';
import { useSelector } from 'react-redux';

const targets = [
    { code: 'Nam', value: 'Nam' },
    { code: 'Nữ', value: 'Nữ' },
]

const Overview = ({payload, setPayload}) => {
    const { categories } = useSelector((state) => state.app);
    const [category, setCategory] = useState('')
    const [sex, setSex] = useState('')
    const { currentData } = useSelector(state => state.user)

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            categoryCode: category,
            target: sex
        }))

    }, [sex, category])

    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
            <div className="w-full flex flex-col gap-4">
                <div className="w-1/2">
                    <Select label="Loại chuyên mục" options={categories} value={category} setValue={setCategory} />
                </div>
                <InputFormV2 label="Tiêu đề" value={payload} setValue={setPayload} name="title" />
                <div className='flex flex-col gap-2' >
                    <label htmlFor='desc' >Noi dung mo ta</label>
                    <textarea
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                        id='desc'
                        cols="30"
                        rows="10"
                        className='w-full rounded-md outline-none border border-gray-300 p-2' ></textarea>
                </div>
                <div className='w-1/2 flex flex-col gap-4'>
                    <InputReadOnly label='Thông tin liên hệ' value={currentData?.name || currentData?.username} />
                    <InputReadOnly label='Điện thoại' value={currentData?.phone} />
                    <InputFormV2 value={payload.priceNumber} setValue={setPayload} name='priceNumber' small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000' label='Giá cho thuê' unit='đồng' />
                    <InputFormV2 value={payload.areaNumber} setValue={setPayload} name='areaNumber' label='Diện tích' unit="m2" />
                    <Select options={targets} value={sex} setValue={setSex} label='Đối tượng cho thuê' />
                </div>
            </div>
        </div>
    );
};

export default Overview;
