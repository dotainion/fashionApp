import { IonAlert, IonButton, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonThumbnail } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './cartDisplay.css';
import { cart } from './utils';
import noItemImage from '../images/shopping-bags.jpg';
import { useHistory } from 'react-router';
import { routes } from '../global/routes';
import tools from '../components/Tools';
import { DeleteConfirm } from '../widgets/deleteConfirm';

let elementId = [];
const removeDuplicate = () =>{
    var uniqueArray = [];
    for(var value of elementId){
        if(uniqueArray.indexOf(value) === -1){
            uniqueArray.push(value);
        }
    }
    elementId = uniqueArray;
}

export const CartDisplay = (props) =>{
    const history = useHistory();
    let cartListCheck = useRef();
    cartListCheck = cart.get().length;
    const [grandTotal, setGrandTotal] = useState();
    const [disableCheckout, setDisableCheckout] = useState({
        state: false,
        color: "",
        shadow: ""
    })
    const [showAlert, setShowAlert] = useState({
        state: false,
        data: null
    });
    const appendElementId = (id) =>{
        elementId.push(id);
        return id;
    }
    const updateSubTotal = (id, qty, price) =>{
        const sub = parseFloat(price) * parseInt(qty);
        const el = document.getElementById(id);
        if (el) el.innerHTML = sub;
        console.log(qty, price)
    }
    const updateGrandTotal = () =>{
        removeDuplicate();
        let total = 0;
        for (let id of elementId){
            const el = document.getElementById(id);
            if (el) total += parseFloat(el.innerHTML);
        }
        setGrandTotal(total);
    }
    useEffect(()=>{
        if (cartListCheck <= 0){
            setDisableCheckout({
                state: true,
                color: "gray",
                shadow: "1px 1px 2px black"
            });
        }else{
            setDisableCheckout({
                state: false,
                color: "",
                shadow: ""
            });
        }
        
    },[cartListCheck]);
    return(
        <IonModal isOpen={props.state} onDidDismiss={()=>{
            if (props.onClose) props.onClose();
        }} onDidPresent={()=>{
            updateGrandTotal();
        }} class="cart-main-container">
            <DeleteConfirm
                state={showAlert.state}
                onClose={()=>{
                    setShowAlert({
                        state: false,
                        data: null
                    });
                }}
                onAccept={()=>{
                    cart.delete(showAlert.data?.id);
                    if (props.refresh) props.refresh();
                    updateGrandTotal();
                }}
                onDecline={()=>{
                    setShowAlert({
                        state: false,
                        data: null
                    });
                }}
            />
            <div className="cart-close">
                <IonIcon class="cart-hover" onClick={()=>{
                    if (props.onClose) props.onClose();
                }} icon={closeOutline}/>
            </div>
            <IonItem lines="full">
                <IonLabel>Cart Items ({0})</IonLabel>
            </IonItem>
            <IonList class="cart-header-container">
                <IonLabel class="cart-header-product">Product</IonLabel>
                <IonLabel class="cart-header">Price</IonLabel>
                <IonLabel class="cart-header">Quantity</IonLabel>
                <IonLabel class="cart-header">Sub Total</IonLabel>
            </IonList>
            <IonContent>
                {
                    props?.data?.length?
                    props?.data?.map((item, key)=>(
                        <IonList key={key}  className="cart-image-main-container">
                            <div className="cart-image-title-container">
                                <IonImg className="cart-image-image" src={item.record.image}/>
                                <IonLabel>{item.record.title || "None"}</IonLabel>
                            </div>
                            <div className="cart-item-info">
                                <IonLabel class="cart-costs">{item.record.price || "None"}</IonLabel>
                            </div>
                            <div className="cart-item-info">
                                <input className="cart-input cart-costs" onChange={(e)=>{
                                    let value = e.target.value;
                                    if (value < 1){
                                        let element = document.getElementById(item.id);
                                        element.value = 1;
                                        updateSubTotal(`${item.id}sub`,1,item?.record?.price);
                                    }else{
                                        cart.updateQty(item.id,value);
                                        updateSubTotal(`${item.id}sub`,value,item?.record?.price);
                                    }
                                    updateGrandTotal();
                                }} type="number" id={item.id} defaultValue={item.qty}/>
                            </div>
                            <div className="cart-item-info">
                                <IonLabel id={appendElementId(`${item.id}sub`)} class="cart-costs">{parseFloat(item?.record?.price) * parseInt(item.qty)}</IonLabel>
                            </div>
                            <IonIcon class="cart-delete cart-hover" onClick={()=>{
                                setShowAlert({
                                    state: true,
                                    data: item
                                });
                            }} icon={closeOutline}/>
                        </IonList>
                    )):
                    <IonList>
                        <IonThumbnail class="cart-no-item-image-container">
                            <IonImg src={noItemImage}/>
                        </IonThumbnail>
                        <IonLabel class="cart-no-item-content">Cart is Empty</IonLabel>
                    </IonList>
                }
            </IonContent>
            <IonItem class="cart-total-container">
                <IonLabel slot="start">Grand Total</IonLabel>
                <IonLabel slot="end">${grandTotal}</IonLabel>
            </IonItem>
            <IonLabel class="cart-checkout-info">Shipping cost will be calculated based on your shipping address in next page</IonLabel>
            <IonList className="cart-button-container">
                <div className="cart-continue-button cart-click" onClick={()=>{
                    if (props.onClose) props.onClose();
                }}>Continue Shopping</div>
                <div className="cart-checkout-button cart-click" onClick={()=>{
                    if (!disableCheckout.state){
                        tools.lastRoute(routes.checkout);
                        history.push(routes.checkout);
                        if (props.onClose) props.onClose();
                    }
                }} style={{
                    backgroundColor:disableCheckout.color,
                    boxShadow:disableCheckout.shadow
                }}>Proceed To Checkout</div>
            </IonList>
        </IonModal>
    )
}