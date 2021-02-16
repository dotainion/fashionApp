import { IonButtons, IonHeader, IonIcon, IonMenuButton, IonRouterOutlet, IonToolbar } from '@ionic/react';
import { busOutline, homeOutline} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../auth/authentication';
import { Menu } from '../components/Menu';
import tools from '../components/Tools';
import { routes } from '../global/routes';
import { FcSalesPerformance } from 'react-icons/fc';
import { FaCartPlus } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import './header.css';
import { LabelTag } from './labelTag';
import { data } from '../database/database';


export const Header = (props) =>{
    const history = useHistory();
    const [orderedState, setOrderedState] = useState(false);
    const [menuState, setMenuState] = useState(false);
    const [signoutTag, setSignoutTag] = useState(false);
    const [busTag, setBusTag] = useState(false);
    const [homeTag, setHomeTag] = useState(false);
    const [salesTag, setSalesTag] = useState(false);
    const [cartTag, setCartTag] = useState(false);

    const isOrder = async() =>{
        const user = tools.getCreds();
        const items = await data.getClientOrder(user?.id);
        setTimeout(()=>{        
            if (props.ordered && items.length) setOrderedState(true);
            else setOrderedState(false);
        },1000);
    }

    useEffect(()=>{
        isOrder();
    });
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
                    <span hidden={!props.signout} onMouseEnter={()=>{
                        setSignoutTag(true);
                    }} onMouseLeave={()=>{
                        setSignoutTag(false);
                    }} className="header-icon-and-tag-contaienr">
                        <span id="show-signout-button">
                            <GoSignOut className="header-title header-hover" onClick={async()=>{
                                await auth.signOut();
                                let element = document.getElementById("show-signout-button");
                                if (element) element.hidden = true;
                            }} slot="end"/>
                        </span>
                        <LabelTag state={signoutTag} text="Signout"/>
                    </span>
                    <span hidden={!orderedState} onMouseEnter={()=>{
                        setBusTag(true);
                    }} onMouseLeave={()=>{
                        setBusTag(false);
                    }} className="header-icon-and-tag-contaienr">
                        <IonIcon className="header-title header-hover" onClick={()=>{
                            history.push(routes.pendingorder);
                        }} slot="end" icon={busOutline}/>
                        <LabelTag state={busTag} text="Ordered"/>
                    </span>
                    <span hidden={!props.home} onMouseEnter={()=>{
                        setHomeTag(true);
                    }} onMouseLeave={()=>{
                        setHomeTag(false);
                    }} className="header-icon-and-tag-contaienr">
                        <IonIcon className="header-title header-hover" onClick={()=>{
                            history.push(routes.home);
                        }} slot="end" icon={homeOutline}/>
                        <LabelTag state={homeTag} text="Home"/>
                    </span>
                    <span hidden={!props.sales} onMouseEnter={()=>{
                        setSalesTag(true);
                    }} onMouseLeave={()=>{
                        setSalesTag(false);
                    }} className="header-icon-and-tag-contaienr">
                        <FcSalesPerformance className="header-title header-hover" onClick={()=>{
                            tools.lastRoute(routes.inventory);
                            history.push(routes.inventory);
                        }} slot="end"/>
                        <LabelTag state={salesTag} text="My Store"/>
                    </span>
                    <span hidden={!props.cart} onMouseEnter={()=>{
                        setCartTag(true);
                    }} onMouseLeave={()=>{
                        setCartTag(false);
                    }} className="header-icon-and-tag-contaienr">
                        <span onClick={()=>{
                            if (props.cartClick) props.cartClick();
                        }} className="header-cart-container">
                            <FaCartPlus className="header-title header-hover" slot="end"/>
                            <span hidden={!props?.count} className="header-count-container">
                                <span className="header-count">{props?.count}</span>
                            </span>
                        </span>
                        <LabelTag state={cartTag} text="Cart"/>
                    </span>
                </div>
            </IonToolbar>
        </IonHeader>
        <Menu id="menu" disable={menuState} cart={props.cartClick}/>
        <IonRouterOutlet id="menu"/>
        </>
    )
}