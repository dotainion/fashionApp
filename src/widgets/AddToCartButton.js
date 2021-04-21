import React from 'react';



export const AddToCartButton = ({product, size, image, cssClass, onAdd, noBorder}) =>{
    return(
        <div className={`pad-xl ${cssClass}`} style={{border: noBorder || "1px solid lightgray",top:"50%",right:"50px"}}>
            <div style={{fontSize:"11px"}}>
                <img style={{width:"40px",height:"30px",marginBottom:"5px",paddingLeft:"8px"}} src={image || product?.info?.images?.[0]} className="block" alt=""/>
                <label className="pad">Price: <b style={{color:"orangered"}}>${product?.info?.price}</b></label>
                <span className="block pad">Size: {size || product?.info?.sizes?.[product?.info?.sizes?.length -1]}</span>
            </div>
            <button onClick={onAdd} className="btn-add-to-cart">ADD TO CART</button>
        </div>
    )
}