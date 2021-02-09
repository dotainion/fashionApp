import { IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonModal, IonPage, IonThumbnail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import tools from '../components/Tools';
import { data } from '../database/database';
import { Maps } from '../map/googleMap';
import { Header } from '../widgets/header';
import { IoInformationCircleSharp } from 'react-icons/io5';
import './pendingOrder.css';
import { LabelTag } from '../widgets/labelTag';
import { closeOutline } from 'ionicons/icons';


const PendingOrder = () =>{
    const [statusTag, setStatusTag] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [ordered, setOrdered] = useState([]);
    const [openOrderInfo, setOpenOrderInfo] = useState({
        state: false,
        data: null
    });
    const initiealizeOrder = async() =>{
        setShowLoading(true);
        const user = tools.getCreds();
        const response = await data.getClientOrder(user?.id);
        console.log(response)
        setTimeout(() => {
            setOrdered(response);
            setShowLoading(false);
        }, 1000);
    }
    useEffect(()=>{
        initiealizeOrder();
    },[]);
    return(
        <IonPage>
            <Header
                home
                menu
            />

            <IonLoading
                cssClass=''
                isOpen={showLoading}
                onDidDismiss={() =>{
                    setShowLoading(false)
                }}
                message={'Please wait...'}
                duration={5000}
            />

            <IonModal onDidDismiss={()=>{
                setOpenOrderInfo({state: false,data:null});
            }} isOpen={openOrderInfo.state}>
                <IonIcon icon={closeOutline} onClick={()=>{
                    setOpenOrderInfo({state: false,data:null});
                }} class="pending-order-close pending-order-close-hover"/>
                <IonItem class="pending-order-header" lines="full">
                    <IonLabel>Order Status</IonLabel>
                </IonItem>
                <IonContent>
                    <IonItem>
                        <IonLabel>Comming Soon</IonLabel>
                    </IonItem>
                </IonContent>
            </IonModal>

            <IonItem class="pending-order-header" lines="full">
                <IonLabel>Pending Order</IonLabel>
            </IonItem>
            <IonContent>
                <IonList class="pending-order-main-container">
                    <IonList class="pending-order-list-container">
                        {
                            ordered.length?
                            ordered.map((item, key)=>(
                                <IonCard key={key}>
                                    <div className="pending-order-info-button-container">
                                        <IoInformationCircleSharp onClick={()=>{
                                            setOpenOrderInfo({
                                                state: true,
                                                data:item
                                            });
                                        }} onMouseEnter={()=>{
                                            setStatusTag(true);
                                        }} onMouseLeave={()=>{
                                            setStatusTag(false);
                                        }}/>
                                        <LabelTag state={statusTag} text="Status"/>
                                    </div>
                                    
                                    <IonCardContent>
                                        <IonThumbnail class="pending-order-item-image">
                                            <IonImg src={item?.record?.image}/>
                                        </IonThumbnail>
                                        <div className="pending-order-item-address">
                                            <div>{item?.detail?.orderDate}</div>
                                            <div>{item?.detail?.state}</div>
                                            <div>{item?.detail?.city}</div>
                                            <div>{item?.detail?.address}</div>
                                        </div>
                                        <div className="pending-order-item-info">
                                            <div>{item?.record?.title}</div>
                                            <div>${item?.record?.price}</div>
                                            <div>{item?.record?.detail}</div>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            )):
                            <IonItem>
                                <IonLabel>No Records</IonLabel>
                            </IonItem>
                        }
                    </IonList>
                    <IonList class="pending-order-right-container">
                        <Maps/>
                    </IonList>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default PendingOrder;