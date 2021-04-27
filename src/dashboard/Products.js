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
import { DashNavWrapper } from '../components/DashNavWrapper';
import { ProductInputFloat } from '../components/ProductInput';


export const Products = () =>{
    const { user, onShare, dashboardProduts, initDashboardProducts } = useStore();
    //show or hide modal to view and edit data
    const [showEdithOrView, setShowEdithOrView] = useState(false);
    //holds data that is being edited
    const [editObject, setEditObject] = useState([]);

    const refresh = async() =>{
        await initDashboardProducts();
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

            <DashNavWrapper onRefresh={refresh}>
                <div style={{position:"relative",zIndex:"9999999"}}>
                    <IonItemDivider>Products</IonItemDivider>
                    {
                        dashboardProduts.length?
                        dashboardProduts.map((item, key)=>(
                            <IonCard onMouseEnter={()=>{
                                document.getElementById(`${item?.id}opt`).hidden = false;
                            }} onMouseLeave={()=>{
                                document.getElementById(`${item?.id}opt`).hidden = true;
                            }} class="inline dash-prod-container" key={key}>
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
            </DashNavWrapper>
        </IonPage>
    )
}