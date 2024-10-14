"use client"


export const Select = ({options , onSelect}:{
    options : {
        key : string,
        value : string
    }[],
    onSelect : (value : string) => void;
})=>{
    return (
        <select onChange={(e)=>{
            onSelect(e.target.value);
        }} className="block w-full px-4 bg-transparent p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {options.map(option => <option value={option.key}>{option.value}</option>)}
        </select>
    )
}