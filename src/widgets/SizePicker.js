import React from 'react';



export const SizePicker = ({isOpen, onClose, onSelect}) =>{
    const sizes = [
        
        "M-L",
        "L-S",
        "L-T",
        "M-T",
        "XL",
        "2XL",
        "3XL",
        "5XL",
        "6XL",
        "XXL",
        "SMALL",
        "MEDIUM",
    ]
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop-translucent">
            <div className="float-center size-picker-container">
                {sizes.map((size, key)=>(
                    <label onClick={()=>onSelect(size)} key={key}>{size}</label>
                ))}
            </div>
        </div>
    )
}