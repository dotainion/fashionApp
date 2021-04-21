import { LineChart } from '../charts/LineChart';
import { PieCart } from '../charts/PieCart';
import { IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { pageNavigators } from '../content/contents';
import { useStore } from '../context/Context';
import { tools } from '../tools/Tools';
import { NavSideBar } from '../widgets/NavSideBar';


export const Analytics = () =>{
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
                        <div onClick={menuToggle} className="dash-nav border box-margin max-height">
                            <NavSideBar/>
                        </div>
                    </div>
                    <div className="dash-containser">
                        <div className="box-margin chart-Colors">
                            <div className="border">
                                {/*----------------------------------*/}
                                <div>
                                    <IonItemDivider>Payment Analytics</IonItemDivider>
                                    <div style={{marginTop:"40px",marginBottom:"40px"}}>
                                        <div className="item-center chart-size chart-pad">
                                            <LineChart isOpen={true}/>
                                        </div>
                                        <IonItemDivider/>
                                        <IonItemDivider>Payment Analytics</IonItemDivider>
                                        <div className="item-center chart-size chart-pad">
                                            <PieCart isOpen={true}/>
                                        </div>
                                    </div>
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