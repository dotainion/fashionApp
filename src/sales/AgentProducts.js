import { IonButton, IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonThumbnail, useIonViewWillEnter } from '@ionic/react';
import { truncate } from 'fs';
import { shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { getAgentRecord, getAProduct, getUser } from '../database/CollectionsRequsts';
import { routes } from '../global/routes';
import img from '../images/testdd.jpg'
import { tools } from '../tools/Tools';
import { SlideAdvert, SlideAdvertHorizontal } from '../widgets/Advertise';
import { AgentHeader } from '../widgets/AgentHeader';
import { ProductExpand, ProductProspect } from '../widgets/ProductContainer';
import { ToolBar } from '../widgets/ToolTopBar';



let expandIdArray = [];
const addItemIds = (id) =>{
    expandIdArray.push(id);
    return null;
}

const onExpand = (id) =>{
    for (let c_id of expandIdArray){
        document.getElementById(c_id).hidden = false;
        document.getElementById(`${c_id}-exp`).hidden = true;
    }
    document.getElementById(id).hidden = true;
    document.getElementById(`${id}-exp`).hidden = false;
}


export const AgentProducts = () =>{
    const history = useHistory();
    const { addCartItem } = useStore();
    const [agentProducts, setAgentProducts] = useState([]);

    const initAgentRecord = async(uid, prodId) =>{
        setAgentProducts(await getAgentRecord(uid));
    }

    useIonViewWillEnter(()=>{
        const [path, objectId] = history.location.pathname.split(tools.shareDevider);
        const agentId = path.replace(routes.agent+":","");
        initAgentRecord(agentId, objectId);
    });

    return(
        <IonPage>
            <div className="background background-color">
                <ToolBar home/>
                
                <AgentHeader uid={agentProducts?.info?.postBy}/>

                {
                    agentProducts?.map((item,key)=>(
                        <span key={key}>
                            <ProductProspect
                                key={key}
                                id={`${item?.id}prod`}
                                style={{boxShadow:"none"}}
                                title={item?.info?.title}
                                price={item?.info?.price}
                                images={item?.info?.images}
                                colors={item?.info?.colors}
                                onAdd={()=>addCartItem(item)}
                                onSelect={()=>{
                                    
                                }}
                            />
                        </span>
                    ))
                }
            </div>
            
        </IonPage>
    )
}