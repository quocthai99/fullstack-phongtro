import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLimit } from '../../store/actions';
import { SimpleSlider } from '../../components';
import icons from '../../ultils/icons';

const { HiLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, BsStopwatch } = icons;

const DetailPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }));
    }, [postId]);

    return (
        <div className="w-full flex gap-4">
            <div className="w-[70%]">
                <SimpleSlider images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-red-600 ">{posts[0].title}</h2>
                    <div className="flex items-center gap-2">
                        <span>Chuyên mục:</span>
                        <span className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer ">
                            {posts[0]?.overviews?.area}
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <HiLocationMarker color="#2563eb" />
                        <span>{posts[0]?.address}</span>
                    </div>
                    <div className='flex items-center justify-between gap-2' >
                        <span className='flex items-center gap-2' >
                            <TbReportMoney />
                            <span className='font-semibold text-lg text-green-600' >{posts[0]?.attributes?.price}</span>
                        </span>
                        <span className='flex items-center gap-2' >
                            <RiCrop2Line />
                            <span>{posts[0]?.attributes?.acreage}</span>
                        </span>
                        <span className='flex items-center gap-2' >
                            <BsStopwatch />
                            <span>{posts[0]?.attributes?.published}</span>
                        </span>
                        <span className='flex items-center gap-2' >
                            <MdOutlineHouseSiding />
                            <span>{posts[0]?.attributes?.hashtag}</span>
                        </span>
                    </div>
                </div>
                <div className='mt-8' >
                    <h3 className='text-xl font-semibold my-4' >Thông tin mô tả</h3>
                    <div className='flex flex-col gap-3' >
                      {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                          return (
                            <span key={index} >{item}</span>
                          )
                      })}
                    </div>
                </div>
                <div className='mt-8' >
                    <h3 className='text-xl font-semibold my-4' >Quảng lý tin đăng</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Mã tin</td>
                                <td>{posts[0]?.overviews?.code}</td>
                            </tr>
                            <tr>
                                <td>Khu vực</td>
                                <td>{posts[0]?.overviews?.area}</td>

                            </tr>
                            <tr>
                                <td>Loại tin rao</td>
                                <td>{posts[0]?.overviews?.type}</td>

                            </tr>
                            <tr>
                                <td>Đối tượng</td>
                                <td>{posts[0]?.overviews?.target}</td>

                            </tr>
                            <tr>
                                <td>Gói tin</td>
                                <td>{posts[0]?.overviews?.bonus}</td>

                            </tr>
                            <tr>
                                <td>Ngày đăng</td>
                                <td>{posts[0]?.overviews?.createdAt}</td>

                            </tr>
                            <tr>
                                <td>Ngày hết hạn</td>
                                <td>{posts[0]?.overviews?.expired}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-[30%] bg-red-500 text-white my-10 text-center">Content</div>
        </div>
    );
};

export default DetailPost;
