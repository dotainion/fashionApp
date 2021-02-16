import { IonButton, IonCard, IonCardContent, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import React from 'react';
import './addToCart.css';


export const AddToCart = ({state,onChange,onClose,onAccept,value,title}) =>{
    return(
        <IonList hidden={!state} class="add-to-cart-backdrop">
            <IonCard class="add-to-cart-container">
                <IonCardContent>
                    <IonItem style={{textAlign:"center"}} lines="full">
                        <IonLabel>{title}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Qty</IonLabel>
                        <IonInput value={value} onIonChange={(e)=>{
                            if (onChange) onChange(e);
                        }} type="number"/>
                    </IonItem>
                    <IonItem>
                        <IonButton color="light" onClick={() =>{
                            if (onClose) onClose();
                        }} slot="end">Cancel</IonButton>
                        <IonButton color="light" onClick={() =>{
                            if (onAccept) onAccept();
                        }} slot="end">Save</IonButton>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </IonList>
    )
}