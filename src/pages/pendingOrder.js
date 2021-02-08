import { IonCard, IonContent, IonImg, IonItem, IonLabel, IonPage, IonThumbnail } from '@ionic/react';
import React, { useState } from 'react';
import { Header } from '../widgets/header';
import './pendingOrder.css';


const PendingOrder = () =>{
    const [ordered, setOrdered] = useState([1]);
    return(
        <IonPage>
            <Header
                home
                menu
            />

            <IonContent>
                {
                    ordered.length?
                    ordered.map((item, key)=>(
                        <IonCard key={key}>
                            <IonThumbnail>
                                <IonImg src={item?.record?.image}/>
                            </IonThumbnail>
                            <IonItem lines="full">
                                <IonLabel>{item?.record?.title}</IonLabel>
                            </IonItem>
                            <IonItem lines="full">
                                <IonLabel>{item?.record?.price}</IonLabel>
                            </IonItem>
                            <IonItem lines="full">
                                <IonLabel>{item?.record?.detail}</IonLabel>
                            </IonItem>
                        </IonCard>
                    )):
                    <IonItem>
                        <IonLabel>No Records</IonLabel>
                    </IonItem>
                }
            </IonContent>
        </IonPage>
    )
}

export default PendingOrder;