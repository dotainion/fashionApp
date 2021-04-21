import { IonButton, IonCard, IonIcon, IonImg, IonItem, IonList, IonThumbnail } from '@ionic/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/routes';
import image from '../images/shop-advert.png';
import { ShouldSignIn } from './ShouldSignIn';
import img from '../images/testdd.jpg';
import img2 from '../images/shop-advert.png';
import img3 from '../images/shopping-bags.jpg';
import img4 from '../images/test.jpg';
import img5 from '../images/default-image.jpg';
import { arrowBackOutline, arrowForwardOutline, closeOutline, imagesSharp } from 'ionicons/icons';
import { tools } from '../tools/Tools';



export const ShoppAdvert = () =>{
    const history = useHistory();
    return(
        <div>
            <IonImg src={image}/>
            <IonList style={{textAlign:"center",margin:"20px"}} lines="none">
                <IonButton onClick={()=>history.push(routes.sales)} size="small" color="success">Continue Shopping</IonButton>
            </IonList>
            <ShouldSignIn/>
        </div>
    )
}

export const SlideAdvert = ({style, cssClass, images, onSelect}) =>{
    const [imageLists, setImageList] = useState([]);

    const [imageLeft, setImageLeft] = useState();
    const [imageCenter, setImageCenter] = useState();
    const [imageRight, setImageRight] = useState();

    const [hideAddBtn, setHideAddBtn] = useState(true);

    const handlerSlide = (cmd) =>{
        if (images.length > 1){
            let imageCopy = JSON.parse(JSON.stringify(imageLists));
            if (cmd === "left"){
                const firtElement = imageCopy.shift();
                imageCopy.push(firtElement); 
            }else if (cmd === "right"){
                const lastElement = imageCopy.pop();
                imageCopy.unshift(lastElement); 
            }
            setImageList(imageCopy);
        }
    }

    useEffect(()=>{
        setImageLeft(imageLists?.[0]);
        setImageCenter(imageLists?.[1]);
        setImageRight(imageLists?.[2]);
    },[imageLists]);

    useEffect(()=>{
        if (images?.length){
            if (images?.length === 1) setImageList(["",images,""]);
            else if (images?.length === 2) setImageList([...images,""]);
            else setImageList(images);
        }
    },[images]);
    return(
        <div className={`divider advert-slide-container ${cssClass}`} style={style}>
            <div className="advert-slide-image-container">
                <IonThumbnail class="advert-slide-image-1 white-bg">
                    <IonImg hidden={!imageLeft} src={imageLeft}/>
                    <IonIcon onMouseEnter={()=>handlerSlide("left")} onClick={()=>handlerSlide("left")} class="float-center advert-slide-btn" icon={arrowBackOutline}/>
                </IonThumbnail>
            </div>
            <div className="advert-slide-image-container">
                <IonThumbnail onMouseEnter={()=>setHideAddBtn(false)} onMouseLeave={()=>setHideAddBtn(true)} class="advert-slide-image-center white-bg">
                    <IonImg hidden={!imageCenter} src={imageCenter}/>
                </IonThumbnail>
                <div hidden={hideAddBtn} className="backdrop-translucent">
                    <div className="float-center">
                        <button onClick={()=>onSelect?.(imageCenter)} className="btn pad btn-click btn-shadow" style={{backgroundColor:"rgb(0,0,0,0.8)"}}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <div className="advert-slide-image-container">
                <IonThumbnail class="advert-slide-image-2 white-bg">
                    <IonImg hidden={!imageRight} src={imageRight}/>
                    <IonIcon onMouseEnter={()=>handlerSlide("right")} onClick={()=>handlerSlide("right")} class="float-center advert-slide-btn" icon={arrowForwardOutline}/>
                </IonThumbnail>
            </div>
        </div>
    )
}

export const SlideAdvertHorizontal = ({images,cssClass,onSelect}) =>{
    const onSelected = () =>{
        if (typeof onSelect === "function") onSelect();
    }
    return(
        <div className={`pad-v ${cssClass}`}>
            <div className="product-horizontal-slide">
                {images?.map((img, key)=>(
                    <img onClick={onSelected} className="add-hold-more-image-hover" src={img} key={key} alt=""/>
                ))}
            </div>
        </div>
    )
}

