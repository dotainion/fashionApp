import { LineChart } from '../charts/LineChart';
import { PieCart } from '../charts/PieCart';
import { IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { pageNavigators } from '../content/contents';
import { useStore } from '../context/Context';
import { tools } from '../tools/Tools';
import { NavSideBar } from '../components/NavSideBar';
import { DashNavWrapper } from '../components/DashNavWrapper';


export const Analytics = () =>{
 
    return(
        <IonPage>
            <DashNavWrapper>
                <div>
                    <IonItemDivider>Payment Analytics</IonItemDivider>
                    <div style={{marginTop:"40px",marginBottom:"40px"}}>
                        <div className="item-center chart-size chart-pad">
                            <LineChart isOpen={true}/>
                        </div>
                        <IonItemDivider/>
                        <IonItemDivider>Payment Analytics</IonItemDivider>
                        <div className="item-center chart-size chart-pad">
                            <PieCart isOpen={true}/>
                        </div>
                    </div>
                </div>
            </DashNavWrapper>
        </IonPage>
    )
}