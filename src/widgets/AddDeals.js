import { IonButton, IonCardContent, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useRef } from 'react';


export const AddDeals = ({isOpen,onClose,onSubmit,record,onError}) =>{
    const newPriceRef = useRef();

    const triggerError = (msg) =>{
        if (typeof onError === "function") onError(msg);
    }

    const triggerSubmit = () =>{
        if (typeof onSubmit === "function"){
            if (record?.newPrice === newPriceRef.current.value){
                triggerError("No Change detected")
            }else if (!newPriceRef.current.value){
                triggerError("No discount price detected")
            }else{
                const deal = {
                    newPrice: newPriceRef.current.value
                }
                onSubmit(deal);
                if (typeof onClose === "function") onClose();
            }
        }
    }

    //initialize record value in fields
    useEffect(()=>{
        if (Object.keys(record || {}).length > 0){
            newPriceRef.current.value = record?.newPrice;
        }
    },[record]);
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop">
            <div className="float-center white-bg" onClick={(e)=>e.stopPropagation()}>
                <IonList>
                    <IonIcon onClick={onClose} class="float-top-right text-hover" style={{margin:"5px"}} icon={closeOutline}/>
                    <IonCardContent>
                        <p className="pad dark white-fg" style={{textAlign:"center"}}>
                            Add discount price
                        </p>
                        <IonItem>
                            <IonLabel position="floating">New price</IonLabel>
                            <IonInput ref={newPriceRef} class="ion-input-dollar-sign" />
                        </IonItem>
                        <IonItem lines="full">
                            <IonButton color="dark" onClick={triggerSubmit} slot="end">Done</IonButton>
                        </IonItem>
                    </IonCardContent>
                </IonList>
            </div>
        </div>
    )
}