import React, { useEffect } from 'react';
import { Button, Item } from '../../components';
import { getPosts, getPostsLimit } from '../../store/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const List = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        let params = []
        for ( let entry of searchParams.entries()) {
            params.push(entry)
        }
        let searchParamsObject = {}
        params?.map(i => { searchParamsObject = { ...searchParamsObject, [i[0]]: i[1]}})
        if (categoryCode) searchParamsObject.categoryCode = categoryCode

        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams]);

    return (
        <div className="w-full p-2 bg-white shadow-md rounded-md">
            <div className="flex items-center justify-between ">
                <h4 className="text-xl font-semibold">Danh sach tin dang</h4>
                <span>Cap nhat: 3/8/2023</span>
            </div>
            <div className="flex items-center gap-2 my-2">
                <span>Sap xep:</span>
                <Button text="Moi nhat" bgColor="bg-gray-200" />
                <Button text="Mac dinh" bgColor="bg-gray-200" />
            </div>
            <div>
                {posts?.length > 0 &&
                    posts.map((item) => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.address}
                                attributes={item?.attributes}
                                description={JSON.parse(item?.description)}
                                images={JSON.parse(item?.images?.image)}
                                star={+item?.star}
                                title={item?.title}
                                user={item?.user}
                                id={item?.id}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default List;
