import { IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonItemDivider, IonNote, IonButton } from '@ionic/react';
  
import React, { useState } from 'react';
import { bookmarkOutline, heartOutline, heartSharp, cartOutline, cartSharp, logInOutline, logInSharp, arrowBackSharp } from 'ionicons/icons';
import './Menu.css';
import tools from './Tools';


export const Menu = ({id,disable,cart}) =>{
    const appPages = [
        {
            title: 'Cart',
            id: 'show-cart',
            icon: cartOutline,
            url: "#",          
            cmd: ()=>{
                if (cart) cart();
            },
            hide: !cart
        },{
            title: 'Login',
            id: 'login',
            icon: logInOutline,
            url: "#",           
            cmd: null,
            hide: false
        },{
            title: 'Favorites',
            id: 'show-favorites',
            icon: heartOutline,
            url: "#",           
            cmd: null,
            hide: false
        }
    ];
    
    const labels = [
        {
            title: 'Contact us',
            id: "show-contact-us",
            icon: bookmarkOutline,
            url: "#",
            cmd: null,
            hide: false
        },{
            title: 'About us',
            id: "show-about-us",
            icon: bookmarkOutline,
            url: "#",
            cmd: null,
            hide: false
        },{
            title: 'Privacy/Policy',
            id: "show-privacy",
            icon: bookmarkOutline,
            url: "#",
            cmd: null,
            hide: false
        },{
            title: 'Terms and condition',
            id: "show-terms",
            icon: bookmarkOutline,
            url: "#",
            cmd: null,
            hide: false
        }
    ];
    
    const toolSection = [
        {
            title: 'Help',
            id: "show-help",
            icon: bookmarkOutline,
            url: "#",
            cmd: null,
            hide: false
        },{
            title: 'Settigns',
            id: "settings",
            icon: bookmarkOutline,
            url: "#",
            cmd: null,
            hide: false
        }
    ];
    
    return (
        <IonMenu disabled={disable} contentId={"menu"} id={id} type="overlay" class="menu-main-container">
            <IonContent class="menu-container">
                <IonList>
                    <IonListHeader class="menu-item-header">FASHION</IonListHeader>
                    &nbsp;&nbsp;
                    <IonNote class="menu-item-header">Fashion App</IonNote>
                    {appPages.map((appPage, index) => {
                    return (
                        <IonMenuToggle hidden={appPage.hide} key={index} autoHide={false}>
                            <IonItem key={index} class="menu-items" routerLink={appPage.url} onClick={()=>{
                                //closeOnClick();
                                //if (appPage.cmd) appPage.cmd();
                                console.log("this is a test")
                            }} routerDirection="none" lines="none">
                                <IonIcon onClick={()=>{console.log("this is a test")}} class="menu-icon" slot="start" icon={appPage.icon} />
                                <IonLabel>{appPage.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    );
                    })}
                </IonList>

                <IonList>
                    <IonListHeader class="menu-item-header">Help/Information</IonListHeader>
                    {labels.map((label, index) => (
                    <IonMenuToggle hidden={label.hide} key={index} autoHide={false}>
                        <IonItem routerLink={label.url} onClick={()=>{
                                if (label.cmd) label.cmd();
                            }} routerDirection="none" class="menu-items" lines="none">
                            <IonIcon class="menu-icon" slot="start" icon={label.icon} />
                            <IonLabel>{label.title}</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    ))}
                </IonList>

                <IonList>
                    <IonListHeader class="menu-item-header">Settings</IonListHeader>
                    {toolSection.map((settings, index) => (
                    <IonMenuToggle hidden={settings.hide} key={index} autoHide={false}>
                        <IonItem class="menu-items" routerLink={settings.url} onClick={()=>{
                                if (settings.cmd) settings.cmd();
                            }} routerDirection="none" lines="none">
                            <IonIcon class="menu-icon" slot="start" icon={settings.icon} />
                            <IonLabel>{settings.title}</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    ))}
                </IonList>
            </IonContent>   
        </IonMenu>
    );
};


  