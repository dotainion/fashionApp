import { IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useStore } from '../context/Context';
import img from '../images/testdd.jpg';
import { tools } from '../tools/Tools';
import { DashNavWrapper } from '../components/DashNavWrapper';


export const Orders = () =>{
    const { order, initOrder } = useStore();
    return(
        <IonPage>
            <DashNavWrapper onRefresh={initOrder}>
                <div>
                    <IonItemDivider>Orders</IonItemDivider>
                    {order.map((item, key)=>(
                        <IonCard class="inline order-width max-width-on-mobile" key={key}>
                            <div className="divider" style={{height:"250px"}}>
                                <IonCardContent>
                                    <IonThumbnail class="dashboard-image">
                                        <IonImg src={item?.info?.imageSelected}/>
                                    </IonThumbnail>
                                    <IonList style={{borderBottom:"1px solid lightgray"}}/>
                                </IonCardContent>
                                <IonCardContent className="scroll-bar order-detail">
                                    <div>{item?.info?.title}</div>
                                    <div>${item?.info?.price}</div>
                                    <div>color: {item?.info?.colorSelected}</div>
                                    <div>size: {item?.info?.sizeSelected}</div>
                                    <p>{item?.info?.description}</p>
                                </IonCardContent>
                            </div>
                        </IonCard>
                    ))}
                </div>
            </DashNavWrapper>
        </IonPage>
    )
}