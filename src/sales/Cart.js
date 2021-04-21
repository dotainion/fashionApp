import { IonAlert, IonButton, IonCard, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonThumbnail, useIonViewDidLeave, useIonViewWillEnter, withIonLifeCycle } from '@ionic/react';
import { addOutline, closeOutline, ellipsisVerticalOutline, reorderFourOutline } from 'ionicons/icons';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useStore } from '../context/Context';
import img from '../images/testdd.jpg'
import { ShoppAdvert } from '../widgets/Advertise';
import { NavSideBar, NavSideWithWrapper } from '../widgets/NavSideBar';
import { ShouldSignIn } from '../widgets/ShouldSignIn';


export const Cart = () =>{
    const { cart, updateCartItemQty, updateCartItemCheckout, deleteCartItem } = useStore();
    const [showNav, setShowNav] = useState(false);
    //this will hide or show summary as a popup of in mobile view
    const [showSummary, setShowSummary] = useState("hide");
    //costing summary
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    //this is use together with shippingCost to get current value on render
    //as shippingCost is use to trigger useEffect functons with select option element
    const shippRef = useRef();

    const navToggle = () =>{
        if (showNav) setShowNav(false);
        else setShowNav(true);
    }

    useIonViewWillEnter(()=>{
        setShowNav(false);
    });

    useEffect(()=>{
        let total = 0;
        for (let item of cart){
            if (item.checkout){
                const qty = parseInt(item?.qty || 1);
                const price = parseFloat(item?.info?.price || 0);
                total = total + (qty * price);
            }
        }
        setSubTotal(total);
        setTotal(subTotal + parseFloat(shippingCost || shippRef.current.value));
    },[cart,subTotal,shippingCost])
    return(
        <IonPage>
            <div className="background">
                <div hidden={cart.length} className="float-center border pad-xl" style={{backgroundColor:"white"}}>
                    <ShoppAdvert/>
                </div>

                <NavSideWithWrapper
                    isOpen={showNav}
                    top="80px"
                    onClose={navToggle}
                />

                <div className="divider d-flex-on-mobile">
                    <div className="cart-left-container scroll max-width-on-mobile">
                        <div className="fixed-left main-header pad-xl header-bg">
                            <IonIcon onClick={navToggle} class="inline" style={{color:"white",marginBottom:"-5px",marginRight:"10px"}} icon={reorderFourOutline}/>
                            <div className="inline"><b>Shopping Cart</b></div>
                        </div>
                        {
                            cart.length?
                            cart.map((item, key)=>(
                                <div className="divider cart-item-container" key={key}>
                                    <div className="cart-image-container">
                                        <IonThumbnail class="cart-image">
                                            <IonImg src={item?.imageSelected || item?.info?.images?.[0]}/>
                                        </IonThumbnail>
                                    </div>
                                    <div style={{position:"relative",zIndex:"9"}} className="max-width">
                                        <div className="float-center max-width pad-xl">
                                            <div className="divider">
                                                <div className="max-width cart-texts">
                                                    <label><b>{item?.info?.title}</b></label>
                                                    <label>Color <b>{item?.info?.color}</b></label>
                                                    <label>Size <b>{item?.sizeSelected || item?.info?.sizes?.[0]}</b></label>
                                                </div>
                                                <div className="max-width cart-texts">
                                                    <label>Qty <input className="qty-input" onChange={(e)=>updateCartItemQty(item, e.target.value)} value={item?.qty} /></label>
                                                    <label>Price <b>${item?.info?.price}</b></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="float-top-right pad">
                                            <IonIcon onClick={()=>deleteCartItem(item)} icon={closeOutline}/>
                                        </div>
                                        <div className="float-bottom-right-conner pad">
                                            <label style={{
                                                fontSize:"12px",
                                                position:"absolute",
                                                transform: "translateX(-105%)",
                                                color:"darkred",
                                            }}>Checkout </label>
                                            <input type="checkbox" onChange={(e)=>updateCartItemCheckout(item, e.target.checked)} checked={item?.checkout} />
                                        </div>
                                    </div>
                                </div>
                            )):
                            <div>
                                <div className="header">
                                    <b>Your Fashion-App Cart is empty</b>
                                </div>
                                <ShouldSignIn/>
                            </div>
                        }
                    </div>
                    <div className={`cart-right-container ${showSummary}`}>
                        <div hidden={!cart.length} style={{border:"1px solid white",padding:"20px",borderRadius:"5px"}}>
                            <div>ORDER SUMMARY</div>
                            <p style={{fontSize:"12px",color:"orangered"}}>With checkout unchecked, pricing will not be reflected here.</p>
                            <IonItemDivider style={{border:"none"}}/>
                            <div style={{position:"relative"}}>
                                <div style={{float:"left"}}>ITEMS {cart.length}</div>
                                <div style={{float:"right"}}>${subTotal}</div>
                            </div>
                            <IonItemDivider style={{border:"none"}}/>
                            <div style={{marginBottom:"5px"}}>Shipping</div>
                            <select ref={shippRef} onChange={(e)=>setShippingCost(e.target.value)} className="select-input">
                                <option defaultChecked value={4.00}>Standard Delivery $4.00</option>
                                <option value={20.00}>Fast Delivery $20.00</option>
                                <option value={0}>Pick up Free</option>
                            </select>
                            <IonItemDivider style={{border:"none"}}/>
                            <IonItem style={{color:"color: var(--tool-bar)"}} lines="none">
                                <div slot="start">TOTAL COST</div>
                                <div slot="end">${total}</div>
                            </IonItem>
                            <IonItem style={{color:"color: var(--tool-bar)"}} lines="none">
                                <div slot="start">PROMOTIONAL CODE</div>
                                <IonIcon slot="end" icon={addOutline}/>
                            </IonItem>
                            <div style={{marginTop:"20px"}}>
                                <button className="btn-strong">CHECKOUT</button>
                            </div>
                            <div style={{marginTop:"20px"}} className="hide-on-desktop">
                                <button onClick={()=>setShowSummary("hide")} className="btn-strong">CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!showSummary} className="float-bottom-right-conner pad-xl hide-on-desktop">
                    <button hidden={!cart.length} onClick={()=>setShowSummary("")} className="btn-strong">CHECKOUT</button>
                </div>
            </div>
        </IonPage>
    )
}
