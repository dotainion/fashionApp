import { IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonItemDivider, IonNote, IonButton } from '@ionic/react';
  
import React, { useState } from 'react';
import { bookmarkOutline, heartOutline, heartSharp, cartOutline, cartSharp, logInOutline, logInSharp, arrowBackSharp } from 'ionicons/icons';
import './Menu.css';
import tools from './Tools';

  
const appPages = [
    {
        title: 'Cart',
        id: 'show-cart',
        icon: cartOutline,
    },{
        title: 'Login',
        id: 'login',
        icon: logInOutline,
    },{
        title: 'Favorites',
        id: 'show-favorites',
        icon: heartOutline,
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
        <IonMenu contentId="menu" type="overlay">
            <IonContent class="menu-container">
                <IonList>
                    <IonListHeader class="menu-item-header">FASHION</IonListHeader>
                    &nbsp;&nbsp;
                    <IonNote class="menu-item-header">Fashion App</IonNote>
                    {appPages.map((appPage, index) => {
                    return (
                        <IonMenuToggle key={index} autoHide={false}>
                            <IonItem class="menu-items" routerLink={appPage.url} routerDirection="none" lines="none">
                                <IonIcon class="menu-icon" slot="start" icon={appPage.icon} />
                                <IonLabel>{appPage.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    );
                    })}
                </IonList>
        
                <IonList>
                    <IonListHeader class="menu-item-header">Help/Information</IonListHeader>
                    {labels.map((settings, index) => (
                    <IonMenuToggle key={index} autoHide={false}>
                        <IonItem class="menu-items" lines="none">
                            <IonIcon class="menu-icon" slot="start" icon={settings.icon} />
                            <IonLabel>{settings.title}</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    ))}
                </IonList>

                <IonList>
                    <IonListHeader class="menu-item-header">Settings</IonListHeader>
                    {toolSection.map((settings, index) => (
                    <IonMenuToggle key={index} autoHide={false}>
                        <IonItem class="menu-items" routerLink={settings.url} lines="none">
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


  