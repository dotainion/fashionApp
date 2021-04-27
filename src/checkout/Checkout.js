import React, { useEffect, useReducer, useRef, useState } from 'react';
import { orderProduct } from '../database/CollectionsRequsts';
import CreditCardInput from 'react-credit-card-input';
import { useStore } from '../context/Context';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';


export const Checkout = ({isOpen,onClose,price}) =>{
    const { user, cart, addCartNotCheckout } = useStore();

    const [cardNumber, setCartNumber] = useState();
    const [expiry, setExpiry] = useState();
    const [cvc, setCvc] = useState();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const countryRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();

    const handleCheckout = async() =>{
        let itemNotCheckout = [];
        for (let item of cart){
            if (item?.checkout){
                let order = JSON.parse(JSON.stringify(item?.info));
                order["qty"] = item?.qty;
                order["itemId"] = item?.id;
                order["sizeSelected"] = item?.sizeSelected;
                order["imageSelected"] = item?.imageSelected;
                await orderProduct(order);
            }else itemNotCheckout.push(item);
        }
        addCartNotCheckout(itemNotCheckout);
    }

    //init user data in input fields
    useEffect(()=>{
        firstNameRef.current.value = user?.firstName;
        lastNameRef.current.value = user?.lastName;
        emailRef.current.value = user?.email;
        cityRef.current.value = user?.city;
        countryRef.current.value = user?.country;
        addressRef.current.value = user?.address;
    },[user]);
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop">
            <div className="float-center checkout-container white-bg pad-xl" onClick={(e)=>e.stopPropagation()} style={{borderRadius:"5px"}}>
                <IonIcon onClick={onClose} class="float-top-right text-hover" style={{margin:"10px"}} icon={closeOutline}/>
                <div className="add-input-divider">
                    <div className="add-input-container" style={{marginRight:"5px"}}>
                        <div>First Name</div>
                        <input ref={firstNameRef} type="text" placeholder="First name" className="add-input"/>
                    </div>
                    <div className="add-input-container" style={{marginLeft:"5px"}}>
                        <div>Last Name</div>
                        <input ref={lastNameRef} type="text" placeholder="Last name" className="add-input"/>
                    </div>
                </div>
                <div className="add-input-container">
                    <div>Email</div>
                    <input ref={emailRef} type="email" placeholder="example@gmail.com" className="add-input"/>
                </div>
                <div className="add-input-container">
                    <div>Country</div>
                    <input ref={countryRef} type="address" placeholder="Country" className="add-input"/>
                </div>
                <div className="add-input-container">
                    <div>City</div>
                    <input ref={cityRef} type="address" placeholder="City" className="add-input"/>
                </div>
                <div className="add-input-container">
                    <div>Address</div>
                    <input ref={addressRef} type="address" placeholder="Address" className="add-input"/>
                </div>
                <CreditCardInput
                    cardNumberInputProps={{ value: cardNumber, onChange: setCartNumber }}
                    cardExpiryInputProps={{ value: expiry, onChange: setExpiry }}
                    cardCVCInputProps={{ value: cvc, onChange: setCvc }}
                    fieldClassName="input"
                    containerStyle={{
                        width:"100%",
                        border:"1px solid lightgray",
                        borderRadius:"5px"
                    }}
                />
                <div style={{marginTop:"40px"}}>
                    <button onClick={handleCheckout} className="btn-strong pad">PAY ${price}</button>
                </div>
            </div>
        </div>
    )
}

