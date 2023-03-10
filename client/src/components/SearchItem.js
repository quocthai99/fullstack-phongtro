import React, {memo} from 'react'

const SearchItem = ({IconBefore, IconAfter, text, fontWeight}) => {
  return (
    <div className='flex items-center justify-between bg-white py-2 px-4 w-full text-gray-500 rounded-md text-[13px] '>
      <div className='flex items-center gap-1 w-full' >
        {IconBefore}
        <span className={`${fontWeight && 'font-medium text-black'} w-[100px] overflow-hidden text-ellipsis whitespace-nowrap `} >{text}</span>
      </div>
      {IconAfter}
    </div>
  )
}

export default memo(SearchItem)