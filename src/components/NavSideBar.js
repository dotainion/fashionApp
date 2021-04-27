import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { pageNavigators } from '../content/contents';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';
import { tools } from '../tools/Tools';


export const NavSideBar = () =>{
    const history = useHistory();
    const { user, onShare } = useStore();

    const heightightNavOption = (cmd) =>{
        if (history.location.pathname.includes(cmd)) return "medium";
        return "";
    }
    return(
        <div>
            {pageNavigators.map((nav, key)=>(
                 <IonItem id={nav.title} onClick={()=>{
                    if (nav.route.includes("share")) onShare(`${user?.firstName} ${user?.lastName}`, routes.store, user?.id);
                    else history.push(nav.route);
                }} color={heightightNavOption(nav.route)} class="dash-side-nav btn-click btn-hover" key={key}>
                    <IonIcon icon={nav.icon}/>
                    <IonLabel style={{marginLeft:"10px"}}>{nav.title}</IonLabel>
                </IonItem>               
            ))}
        </div>
    )
}

export const NavSideWithWrapper = ({isOpen, onClose, top}) =>{
    return(
        <div hidden={!isOpen} onClick={onClose} className="nav-option-wrapper">
            <div onClick={(e)=>e.stopPropagation()} style={{marginTop:top}} className="nav-option-sub-wrapper white-bg side-menu-ease-out">
                <NavSideBar/>
            </div>
        </div>
    )
}