import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SelectDropDown = ({ options, onClick, value }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setOpen(!open)}
                >
                    {value}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {open ? (
                <div className={` z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {/* eslint-disable-next-line react/prop-types */}
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onClick(option.value);
                                    setOpen(false);
                                }}
                                type="button"
                                className="w-full focus:bg-gray-50 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SelectDropDown;
