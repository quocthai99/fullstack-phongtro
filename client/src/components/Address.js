import React, { useEffect, useState } from 'react';
import { Select, InputReadOnly } from '../components';
import { apiGetPublicProvinces } from '../services';

const Address = () => {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')

    useEffect(() => {

        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }

        fetchPublicProvince()
    }, [])

    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Select value options={provinces} label='Tỉnh/Thành phố' />
                    <Select value options={provinces} label='Quận/Huyện' />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                />
            </div>
        </div>
    );
};

export default Address;
