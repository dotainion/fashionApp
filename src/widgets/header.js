import { IonButtons, IonHeader, IonItem, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/routes';
import './header.css';

export const Header = (props) =>{
    const history = useHistory();
    return(
        <IonHeader class="header-container">
            <IonRouterOutlet id="menu"></IonRouterOutlet>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle class="header-hover" onClick={()=>{
                    history.push(routes.profile);
                }} slot="end">My Sales</IonTitle>
                <span className="header-cart header-hover" onClick={()=>{
                    if (props.cartClick) props.cartClick();
                }} slot="end">Cart<span hidden={!props?.count} className="header-count-container">
                    <span className="header-count">{props?.count}</span>
                </span></span>
            </IonToolbar>
        </IonHeader>
    )
}