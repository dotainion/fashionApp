import { IonButtons, IonHeader, IonIcon, IonItem, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../auth/authentication';
import { Menu } from '../components/Menu';
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
        <>
        <IonHeader class="header-container">
            <IonRouterOutlet id="menu"></IonRouterOutlet>
            <IonToolbar>
                <IonButtons hidden={!props.menu} slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonIcon hidden={!props.toggleMenu} class="header-toggle-menu" onClick={()=>{
                    if (props.toggleMenu.onClick) props.toggleMenu.onClick();
                }} icon={props?.toggleMenu?.icon}/>
                <div slot="end">
                    <span id="show-signout-button">
                        <span hidden={!props.signout} className="header-title header-hover" onClick={async()=>{
                            await auth.signOut();
                        }} slot="end">SignOut</span>
                    </span>
                    <span hidden={!props.home} className="header-title header-hover" onClick={()=>{
                        history.push(routes.home);
                    }} slot="end">Home</span>
                    <span hidden={!props.sales} className="header-title header-hover" onClick={()=>{
                        tools.lastRoute(routes.profile);
                        history.push(routes.profile);
                    }} slot="end">My Sales</span>
                    <span hidden={!props.cart} className="header-cart header-hover" onClick={()=>{
                        if (props.cartClick) props.cartClick();
                    }} slot="end">Cart<span hidden={!props?.count} className="header-count-container">
                        <span className="header-count">{props?.count}</span>
                    </span></span>
                </div>
            </IonToolbar>
        </IonHeader>
        <Menu/>
        </>
    )
}