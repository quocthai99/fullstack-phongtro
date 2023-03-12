import React, { useEffect, useState } from 'react';
import { PageNumber } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../ultils/icons';


const {GrLinkNext} = icons

const Pagination = ({ page }) => {
    const { count, posts } = useSelector((state) => state.post);
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(+page || 1)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)


    useEffect(() => {
      let maxPage = Math.floor(count / posts.length )
      let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
      let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
      let temp = []
      for (let i = start; i <= end; i++) temp.push(i)
      setArrPage(temp)
      currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
      currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)

    }, [count, posts, currentPage])

    return (
        <div className="flex items-center justify-center gap-2 py-5 ">
            {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} />}
            {(!isHideStart && currentPage !== 4) && <PageNumber text={'...'} />}

            {arrPage.length > 0 && arrPage.map((item) => {
                    return <PageNumber key={item} text={item} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            })}
            
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && <PageNumber icon={<GrLinkNext />} setCurrentPage={setCurrentPage} text={Math.floor(count / posts.length)} />}
        </div>
    );
};

export default Pagination;
