import React, {useState} from 'react';
import { Button, InputFormV2, InputReadOnly } from '../../components';
import anonAvatar from '../../assets/anon-avatar.png'


const EditAccount = () => {
    const [invalidFields, setInvalidFields] = useState([])

    return (
        <div className='flex flex-col items-center' >
            <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">Chỉnh sửa thông tin cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center flex-auto' >
                <div className='py-6 flex flex-col gap-4 w-full' >
                    <InputReadOnly direction="flex-row" label="Mã thành viên" />
                    <InputReadOnly direction="flex-row" editPhone label="Số điện thoại" />
                    <InputFormV2
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Tên hiển thị"
                        direction="flex-row"
                    />
                    <InputFormV2
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Zalo"
                        direction="flex-row"
                    />
                    <InputFormV2
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Facebook"
                        direction="flex-row"
                    />
                    <div className='flex' >
                        <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                        <small className='flex-auto h-12 text-blue-500 cursor-pointer' >Đổi mật khẩu</small>
                    </div>
                    <div className='flex mb-6' >
                        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                        <img src={anonAvatar} alt='avatar' className='w-28 h-28 object-cover rounded-full' />
                    </div>
                    <Button
                        text="Cập nhật"
                        bgColor="bg-blue-600"
                        textColor="text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
