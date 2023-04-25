import React from 'react';

const InputFormV2 = ({label, unit, value, setValue, name, small}) => {
    return (
        <div>
            <label htmlFor="title">{label} </label>
            <div className='flex items-center' >
                <input
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    type="text"
                    id="title"
                    className={`flex-auto ${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none border border-gray-300 p-2`} />
                {unit && <span className='p-2 bg-gray-400 flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md border border-gray-300' >{unit}</span>}
            </div>
            {small && <small className='opacity-70'>{small}</small>}
        </div>
    );
};

export default InputFormV2;
