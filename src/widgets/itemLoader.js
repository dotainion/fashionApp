import React, { useEffect } from 'react';
import './itemLoader.css';
import { ImSpinner9 } from 'react-icons/im';


let index = 0;
export const ItemLoader = ({state}) =>{
    const dots = [
        {
            text: ".",
            font: "20px",
            id: "item-loader-id-1"
        },{
            text: ".",
            font: "20px",
            id: "item-loader-id-2"
        },{
            text: ".",
            font: "20px",
            id: "item-loader-id-3"
        }
    ];
    
    useEffect(()=>{
        setInterval(() => {
            for (let dot of dots){
                let e = document.getElementById(dot.id);
                if (e) e.style.color = "black";
            }
            let e = document.getElementById(dots[index].id);
            if (e) e.style.color = "green";
            index ++;
            if (index > dots.length - 1){
                index = 0;
            }
        }, 1000);
    },[dots]);
    return(
        <div hidden={!state} className="itemloader-backdrop">
            <div className="itemloader-spinner">
                <ImSpinner9 className="itemloader-icon"/>
                <div className="itemloader-text">Loading items
                    {
                        dots.map((dot, key)=>(
                            <span id={dot.id} style={{
                                fontSize: dot.font
                            }} key={key}>{dot.text}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}