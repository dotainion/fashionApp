import React from 'react';


export const DealContainer = ({product}) =>{
    return(
        <label hidden={!product?.info?.deal}>
            <span>Price: </span>
            <span className="line-through">${product?.info?.price}</span>
            &nbsp; - &nbsp;
            <b>${product?.info?.deal?.newPrice}</b>
        </label>
    )
}