import { IonIcon, IonImg, IonItemDivider, IonList, IonPage, IonThumbnail, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { getAgentRecord, getAProduct } from '../database/CollectionsRequsts';
import { tools } from '../tools/Tools';
import { routes } from '../global/routes';
import { SlideAdvertHorizontal } from '../widgets/Advertise';
import { ToolBar } from '../widgets/ToolTopBar';
import { ProductProspect } from '../widgets/ProductContainer';
import { useStore } from '../context/Context';
import { AddToCartButton } from '../widgets/AddToCartButton';
import { shareSocialOutline } from 'ionicons/icons';
import { AgentHeader } from '../widgets/AgentHeader';
import userEvent from '@testing-library/user-event';


export const ViewProduct = () =>{
    const history = useHistory();
    const { user, onShare, addCartItem } = useStore()
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const initProduct = async(prodId) =>{
        const sharedItem = await getAProduct(prodId);
        setProduct({info:sharedItem,id:prodId});
    }

    const onAddToCart = () =>{
        let newProduct = JSON.parse(JSON.stringify(product));
        newProduct["sizeSelected"] = selectedSize || newProduct?.info?.sizes?.[0];
        newProduct["imageSelected"] = selectedImage || newProduct?.info?.images?.[0];
        addCartItem(newProduct);
    }

    useIonViewWillEnter(()=>{
        const productId = history.location.pathname.replace(routes.viewProduct+":","");
        initProduct(productId);
    },[]);
    return(
        <IonPage>
            <div className="background ">
                <ToolBar
                    home
                    share={()=>onShare(`${user?.firstName} ${user?.lastName}`, routes.viewProduct, product?.id)}
                />

                <AgentHeader uid={product?.info?.postBy} visit/>

                <IonList className="divider-wrap white-bg max-width">
                    <IonList class="add-cart-agent-left">
                        <IonThumbnail class="add-cart-agent">
                            <IonImg src={selectedImage || product?.info?.images?.[0]}/>
                        </IonThumbnail>
                    </IonList>
                    <IonList class="add-cart-agent-right" style={{position:"relative"}}>
                        <div className="teal pad-v pad-xl" style={{backgroundColor:"rgb(211, 211, 211, 0.5)"}}>
                            <div className="pad-v"><b>Product description:</b></div>
                            <div className="pad">{product?.info?.description}</div>
                        </div>
                        <div className="pad-v">
                            <label>Price: <b className="teal">${product?.info?.price}</b></label>
                        </div>
                        <label>Select by Size:</label>
                        <select onChange={(e)=>setSelectedSize(e.target.value)} className="select-option-input teal">
                            {product?.info?.sizes?.map((size, key)=>(
                                <option key={key}>{size}</option>
                            ))}
                        </select>
                        <div className="pad-xl pad-v product-details">
                            <div className="pad-v"><b>Product details:</b></div>
                            <div style={{paddingLeft:"10px"}}>
                                dasdf
                            </div>
                        </div>

                        <AddToCartButton
                            size={selectedSize}
                            image={selectedImage}
                            product={product}
                            cssClass="hide-on-mobile float-right"
                            onAdd={onAddToCart}
                        />

                    </IonList>
                </IonList>

                <AddToCartButton
                    size={selectedSize}
                    image={selectedImage}
                    product={product}
                    cssClass="hide-on-desktop"
                    onAdd={onAddToCart}
                />

                <IonList>
                    {
                        product?.info?.images?.map((img,key)=>(
                            <IonList onClick={()=>setSelectedImage(img)} class="prod-other-image inline" key={key}>
                                <IonThumbnail class="max-width max-height">
                                    <IonImg class="max-width max-height" src={img}/>
                                </IonThumbnail>
                            </IonList>
                        ))
                    }
                </IonList>
            </div>
        </IonPage>
    )
}