import React from 'react';

const InputFormV2 = ({label, unit}) => {
    return (
        <div>
            <label htmlFor="title">{label} </label>
            <div className='flex items-center' >
                <input type="text" id="title" className={`flex-auto ${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none border border-gray-300 p-2`} />
                {unit && <span className='p-2 bg-gray-400 flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md border border-gray-300' >{unit}</span>}
            </div>
        </div>
    );
};

export default InputFormV2;
