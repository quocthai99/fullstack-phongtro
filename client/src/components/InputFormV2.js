import React from 'react';

const InputFormV2 = ({label, unit, value, setValue, name, small, invalidFields, setInvalidFields, direction}) => {
    return (
        <div className={`flex ${direction ? direction : 'flex-col' }`} >
            <label className='w-48 flex-none' htmlFor="title">{label} </label>
            <div className='flex flex-auto items-center' >
                <input
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    type="text"
                    id="title"
                    className={`flex-auto ${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none flex-auto border border-gray-300 p-2`}
                    onFocus={() => setInvalidFields([])}
                />
                {unit && <span className='p-2 bg-gray-400 flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md border border-gray-300' >{unit}</span>}
            </div>
            {small && <small className='opacity-70'>{small}</small>}
            {invalidFields?.some(item => item.name === name ) && <div className='text-red-500' >
                {invalidFields?.some(item => item.name === name ) && invalidFields?.find(item => item.name === name)?.message}
            </div>}
        </div>
    );
};

export default InputFormV2;
