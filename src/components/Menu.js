import { IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonItemDivider } from '@ionic/react';
  
import React, { Component } from 'react';
import { bookmarkOutline, heartOutline, heartSharp, cartOutline, cartSharp, logInOutline, logInSharp, arrowBackSharp } from 'ionicons/icons';
import './Menu.css';
import tools from './Tools';
import Widgets from './Widgets';

  

class Menu extends Component{
    constructor(){
        super()
        this.appPages = [
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
        
        this.labels = [
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

        this.toolSection = [
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
    }
    menu(){
        const contentRef = React.useRef();
        return(
            <IonMenu contentId="menu" type="overlay">
                <Widgets.pageArrow onClick={()=>{
                    contentRef.current.scrollToTop();                
                }} face="up" show={true}/>
                <Widgets.pageArrow onClick={()=>{
                    contentRef.current.scrollToBottom();
                }} face="down" show={true}/>

                <IonItem lines="none">
                    <div className="backButtonStyle backOnClick">
                        <IonIcon onClick={()=>{tools.clickById("side-menu-button")}} icon={arrowBackSharp}/>
                    </div>
                    <IonListHeader style={{fontSize:"30px"}}>Menu</IonListHeader>
                </IonItem>
                <IonContent  ref={contentRef} scrollEvents={true}>
                    <IonList id="inbox-list">
                        <IonListHeader>Fashion app</IonListHeader>
                            {
                                menu.appPages.map((appPage, index) => {
                                    return(
                                        <IonMenuToggle key={index} autoHide={false}>
                                            <IonItem className="itemStyle" lines="none" onClick={()=>{
                                                tools.clickById(appPage.id);
                                            }}>
                                                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                                <IonLabel>{appPage.title}</IonLabel>
                                            </IonItem>
                                        </IonMenuToggle>
                                    );
                                })
                            }
                        </IonList>
                
                        <IonList id="labels-list">
                            <IonListHeader>Labels</IonListHeader>
                            {
                                menu.labels.map((label, index) => (
                                    <IonItem class="itemStyle" lines="none" key={index} onClick={()=>{
                                        tools.clickById(label.id);
                                    }}>
                                        <IonIcon slot="start" icon={label.icon} />
                                        <IonLabel>{label.title}</IonLabel>
                                    </IonItem>
                                ))
                            }
                        </IonList>
                        
                        <IonItemDivider/>
                        <IonList>
                            <IonListHeader>Tools</IonListHeader>
                            {
                                menu.toolSection.map((tool, index) => (
                                    <IonItem class="itemStyle" lines="none" key={index} onClick={()=>{
                                        tools.clickById(tool.id);
                                    }}>
                                        <IonIcon slot="start" icon={tool.icon} />
                                        <IonLabel>{tool.title}</IonLabel>
                                    </IonItem>
                                ))
                            }
                        </IonList>
                </IonContent>
            </IonMenu>
        );
    }
};


var menu = new Menu()
export default menu;
  