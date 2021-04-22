import { IonImg, IonItemDivider, IonList, IonThumbnail } from '@ionic/react';
import React from 'react';
import { SlideAdvertHorizontal } from './Advertise';



export const ProductProspect = ({title, price, images, colors, onAdd, onMore, onSelect, style, id, hidden, cssClass}) =>{
    return(
        <div onClick={onSelect} id={id} hidden={hidden} className={`product-container ${cssClass}`} style={style}>
            <div className="product-title">
                <div className="float-center">{title}</div>
                <div className="float-bottom-left price">${price}</div>
            </div>
            <img className="product-image" src={images?.[0]} alt=""/>
            <div hidden={!onMore} onClick={onMore} className="float-bottom-right margin-l-r round-l btn pad hide-on-desktop">See more</div>
            <div className="product-action">
                <div hidden={!onAdd} onClick={onAdd} className="float-left btn btn-slide margin-l-r pad round-r">ADD TO CART</div>
                <div hidden={!onMore} onClick={onMore} className="float-right text-hover margin-l-r hide-on-mobile">See more</div>
                <div style={{fontSize:"13px",right:"0px"}}>Available In:</div>
                <div className="scroll-bar" style={{whiteSpace:"nowrap",overflowX:"auto", position:"relative",textAlign:"right"}}>
                    {colors?.map((color, key)=>(
                        <div style={{backgroundColor:color}} className="color-dot inline" key={key}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
