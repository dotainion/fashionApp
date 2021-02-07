import { IonButton, IonButtons, IonHeader, IonIcon, IonItem, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, star } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../auth/authentication';
import { Menu } from '../components/Menu';
import tools from '../components/Tools';
import { routes } from '../global/routes';
import './header.css';



export const Header = (props) =>{
    const history = useHistory();
    const [menuState, setMenuState] = useState(false);
    return(
        <>
        <IonHeader class="header-container">
            <IonToolbar>
                <IonButtons hidden={!props.menu} slot="start">
                    <IonMenuButton onClick={()=>{
                        setMenuState(true);
                        setMenuState(false);
                    }}/>
                </IonButtons>
                <IonIcon hidden={!props.toggleMenu} class="header-toggle-menu" onClick={()=>{
                    if (props.toggleMenu.onClick) props.toggleMenu.onClick();
                }} icon={props?.toggleMenu?.icon}/>
                <div slot="end">
                    <span id="show-signout-button">
                        <span hidden={!props.signout} className="header-title header-hover" onClick={async()=>{
                            await auth.signOut();
                            let element = document.getElementById("show-signout-button");
                            if (element) element.hidden = true;
                        }} slot="end">Signout</span>
                    </span>
                    <span hidden={!props.home} className="header-title header-hover" onClick={()=>{
                        history.push(routes.home);
                    }} slot="end">Home</span>
                    <span hidden={!props.sales} className="header-title header-hover" onClick={()=>{
                        tools.lastRoute(routes.inventory);
                        history.push(routes.inventory);
                    }} slot="end">Sales</span>
                    <span hidden={!props.cart} className="header-cart header-hover" onClick={()=>{
                        if (props.cartClick) props.cartClick();
                    }} slot="end">Cart<span hidden={!props?.count} className="header-count-container">
                        <span className="header-count">{props?.count}</span>
                    </span></span>
                </div>
            </IonToolbar>
        </IonHeader>
        <Menu id="menu" disable={menuState} cart={props.cartClick}/>
        <IonRouterOutlet id="menu"/>
        </>
    )
}