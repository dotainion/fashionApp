import { IonButton, IonCard, IonCardContent, IonItem, IonLabel, IonList } from '@ionic/react';
import React from 'react';
import './fashionAlert.css';


/**
 * 
 * @param {<IonAlert
                    isOpen={this.showAlert}
                    onDidDismiss={() =>{
                        this.showAlert = false;
                        this.setState({showAlert:this.showAlert});
                    }}
                    cssClass=''
                    header="Alert!!"
                    subHeader="Duplicate"
                    message="Item already in you cart"
                    buttons={['OK']}
                    duration={200}
                />} param0 
 */
export const FashionAlert = ({state,message,header,subHeader,onClose}) =>{
    return(
        <IonList hidden={!state} className="fashion-alert-backdrop">
            <IonCard className="fashion-alert-container">
                <IonCardContent>
                    <IonList class="fashion-alert-header">
                        <IonLabel>{header || "Alert!!"}</IonLabel>
                    </IonList>
                    <IonList class="fashion-alert-sub-header">
                        <IonLabel>{subHeader || "Attention!!"}</IonLabel>
                    </IonList>
                    <IonList class="fashion-alert-message" color="dark">{message}</IonList>   
                    <IonItem>
                        <IonButton color="light" onClick={()=>{
                            if (onClose) onClose();
                        }} slot="end">OK</IonButton>
                    </IonItem>                 
                </IonCardContent>
            </IonCard>
        </IonList>
    )
}