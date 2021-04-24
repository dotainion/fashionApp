import { IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { pageNavigators } from '../content/contents';
import { useStore } from '../context/Context';
import img from '../images/testdd.jpg';
import { tools } from '../tools/Tools';
import { NavSideBar } from '../widgets/NavSideBar';


export const Orders = () =>{
    const history = useHistory();
    const { user } = useStore();
    //show and hide side menu when in mobile view with habmurger menu
    const [mobileSideMenu, setMobileSideMenu] = useState("");

    const menuToggle = () =>{
        if (mobileSideMenu) setMobileSideMenu("");
        else setMobileSideMenu("hide");
    }

    return(
        <IonPage>
            <div onClick={(e)=>{if (!mobileSideMenu) setMobileSideMenu("hide")}} className="background">
                <div className="main-header dash-header">
                    <div className="divider">
                        <IonIcon onClick={menuToggle} class=" hide-on-desktop dash-burger-menu" icon={reorderFourOutline}/>
                        <span>Dashboard</span>
                    </div>
                </div>
                <div className="divider" style={{paddingTop:"80px"}}>
                    <div className={`dash-nav-container dash-menu-on-mobile ${mobileSideMenu}`}>
                        <div onClick={menuToggle} className="dash-nav border box-margin max-height side-menu-ease-in-on-mobile">
                            <NavSideBar/>
                        </div>
                    </div>
                    <div className="dash-containser">
                        <div className="box-margin chart-Colors">
                            <div className="border">
                                {/*----------------------------------*/}
                                <div>
                                    <IonItemDivider>Orders</IonItemDivider>
                                    {[1,2,3,4,5,6].map((item, key)=>(
                                        <IonCard class="inline order-width max-width-on-mobile" key={key}>
                                            <div className="divider" style={{height:"250px"}}>
                                                <IonCardContent>
                                                    <IonThumbnail class="dashboard-image">
                                                        <IonImg src={img}/>
                                                    </IonThumbnail>
                                                    <IonList style={{borderBottom:"1px solid lightgray"}}/>
                                                </IonCardContent>
                                                <IonCardContent className="scroll-bar order-detail">
                                                    <div>some title</div>
                                                    <div>some price</div>
                                                    <div>some color</div>
                                                    <div>size</div>
                                                    <div>some description</div>
                                                </IonCardContent>
                                            </div>
                                        </IonCard>
                                    ))}
                                </div>
                                {/*----------------------------------*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IonPage>
    )
}