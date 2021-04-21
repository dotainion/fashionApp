import { IonIcon, IonPage } from '@ionic/react';
import { reorderFourOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { addProduct } from '../database/CollectionsRequsts';
import { NavSideBar } from '../widgets/NavSideBar';
import { ProductInput } from '../widgets/ProductInput';


export const AddProducts = () =>{
    //show and hide side menu when in mobile view with habmurger menu
    const [mobileSideMenu, setMobileSideMenu] = useState("");

    const menuToggle = () =>{
        if (mobileSideMenu) setMobileSideMenu("");
        else setMobileSideMenu("hide");
    }

    const submitProduct = async(data) =>{
        await addProduct(data);
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
                                <ProductInput isOpen={true} onSubmit={(obj)=>submitProduct(obj)}/>
                                {/*----------------------------------*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IonPage>
    )
}