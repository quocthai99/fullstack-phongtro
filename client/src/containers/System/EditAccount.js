import React, {useState} from 'react';
import { Button, InputFormV2, InputReadOnly } from '../../components';
import anonAvatar from '../../assets/anon-avatar.png'
import { useSelector, useDispatch } from 'react-redux';
import { apiUploadImages, apiUpdateUser } from '../../services';
import { fileToBase64, blobToBase64 } from '../../ultils/Common/toBase64';
import { getCurrent } from '../../store/actions';
import Swal from 'sweetalert2';

const EditAccount = () => {
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const { currentData } = useSelector(state => state.user)
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: currentData?.avatar || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || '',
    })

    const handleSubmit = async() => { 
        const response = await apiUpdateUser(payload)
        if (response?.data.err === 0) {
            Swal.fire("Done", "Chinh sua thong tin ca nhan thanh cong", "success").then(() => {
                dispatch(getCurrent())
            })
        } else {
            Swal.fire("Oop!", "Chinh sua thong tin ca nhan khong thanh cong", "error")
        }
    }

    const handleUploadFile = async(e) => {
        const imageBase64 = await fileToBase64(e.target.files[0])
        setPayload(prev => ({
            ...prev,
            avatar: imageBase64
        }))
    }

    return (
        <div className='flex flex-col items-center' >
            <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">Chỉnh sửa thông tin cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center flex-auto' >
                <div className='py-10 flex flex-col gap-4 w-full' >
                    <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''} direction="flex-row" label="Mã thành viên" />
                    <InputReadOnly value={currentData?.phone || ''} direction="flex-row" editPhone label="Số điện thoại" />
                    <InputFormV2
                        name="name"
                        setValue={setPayload}
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Tên hiển thị"
                        direction="flex-row"
                        value={payload?.name}
                    />
                    <InputFormV2
                        name="zalo"
                        setValue={setPayload}
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Zalo"
                        direction="flex-row"
                        value={payload?.zalo}
                    />
                    <InputFormV2
                        name="fbUrl"
                        setValue={setPayload}
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label="Facebook"
                        direction="flex-row"
                        value={payload?.fbUrl}
                    />
                    <div className='flex' >
                        <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                        <small className='flex-auto h-12 text-blue-500 cursor-pointer' >Đổi mật khẩu</small>
                    </div>
                    <div className='flex mb-6' >
                        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                        <div>
                            <img src={payload?.avatar || anonAvatar} alt='avatar' className='w-28 h-28 object-cover rounded-full' />
                            <input onChange={handleUploadFile} type='file' id='avatar' className='appearance-none my-4' />
                        </div>
                    </div>
                    <Button
                        text="Cập nhật"
                        bgColor="bg-blue-600"
                        textColor="text-white"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
