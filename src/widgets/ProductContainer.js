import { IonImg, IonItemDivider, IonList, IonThumbnail } from '@ionic/react';
import React, { useRef } from 'react';
import { SlideAdvertHorizontal } from './Advertise';



export const ProductProspect = ({title, price, deal, images, colors, onAdd, onMore, onSelect, style, id, hidden, cssClass}) =>{
    const nameTitleLargerRef = useRef();

    const showTitle = () =>{
        if (title && title.split("").length > 30) nameTitleLargerRef.current.hidden = false;
    }
    const hideTitle = () =>{
        nameTitleLargerRef.current.hidden = true;
    }
    const configureTitle = (value) =>{
        if (value && value.split("").length > 25){
            let valued = [];
            let index = 0;
            for (let elem of value.split("")){
                index ++;
                if (index < 20) valued.push(elem);
                if (index > 20){
                    valued = [...valued, "..."];
                    return valued.join("");
                }
            }
        }
        return value;
    }
    return(
        <div onClick={onSelect} id={id} hidden={hidden} className={`product-container ${cssClass}`} style={style}>
            <div hidden ref={nameTitleLargerRef} onMouseEnter={showTitle} onMouseLeave={hideTitle} className="float-top-center" style={{height:"12%",width:"100%",zIndex:"999999999999999999999999999999"}}>
                <div className="white-bg pad">{title}</div>
            </div>
            <div className="product-title">
                <div onMouseEnter={showTitle} className="float-center" style={{whiteSpace:"nowrap"}}>{configureTitle(title)}</div>
                <div hidden={deal} className="float-bottom-left price">
                    <span>${price}</span>
                </div>
                <div hidden={!deal} className="float-bottom-left deal">
                    <div>Best deals</div>
                    <div style={{textDecoration:"line-through"}}>${price}</div>
                    <div>${deal?.newPrice}</div>
                </div>
            </div>
            <img className="product-image" src={images?.[0]} alt=""/>
            <div hidden={!onMore} onClick={onMore} className="float-bottom-right margin-l-r round-l btn pad hide-on-desktop">See more</div>
            <div className="product-action">
                <div hidden={!onAdd} onClick={onAdd} className="float-left btn btn-slide margin-l-r pad round-r">ADD TO CART</div>
                <div hidden={!onMore} onClick={onMore} className="float-right text-hover margin-l-r hide-on-mobile">See more</div>
                <div style={{fontSize:"13px",right:"0px"}}>Available In:</div>
                <div className="scroll-bar-2" style={{whiteSpace:"nowrap",overflowX:"auto", position:"relative",textAlign:"right"}}>
                    {
                        colors?.length?
                        colors?.map((color, key)=>(
                            <div style={{backgroundColor:color}} className="color-dot inline" key={key}/>
                        )):
                        <div style={{backgroundColor:"white",border:"none"}} className="color-dot inline"/>
                    }
                </div>
            </div>
        </div>
    )
}
