import { IonAlert, IonButton, IonCard, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonThumbnail, useIonViewDidLeave, useIonViewWillEnter, withIonLifeCycle } from '@ionic/react';
import { addOutline, closeOutline, ellipsisVerticalOutline, fastFoodOutline, reorderFourOutline } from 'ionicons/icons';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Checkout } from '../checkout/Checkout';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';
import img from '../images/testdd.jpg'
import { ShoppAdvert } from '../widgets/Advertise';
import { DealContainer } from '../widgets/DealContainer';
import { NavSideBar, NavSideWithWrapper } from '../widgets/NavSideBar';
import { ShouldSignIn } from '../widgets/ShouldSignIn';


export const Cart = () =>{
    const history = useHistory();
    const { cart, updateCartItemQty, updateCartItemCheckout, deleteCartItem } = useStore();
    const [showNav, setShowNav] = useState(false);
    //this will hide or show summary as a popup of in mobile view
    const [showSummary, setShowSummary] = useState("hide");
    //costing summary
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    //show checkout input
    const [showCheckout, setShowCheckout] = useState(false);

    //open confirm delete popup
    const [showConfirmDelete, setShowConfirmDelete] = useState({state:false, obj:null});

    //this is use together with shippingCost to get current value on render
    //as shippingCost is use to trigger useEffect functons with select option element
    const shippRef = useRef();

    const navToggle = () =>{
        if (showNav) setShowNav(false);
        else setShowNav(true);
    }

    //set title lenght if too long to make short with ...
    const configureTitle = (value) =>{
        if (value && value.split("").length > 20){
            let valued = [];
            let index = 0;
            for (let elem of value.split("")){
                index ++;
                if (index < 17) valued.push(elem);
                if (index > 17){
                    valued = [...valued, "..."];
                    return valued.join("");
                }
            }
        }
        return value;
    }

    useIonViewWillEnter(()=>{
        setShowNav(false);
    });

    //calcluate total and subtotal on listen change
    useEffect(()=>{
        let total = 0;
        for (let item of cart){
            if (item.checkout){
                const qty = parseInt(item?.qty || 1);
                //if deal then add deal else add price
                const price = parseFloat(item?.info?.deal?.newPrice || item?.info?.price || 0);
                total = total + (qty * price);
            }
        }
        setSubTotal(total);
        setTotal(subTotal + parseFloat(shippingCost || shippRef.current.value));
    },[cart,subTotal,shippingCost]);
    return(
        <IonPage>
            <div className="background">
                <div hidden={cart.length} className="float-center border pad-xl" style={{backgroundColor:"white"}}>
                    <ShoppAdvert/>
                </div>

                <Checkout
                    isOpen={showCheckout}
                    onClose={()=>setShowCheckout(false)}
                    price={total}
                />

                <NavSideWithWrapper
                    isOpen={showNav}
                    top="80px"
                    onClose={navToggle}
                />

                <IonAlert
                    isOpen={showConfirmDelete.state}
                    onDidDismiss={()=>setShowConfirmDelete({state:false,obj:null})}
                    backdropDismiss={false}
                    cssClass='alert-popup'
                    header={"Confirmation!!"}
                    subHeader={"Are you sure you will like to delete this item?"}
                    message={"Item deleted cannot be recover and availability will not be guaranteed"}
                    buttons={[
                        {
                            text: 'Close',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                
                            }
                        },{
                            text: 'continue',
                            handler: () => {
                                deleteCartItem(showConfirmDelete.obj);
                            }
                        }
                    ]}
                />

                <div className="divider d-flex-on-mobile" style={{position:"relative",zIndex:"11"}}>
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
                                                    <label><b>{configureTitle(item?.info?.title)}</b></label>
                                                    <label>Color <b>{item?.info?.color}</b></label>
                                                    <label>Size <b>{item?.sizeSelected || item?.info?.sizes?.[0]}</b></label>
                                                </div>
                                                <div className="max-width cart-texts">
                                                    <label>Qty <input className="qty-input" onChange={(e)=>updateCartItemQty(item, e.target.value)} value={item?.qty} /></label>
                                                    <label hidden={item?.info?.deal}>Price <b>${item?.info?.price}</b></label>
                                                    <DealContainer product={item}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="float-top-right text-hover" style={{margin:"10px"}}>
                                            <IonIcon onClick={()=>setShowConfirmDelete({state:true,obj:item})} icon={closeOutline}/>
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
                            <p style={{fontSize:"12px",color:"dodgerblue"}}>Any item that is not checked, its pricing will not be reflected.</p>
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
                                <button onClick={()=>setShowCheckout(true)} className="btn-strong">CHECKOUT</button>
                            </div>
                            <div style={{marginTop:"20px"}} className="hide-on-desktop">
                                <button onClick={()=>setShowSummary("hide")} className="btn-strong">CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!showSummary} style={{position:"absolute",zIndex:"12"}} className="float-bottom-right-conner pad-xl hide-on-desktop">
                    <button hidden={!cart.length} onClick={()=>setShowSummary("")} className="btn-strong">SUMMARY</button>
                </div>
            </div>
        </IonPage>
    )
}
