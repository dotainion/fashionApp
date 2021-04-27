import { IonIcon } from '@ionic/react';
import { refreshOutline, reorderFourOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { NavSideBar } from './NavSideBar';


export const DashNavWrapper = ({children,onRefresh}) =>{
    //show and hide side menu when in mobile view with habmurger menu
    const [mobileSideMenu, setMobileSideMenu] = useState("");

    const menuToggle = () =>{
        if (mobileSideMenu) setMobileSideMenu("");
        else setMobileSideMenu("hide");
    }

    return(
        <div onClick={()=>{if (!mobileSideMenu) setMobileSideMenu("hide")}} className="background">
            <div className="main-header dash-header">
                <IonIcon hidden={!onRefresh} onClick={onRefresh} class="float-right pad" style={{fontSize:"15px",borderRadius:"50%",marginRight:"20px",backgroundColor:"lightgray"}} icon={refreshOutline}/>
                <div className="divider">
                    <IonIcon onClick={menuToggle} class=" hide-on-desktop dash-burger-menu" icon={reorderFourOutline}/>
                    <span>Dashboard</span>
                </div>
            </div>
            <div className="divider" style={{paddingTop:"60px"}}>
                <div className={`dash-nav-container dash-menu-on-mobile ${mobileSideMenu}`}>
                    <div onClick={menuToggle} className="dash-nav border box-margin max-height side-menu-ease-out-on-mobile">
                        <NavSideBar/>
                    </div>
                </div>
                <div className="dash-containser">
                    <div className="box-margin chart-Colors">
                        <div className="border">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}