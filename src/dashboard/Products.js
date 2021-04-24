import { IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenuToggle, IonModal, IonPage, IonThumbnail, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, clipboardOutline, closeOutline, homeOutline, pricetagOutline, readerOutline, refreshOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { pageNavigators } from '../content/contents';
import { useStore } from '../context/Context';
import { deleteAgentRecord, getAgentRecord, updateProduct } from '../database/CollectionsRequsts';
import { routes } from '../global/routes';
import img from '../images/testdd.jpg';
import { tools } from '../tools/Tools';
import { NavSideBar } from '../widgets/NavSideBar';
import { ProductProspect } from '../widgets/ProductContainer';
import { ProductInput, ProductInputFloat } from '../widgets/ProductInput';


export const Products = () =>{
    const { user, onShare, agentProducts, initAgentProducts } = useStore();
    //show and hide side menu when in mobile view with habmurger menu
    const [mobileSideMenu, setMobileSideMenu] = useState("");
    //show or hide modal to view and edit data
    const [showEdithOrView, setShowEdithOrView] = useState(false);
    //holds data that is being edited
    const [editObject, setEditObject] = useState([]);

    const menuToggle = () =>{
        if (mobileSideMenu) setMobileSideMenu("");
        else setMobileSideMenu("hide");
    }

    const refresh = async() =>{
        await initAgentProducts();
    }

    const updateItem = async(record) =>{        
        const id = record?.id;
        delete record["id"];
        await updateProduct(record, id);
        refresh();
        setShowEdithOrView(false);
    }

    const deleteItem = async(record) =>{
        await deleteAgentRecord(record?.id);
        refresh();
    }

    const initValueToViewOrEdit = (record) =>{
        setEditObject(record);
        setShowEdithOrView(true);
    }
    return(
        <IonPage>

            <ProductInputFloat
                isOpen={showEdithOrView} 
                record={editObject}
                onSubmit={updateItem}
                onClose={()=>{
                    setShowEdithOrView(false);
                    setEditObject({});
                }}
            />

            <div onClick={()=>{if (!mobileSideMenu) setMobileSideMenu("hide")}} className="background">
                <div className="main-header dash-header">
                    <IonIcon onClick={refresh} class="float-right" style={{borderRadius:"50%",marginRight:"20px",backgroundColor:"lightgray"}} icon={refreshOutline}/>
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
                                <div style={{position:"relative",zIndex:"9999999"}}>
                                    <IonItemDivider>Products</IonItemDivider>
                                    {
                                        agentProducts.length?
                                        agentProducts.map((item, key)=>(
                                            <IonCard onMouseEnter={()=>{
                                                document.getElementById(`${item?.id}opt`).hidden = false;
                                            }} onMouseLeave={()=>{
                                                document.getElementById(`${item?.id}opt`).hidden = true;
                                            }} class="inline max-width-on-mobile" style={{width:"23%"}} key={key}>
                                                <IonCardContent>
                                                    <IonThumbnail class="dashboard-image">
                                                        <IonImg src={item?.info?.images?.[0]}/>
                                                    </IonThumbnail>
                                                    <IonList style={{borderBottom:"1px solid lightgray"}}/>
                                                </IonCardContent>
                                                <div style={{padding:"15px",paddingTop:"0px"}}>
                                                    <IonIcon style={{float:"right",fontSize:"20px"}} icon={shareSocialOutline}/>
                                                    <div style={{overflow:"hidden",whiteSpace:"nowrap"}}>{item?.info?.title}</div>
                                                    <div>${item?.info?.price}</div>
                                                </div>
                                                <div hidden id={`${item?.id}opt`} className="backdrop-fill show-on-hover">
                                                    <div className="float-center">
                                                        <div><button onClick={()=>{initValueToViewOrEdit(item)}} className="btn pad btn-round btn-hover-2 btn-click btn-shadow">Details/Update</button></div>
                                                        <div><button onClick={()=>deleteItem(item)} className="btn pad btn-round btn-hover-2 btn-click btn-shadow">Delete</button></div>
                                                    </div>
                                                    <IonIcon onClick={()=>onShare(`${user?.firstName} ${user?.lastName}`, routes.viewProduct, item?.id)} class="float-bottom-right-conner round-shadow-2" style={{fontSize:"20px",margin:"10px",bottom:"12px"}} icon={shareSocialOutline}/>
                                                </div>
                                            </IonCard>
                                        )):
                                        <IonList>
                                            <IonLabel>No Records</IonLabel>
                                        </IonList>
                                    }
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