import React from 'react';
import { orderProduct } from '../database/CollectionsRequsts';


export const Checkout = ({isOpen,onClose}) =>{
    const handleCheckout = async() =>{
        const order = {

        }
        await orderProduct(order);
    }
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop">
            <div className="float-center white-bg pad-xl" onClick={(e)=>e.stopPropagation()}>
                sdafsdf
            </div>
        </div>
    )
}