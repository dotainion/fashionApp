import { IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { pageNavigators } from '../content/contents';
import { useStore } from '../context/Context';
import img from '../images/testdd.jpg';
import { tools } from '../tools/Tools';
import { DashNavWrapper } from '../components/DashNavWrapper';
import { NavSideBar } from '../components/NavSideBar';


export const Inventory = () =>{

    return(
        <IonPage>
            <DashNavWrapper>
                <div>
                    some inventory data
                </div>
            </DashNavWrapper>
        </IonPage>
    )
}