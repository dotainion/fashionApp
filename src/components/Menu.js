import { IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonItemDivider, IonNote, IonButton } from '@ionic/react';
  
import React, { useState } from 'react';
import { bookmarkOutline, heartOutline, heartSharp, cartOutline, cartSharp, logInOutline, logInSharp, arrowBackSharp } from 'ionicons/icons';
import './Menu.css';
import tools from './Tools';

  
const appPages = [
    {
        title: 'Cart',
        id: 'show-cart',
        iosIcon: cartOutline,
        mdIcon: cartSharp,
    },{
        title: 'Login',
        id: 'login',
        iosIcon: logInOutline,
        mdIcon: logInSharp,
    },{
        title: 'Favorites',
        id: 'show-favorites',
        iosIcon: heartOutline,
        mdIcon: heartSharp,
    }
];

const labels = [
    {
        title:'Contact us',
        id:"show-contact-us",
        icon:bookmarkOutline,
    },{
        title:'About us',
        id:"show-about-us",
        icon:bookmarkOutline,
    },{
        title:'Privacy/Policy',
        id:"show-privacy",
        icon:bookmarkOutline,
    },{
        title:'Terms and condition',
        id:"show-terms",
        icon:bookmarkOutline,
    }
];

const toolSection = [
    {
        title:'Help',
        id:"show-help",
        icon:bookmarkOutline,
    },{
        title:'Settigns',
        id:"settings",
        icon:bookmarkOutline,
    }
];


export const Menu = () => {
    return (
        <IonMenu contentId="menu" type="overlay" className="menuMain">
            <IonContent>
            <IonList id="inbox-list">
                <IonListHeader>{"name"}</IonListHeader>
                <IonNote>NAWASA authority</IonNote>
                {appPages.map((appPage, index) => {
                return (
                    <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className="menuItemContainer" routerLink={appPage.url} routerDirection="none" lines="none">
                        <IonIcon color="tertiary" slot="start" icon={appPage.icon} />
                        <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    </IonMenuToggle>
                );
                })}
            </IonList>
    
            <IonList id="labels-list">
                <IonListHeader>Settings</IonListHeader>
                {toolSection.map((settings, index) => (
                <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className="menuItemContainer" routerLink={settings.url} lines="none">
                    <IonIcon color="tertiary" slot="start" icon={bookmarkOutline} />
                    <IonLabel>{settings.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
                ))}
            </IonList>
            </IonContent>
        </IonMenu>
    );
};


  