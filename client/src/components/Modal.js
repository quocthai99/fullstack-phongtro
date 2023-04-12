import React, { useState, useEffect, memo } from 'react';
import { getNumbersArea, getNumbersPrice } from '../ultils/Common/getNumbers';
import { getCodes, getCodesArea } from '../ultils/Common/getCodes';

import icons from '../ultils/icons';

const { GrLinkPrevious } = icons;

const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {
    const [percent1, setPercent1] = useState(name === 'price' && arrMinMax?.priceArr ? arrMinMax?.priceArr[0] : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[0] : 0);
    const [percent2, setPercent2] = useState(name === 'price' && arrMinMax?.priceArr ? arrMinMax?.priceArr[1] : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[1] : 100);
    const [activedEl, setActivedEl] = useState('')

    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active')
        if (activedTrackEl) {
            if(percent2 <= percent1) {
                activedTrackEl.style.left = `${percent2}%`
                activedTrackEl.style.right = `${100 - percent1}%`
            } else {
                activedTrackEl.style.left = `${percent1}%`
                activedTrackEl.style.right = `${100 - percent2}%`
            }
        }

    }, [percent1, percent2])

    const handleClickTrack = (e, value) => {
        e.stopPropagation()
        const trackEl = document.getElementById('track')
        const trackRect = trackEl.getBoundingClientRect()
        let percent = value ? value : Math.round((e.clientX - trackRect.left) * 100 / trackRect.width)
        if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
            setPercent1(percent)
        } else {
            setPercent2(percent)
        }
    }

    const convert100toTarget = (percent) => {
        return name === 'price'
            ? (Math.ceil(Math.round((percent * 1.5 )) / 5) * 5) / 10
            : name === 'area'
            ? (Math.ceil(Math.round((percent * 9 ) / 10) / 5) * 5)
            : 0
    }

    const convertTo100 = percent => {
        let target = name === 'price' ? 15 : name === 'area' ? 90 : 1
        return Math.floor((percent / target) * 100)
    }
    
    const handleActive = (code, value) => {
        setActivedEl(code)
        let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value)
        if ( arrMaxMin.length === 1) {
            if ( arrMaxMin[0] === 1) {
                setPercent1(0)
                setPercent2(convertTo100(1))
            }
            if ( arrMaxMin[0] === 20) {
                setPercent1(0)
                setPercent2(convertTo100(20))
            }
            if ( arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPercent1(100)
                setPercent2(100)
            }
        }
        if ( arrMaxMin.length === 2) {
            setPercent1(convertTo100(arrMaxMin[0]))
            setPercent2(convertTo100(arrMaxMin[1]))
        }
    }

    const handleBeforeSubmit = (e) => {
        let min = percent1 <= percent2 ? percent1 : percent2
        let max = percent1 <= percent2 ? percent2 : percent1
        let arrMinMax = [convert100toTarget(min), convert100toTarget(max)]
        // const gaps = name === 'price' 
        //             ? getCodes(arrMinMax, content) 
        //             : name === 'area' 
        //             ? getCodesArea(arrMinMax, content) : []

        handleSubmit(e, {
            [`${name}Number`]: arrMinMax,
            [name]: `từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${name === 'price' ? 'triệu' : 'm2'}`
        }, {
            [`${name}Arr`]: [min, max]
        })
    }

    return (
        <div
            onClick={() => setIsShowModal(false)}
            className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center "
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsShowModal(true);
                }}
                className="w-3/5 bg-white rounded-md "
            >
                <div className="h-[45px] px-4 flex items-center border-b border-gray-200 ">
                    <span
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShowModal(false);
                        }}
                    >
                        <GrLinkPrevious size={24} />
                    </span>
                </div>
                {/* CONTENT MODEL */}
                {(name === 'category' || name === 'province') && (
                    <div className="p-4 flex flex-col">
                        <span className='py-2 flex gap-2 items-center border-b border-gray-200'>
                            <input
                                type="radio"
                                name={name}
                                value={defaultText || ''}
                                id='default'
                                checked={!queries[`${name}Code`] ? true : false}
                                onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                            />
                            <label htmlFor='default'>{defaultText}</label>
                        </span>
                        {content?.map((item) => {
                            return (
                                <span key={item.code} className="py-2 flex gap-2 items-center border-b border-gray-200">
                                    <input checked={item.code === queries[`${name}Code`] ? true : false} value={item.code} type="radio" id={item.code} name={name} onChange={(e) => handleSubmit(e, {[name] : item.value, [`${name}Code`]: item.code})} />
                                    <label htmlFor={item.code}>{item.value}</label>
                                </span>
                            );
                        })}
                    </div>
                )}
                {/* MODEL RANGE */}
                {(name === 'price' || name === 'area') && (
                    <div className="p-12 py-20">
                        <div className="flex flex-col items-center justify-center relative">
                            <div className='absolute z-30 top-[-48px] font-bold text-xl text-orange-600 ' >
                            {(percent1 === 100 && percent2 === 100)
                                ? `Trên ${convert100toTarget(percent1)} ${name === 'price' ? 'triệu' : 'm2'} +`
                                : `Từ ${percent1 <= percent2
                                    ? convert100toTarget(percent1)
                                    : convert100toTarget(percent2)} - ${percent2 >= percent1
                                        ? convert100toTarget(percent2)
                                        : convert100toTarget(percent1)} ${name === 'price'
                                            ? 'triệu'
                                            : 'm2'}`}
                            </div>
                            <div onClick={handleClickTrack} id='track' className='slider-track h-[5px] absolute top-0 bottom-0 bg-gray-300 w-full rounded-full' ></div>
                            <div onClick={handleClickTrack} id='track-active' className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full' ></div>
                            <input
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={percent1}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                onChange={e => {
                                    setPercent1(+e.target.value)
                                    activedEl && setActivedEl('')
                                }}
                            />
                            <input
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={percent2}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                onChange={e => {
                                    setPercent2(+e.target.value)
                                    activedEl && setActivedEl('')
                                }}/>
                            <div className='absolute top-6 left-0 right-0 flex justify-between items-center ' >
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 0)
                                    }}
                                    className='cursor-pointer'>0</span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 100)
                                    }}
                                    className='cursor-pointer mr-[-12px]'>
                                        {name === 'price' ? '15 triệu+' : name === 'area' ? '90 m2' : ''}
                                </span>
                            </div>
                        </div>
                        <div className='mt-24 ' >
                            <h4 className='mb-4 font-medium' >chọn nhanh</h4>
                            <div className='flex gap-2 items-center flex-wrap w-full ' >
                                {content?.map(item => {
                                    return (
                                        <button
                                            key={item.code}
                                            className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activedEl ? 'bg-blue-500 text-white' : ''}`}
                                            onClick={() => handleActive(item.code, item.value)}
                                        >
                                            {item.value}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {
                    ((name === 'price' || name === 'area') && (
                        <button
                            onClick={handleBeforeSubmit}
                            type='button'
                            className='w-full bg-orange-500 rounded-bl-md rounded-br-md py-2 font-medium text-white'>
                                áp dụng
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default memo(Modal);
