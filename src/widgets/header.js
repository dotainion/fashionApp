import { IonButtons, IonHeader, IonItem, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../auth/authentication';
import tools from '../components/Tools';
import { routes } from '../global/routes';
import './header.css';

const checkSingoutLoop = () =>{
    setInterval(async()=>{
        let element = document.getElementById("show-signout-button");
        if (auth.isLogin()) element.hidden = false;
        else element.hidden = true;
    },1000);
}

export const Header = (props) =>{
    const history = useHistory();

    useEffect(()=>{
        checkSingoutLoop();
    },[])
    return(
        <IonHeader class="header-container">
            <IonRouterOutlet id="menu"></IonRouterOutlet>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <div slot="end">
                    <span id="show-signout-button">
                        <IonTitle hidden={!props.signout} style={{display:"inline-block"}} class="header-hover" onClick={async()=>{
                            await auth.signOut();
                        }} slot="end">SignOut</IonTitle>
                    </span>
                    <IonTitle hidden={!props.home} style={{display:"inline-block"}} class="header-hover" onClick={()=>{
                        history.push(routes.home);
                    }} slot="end">Home</IonTitle>
                    <IonTitle hidden={!props.sales} style={{display:"inline-block"}} class="header-hover" onClick={()=>{
                        tools.lastRoute(routes.profile);
                        history.push(routes.profile);
                    }} slot="end">My Sales</IonTitle>
                    <IonTitle hidden={!props.cart} style={{display:"inline-block"}} className="header-cart header-hover" onClick={()=>{
                        if (props.cartClick) props.cartClick();
                    }} slot="end">Cart<span hidden={!props?.count} className="header-count-container">
                        <span className="header-count">{props?.count}</span>
                    </span></IonTitle>
                </div>
            </IonToolbar>
        </IonHeader>
    )
}