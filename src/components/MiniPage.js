import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons, IonItem, IonContent, IonButton, IonLabel, IonModal, IonBackButton, IonCard, IonImg, IonThumbnail, IonItemDivider, IonInput } from '@ionic/react';
import tools from './Tools';
import { cart, close } from 'ionicons/icons';
import './Widgets.css';
import shoppinBags from './../images/shopping-bags.jpg';
import IMG from '../components/Images';


class ModelsPopUp{
    favorites(){
        const [ modelShow, setModelShow ] = useState(false);
        return(
            <>
                <IonModal isOpen={modelShow} onDidDismiss={()=>{
                    setModelShow(false);
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)} slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{
                                    setModelShow(false);
                                }}/>
                            </IonButtons>
                            <IonTitle>Favorites</IonTitle>
                            <IonButtons hidden={tools.compare(tools.platform(),true,true,false)} slot="end">
                                <IonIcon style={{fontSize:"30px"}} icon={close} onClick={()=>{
                                    setModelShow(false);
                                }}/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div style={{marginTop:"40%",marginBottom:"40%",textAlign:"center"}}>
                            <IonLabel>Comming soon</IonLabel>
                        </div>

                    </IonContent>

                </IonModal>

                <IonButton hidden id="show-favorites" onClick={()=>{setModelShow(true)}}/>
            </>
        )
    }

    Cart(props){
        /*cart counter is in Widgets.js file in header*/
        const [ closeColor, setCloseColor ] = useState("primary");
        const [ hilightCheckoutBg, setHilightCheckoutBg ] = useState("Olive");
        const [ hilightShoppingBg, setHilightShoppingBg ] = useState("Olive");
        const [ systemUpdate, setSystemUpdate ] = useState(false)
        const update = () =>{
            if (systemUpdate){
                setSystemUpdate(false);
            }else{
                setSystemUpdate(true);
            }
        }
        return(
            <>
                <IonModal isOpen={props.state} onDidDismiss={()=>{
                    if (props.onClose) props.onClose();
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)} slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{
                                    if (props.onClose) props.onClose();
                                }}/>
                            </IonButtons>
                            <IonItem lines="none" style={{width:"50%"}}>
                                <IonTitle>Cart</IonTitle>
                                <IonIcon icon={cart}/>
                            </IonItem>
                            <IonItem hidden={tools.compare(tools.platform(),true,true,false)} slot="end" lines="none">
                                <IonIcon color={closeColor} icon={close} onClick={()=>{
                                   if (props.onClose) props.onClose();
                                }} onMouseEnter={()=>{
                                    setCloseColor("danger");
                                }} onMouseLeave={()=>{
                                    setCloseColor("primary");
                                }}/> 
                            </IonItem>
                        </IonToolbar>
                    </IonHeader>
                    
                    <IonItem hidden={!tools.cartEmpty()} color="medium">
                        <IonLabel style={{textAlign:"center",color:"navy"}}>Product</IonLabel>
                        <IonLabel style={{textAlign:"center",color:"navy"}}>Info/Price</IonLabel>
                        <IonLabel style={{textAlign:"center"}}>Quantity</IonLabel>
                    </IonItem>

                    <IonContent>
                        {
                            tools.cartItems.length ?
                            tools.cartItems.map((post, i)=>
                                <IonCard key={i}>
                                    <IonItem>
                                        <IonThumbnail style={{width:tools.compare(tools.platform(),true,"105px","210px"),
                                                height:tools.compare(tools.platform(),true,"80px","160px")}} slot="start">
                                            <IonImg src={IMG.base64+post.img} />
                                        </IonThumbnail>
                                        {/*to display item details in cart*/}
                                        <div style={{color:"navy",width:"100%"}}>
                                            <p style={{textAlign:"center"}}>{post.title}</p>
                                            <p style={{textAlign:"center",color:"red"}}>{post.price}</p>
                                            <p style={{textAlign:"center"}}>{post.detail}</p>
                                        </div>
                                        {/*to change quantity in cart*/}
                                        <div style={{color:"navy",maxWidth:tools.compare(tools.platform(),true,"50px","70px"),margin:"20px"}}>
                                            <div style={{textAlign:"center",width:"100%"}}>
                                            <IonLabel style={{textAlign:"center"}}>Qty</IonLabel>
                                            <IonInput type="number" style={{border:"1px solid #000",height:"20px",
                                            borderRadius:"25px",minWidth:"40px",textAlign:"left"}} value={post.Qty} onIonChange={e=>{
                                                var qty = e.detail.value;
                                                if (qty === ""){
                                                    tools.cartItems[i].Qty = 1;
                                                }else if (qty === "0"){
                                                    tools.cartItems[i].Qty = 1;
                                                }else{
                                                    tools.cartItems[i].Qty = qty;
                                                }
                                            }}/></div>
                                        </div>
                                        {/*to delete from cart*/}
                                        <div style={{width:"20px",height:"20px",textAlign:"center",cursor:"pointer"}}>
                                            <div className="removeHover" onClick={()=>{
                                                tools.cartItems.splice(i,1);
                                                tools.clickById("cart-de-counter");
                                                tools.saveCartItems(tools.cartItems);
                                                update();
                                            }}>X</div>
                                        </div>
                                    </IonItem>
                                </IonCard>
                            ):
                            <div hidden={tools.cartEmpty()} style={{textAlign:"center"}}>
                                <IonThumbnail style={{width:"100%",height:"100%"}}>
                                    <IonImg src={shoppinBags}/>
                                </IonThumbnail>
                                <div><b>Your shopping cart is empty</b></div>
                                <IonButton color="light" onClick={()=>{
                                    if (props.onClose) props.onClose();
                                }}>Continue shopping</IonButton>
                            </div>
                        }
                    </IonContent>
                    
                    <div hidden={!tools.cartEmpty()}>
                        <IonItemDivider style={{marginTop:"0px"}}></IonItemDivider>
                        <IonItem style={{color:"red"}} lines="none">
                            <IonLabel>Grand Total</IonLabel>
                            <IonLabel>{"$"+tools.cartTotal()}</IonLabel>
                        </IonItem>
                        <p style={{marginBottom:"20px",marginLeft:"10px"}}>{tools.MSG.cartMsg}</p>
                        <IonItem>
                            <div style={{width:"100%",color:"white"}}>
                                <div id="o" style={{backgroundColor:hilightShoppingBg,float:"left",padding:"5px",cursor:"pointer"}} onMouseEnter={()=>{
                                    setHilightShoppingBg("gray");
                                }} onMouseLeave={()=>{
                                    setHilightShoppingBg("Olive");
                                }} onClick={()=>{
                                    //set all to default color when closing
                                    //to avoid highlight color when opening model
                                    setHilightShoppingBg("Olive");
                                    setHilightCheckoutBg("Olive");
                                    if (props.onClose) props.onClose();
                                }}>
                                    <b>Continue Shopping</b>
                                </div>
                                <div id="p" style={{backgroundColor:hilightCheckoutBg,float:"right",padding:"5px",cursor:"pointer"}} onMouseEnter={()=>{
                                    setHilightCheckoutBg("gray");
                                }} onMouseLeave={()=>{
                                    setHilightCheckoutBg("Olive");
                                }} onClick={()=>{
                                    console.log("continue shopping");
                                }}>
                                    <b style={{color:"darkGreen"}}>Proceed to Checkout</b>
                                </div>
                            </div>
                        </IonItem>
                    </div>
                </IonModal>
            </>
        )
    }
}

var modelPopUp = new ModelsPopUp()
export default modelPopUp;