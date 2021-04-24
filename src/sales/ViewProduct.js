import { IonIcon, IonImg, IonItem, IonItemDivider, IonList, IonPage, IonThumbnail, useIonViewWillEnter } from '@ionic/react';
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
import { chevronDownOutline, chevronUpOutline, shareSocialOutline } from 'ionicons/icons';
import { AgentHeader } from '../widgets/AgentHeader';
import { FcInTransit } from 'react-icons/fc';


export const ViewProduct = () =>{
    const history = useHistory();
    const { user, onShare, addCartItem } = useStore()
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [agentData, setAgentData] = useState({});

    const initProduct = async(prodId) =>{
        setProduct({});
        const sharedItem = await getAProduct(prodId);
        setProduct({info:sharedItem,id:prodId});
    }

    const onAddToCart = () =>{
        let newProduct = JSON.parse(JSON.stringify(product));
        newProduct["sizeSelected"] = selectedSize || newProduct?.info?.sizes?.[0];
        newProduct["imageSelected"] = selectedImage || newProduct?.info?.images?.[0];
        addCartItem(newProduct);
    }

    const showDetailsToggle = () =>{
        if (showDetails) setShowDetails(false);
        else setShowDetails(true);
    }

    useIonViewWillEnter(()=>{
        const productId = history.location.pathname.replace(routes.viewProduct+":","");
        initProduct(productId);
    });
    return(
        <IonPage>
            <div className="background bg-style-2">
                <ToolBar
                    home
                    share={()=>onShare(`${user?.firstName || "A"} ${user?.lastName || "unknown"}`, routes.viewProduct, product?.id)}
                />

                <AgentHeader
                    visit
                    uid={product?.info?.postBy}
                    onLoad={setAgentData}
                />

                <div className="divider-wrap max-width">
                    <div className="add-cart-agent-left" style={{position:"relative"}}>
                        <div className="add-title teal">
                            <span><b>{product?.info?.title}</b></span>
                        </div>
                        
                        <IonThumbnail class="add-cart-agent">
                            <IonImg src={selectedImage || product?.info?.images?.[0]}/>
                        </IonThumbnail>
                        
                        <AddToCartButton
                            size={selectedSize}
                            image={selectedImage}
                            product={product}
                            cssClass="hide-on-desktop white-fg"
                            onAdd={onAddToCart}
                            noBorder
                        />
                    </div>
                    <div className="add-cart-agent-right" style={{position:"relative"}}>
                        <div className="teal pad-v pad-xl" style={{backgroundColor:"rgb(211, 211, 211, 0.5)"}}>
                            <div className="pad-v"><b>Product description:</b></div>
                            <div className="pad">{product?.info?.description}</div>
                        </div>
                        <div style={{paddingLeft:"10px"}}>
                            <div className="pad-v white-fg">
                                <label hidden={product?.info?.deal}>Price: <b className="teal">${product?.info?.price}</b></label>
                                <label className="teal" hidden={!product?.info?.deal}>
                                    <span className="white-fg">Price: </span>
                                    <span className="line-through">${product?.info?.price}</span>
                                    &nbsp; - &nbsp;
                                    <b>${product?.info?.deal?.newPrice}</b>
                                </label>
                            </div>
                            <label className="white-fg">Select by Size:</label>
                            <select onChange={(e)=>setSelectedSize(e.target.value)} className="select-option-input teal">
                                {product?.info?.sizes?.map((size, key)=>(
                                    <option key={key}>{size}</option>
                                ))}
                            </select>

                            <div className="divider inline" style={{height:"45px",width:"200px"}}>
                                <FcInTransit className="transport"/>
                                <div style={{position:"relative"}}>
                                    <div className="pad white-fg">
                                        <div>Shipping</div>
                                        <div className="teal"><b><span hidden={!product?.info?.delivery}>$</span>{product?.info?.delivery || "FREE"}</b></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pad-xl pad-v product-details scroll-bar-2 white-fg">
                                <div className="pad-v"><b>Product details:</b></div>
                                <div style={{paddingLeft:"10px"}}>
                                    <div onClick={showDetailsToggle} style={{fontSize:"13px",userSelect:"none"}}>
                                        <span>View detail</span>
                                        <IonIcon hidden={!showDetails} icon={chevronUpOutline}/>
                                        <IonIcon hidden={showDetails} icon={chevronDownOutline}/>
                                    </div>
                                    <div hidden={!showDetails}>
                                        {
                                            [].length?
                                            [].map((detail, key)=>(
                                                <div style={{marginBottom:"5px"}} key={key}>{detail}</div>
                                            )):
                                            <div className="pad" style={{fontSize:"11px"}}>No details</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <AddToCartButton
                                size={selectedSize}
                                image={selectedImage}
                                product={product}
                                cssClass="hide-on-mobile float-right white-fg"
                                onAdd={onAddToCart}
                            />
                        </div>
                    </div>
                </div>

                <div className="prod-image-small-seperator white-fg">Other view and color</div>

                <div className="prod-other-image-container">
                    {
                        product?.info?.images?.map((img,key)=>(
                            <div onClick={()=>setSelectedImage(img)} className="prod-other-image inline" key={key}>
                                <IonThumbnail class="max-width max-height">
                                    <IonImg class="max-width max-height" src={img}/>
                                </IonThumbnail>
                            </div>
                        ))
                    }
                </div>
            </div>
        </IonPage>
    )
}