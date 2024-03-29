import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions'
import moment from 'moment'
import { Button, UpdatePost } from '../../components'
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';


const ManagePost = () => {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('0')
    const { postsOfCurrent, dataEdit } = useSelector((state) => state.post);
    const [updateData, setUpdateData] = useState(false)

    useEffect(() => {
        !dataEdit && dispatch(action.getPostsLimitAdmin())
    }, [dataEdit, updateData])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    useEffect(() => {
        setPosts(postsOfCurrent)
    }, [postsOfCurrent])

    const checkStatus = (dateString) => moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())

    const handleDeletePost = async(postId) => {
        const response = await apiDeletePost(postId)
        if ( response?.data.err === 0) {
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Oops!', 'Xóa tin đăng thất bại', 'error')
        }
    }
    
    useEffect(() => {
        if (status === 1) {
            const activePost = postsOfCurrent?.filter(item => checkStatus(item?.overviews?.expired?.split(' ')[3]))
            setPosts(activePost)
        } else if (status === 2) {
            const expiredCode = postsOfCurrent?.filter(item => !checkStatus(item?.overviews?.expired?.split(' ')[3]))
            setPosts(expiredCode)
        } else {
            setPosts(postsOfCurrent)
        }
    }, [status])

    return (
        <div className='flex flex-col gap-6' >
            <div className='py-4 border-b border-gray-200 flex items-center justify-between' >
                <h1 className="text-3xl font-medium py-4 border-b border-gray-200">Quản lý tin đăng</h1>
                <select value={status} onChange={e => setStatus(+e.target.value)} className="outline-none border p-2 border-gray-200 rounded-md">
                    <option value="0">Lộc theo trạng thái</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className='flex w-full bg-blue-400 text-white' >
                        <th className='border flex-1 p-2' >Mã tin</th>
                        <th className='border flex-1 p-2' >Ảnh đại diện</th>
                        <th className='border flex-1 p-2' >Tiêu đề</th>
                        <th className='border flex-1 p-2' >Giá</th>
                        <th className='border flex-1 p-2' >Ngày bắt đầu</th>
                        <th className='border flex-1 p-2' >Ngày hết hạn</th>
                        <th className='border flex-1 p-2' >Trạng thái</th>
                        <th className='border flex-1 p-2' >Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!posts
                    ?   <tr>
                            <td>aadwad</td>
                        </tr> 
                    : posts?.map(item => {
                        return (
                        <tr className='flex items-center h-16' key={item?.id} >
                            <td className='border flex-1 h-full flex justify-center items-center px-2'>{item?.overviews?.code}</td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2 '>
                                <img src={JSON.parse(item?.images?.image)[0] || ''} alt='avatar-post' className='w-10 h-10 object-cover rounded-md' />
                            </td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2'>{`${item?.title.slice(0, 40)}...`}</td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2'>{item?.attributes?.price}</td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2'>{item?.overviews?.created}</td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2'>{item?.overviews?.expired}</td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2'>{checkStatus(item?.overviews?.expired?.split(' ')[3]) ? 'Đang hoạt động' : 'Đã hết hạn'}</td>
                            <td className='border flex-1 h-full flex justify-center items-center px-2 gap-4'>
                                <Button 
                                    text="Sửa"
                                    bgColor="bg-green-500"
                                    textColor="text-white"
                                    onClick={() => {
                                        setIsEdit(true)
                                        dispatch(action.editData(item))
                                    }}
                                />
                                <Button 
                                    text="Xóa"
                                    bgColor="bg-orange-500"
                                    textColor="text-white"
                                    onClick={() => handleDeletePost(item.id)}
                                />
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    );
};

export default ManagePost;
