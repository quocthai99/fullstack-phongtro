import React, {useState} from 'react'
import {InputForm, Button} from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: ''
    })

    const handleSubmit = () => {
        Swal.fire(`Cảm ơn ${payload.name ? payload.name : 'Bé iu'} <3`, "Phản hồi của bạn đã được chúng tôi ghi nhận", "success").then(() => {
            setPayload({
                name: '',
                phone: '',
                content: ''
            })
        })
    }

  return (
    <div className='w-full mb-5' >
        <h1 className='text-2xl font-semibold mb-6 '>Liên hệ với chúng tôi</h1>
        <div className='flex gap-4' >
            <div className='flex-1 h-fit flex flex-col gap-4 bg-gradient-to-br from-[#0039e4] to-[#04dbf1] rounded-3xl p-4 text-white' >
                <h4 className='font-medium' >Thông tin liên hệ</h4>
                <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com</span>
                <span>Điện thoại: 0917 686 101</span>
                <span>Email: cskh.phongtro123@gmail.com</span>
                <span>Zalo: 0917 686 101</span>
                <span>Viber: 0917 686 101</span>
                <span>Địa chỉ: LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.</span>
            </div>
            <div className='flex-1 bg-white shadow-md rounded-md p-4' >
                <h4 className='font-medium text-lg mb-4' >Liên hệ trực tuyến</h4>
                <div className='flex flex-col gap-6' >
                    <InputForm
                        setValue={setPayload}
                        keyPayload="name"
                        value={payload.name}
                        label="HỌ VÀ TÊN CỦA BẠN"
                    />
                    <InputForm
                        setValue={setPayload}
                        keyPayload="phone"
                        value={payload.phone}
                        label="SỐ ĐIỆN THOẠI"
                    />
                    <div >
                        <label>NỘI DUNG MÔ TẢ</label>
                        <textarea
                            value={payload.content}
                            onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                            className='bg-[#e8f0fe] outline-none rounded-md p-2 w-full'
                            id='desc'
                            cols="30"
                            rows="3"
                            name='content'
                        >
                        </textarea>
                    </div>
                    <Button
                        text="Gửi liên hệ"
                        bgColor="bg-blue-500"
                        fullWidth
                        textColor="text-white"
                        onClick={handleSubmit}
                    />
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact