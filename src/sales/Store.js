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
import { Loader } from '../widgets/Loader';
import { ProductExpand, ProductProspect } from '../widgets/ProductContainer';
import { ToolBar } from '../widgets/ToolTopBar';




export const Store = () =>{
    const history = useHistory();
    const [showLoader, setShowLoader] = useState(false);
    const { addCartItem } = useStore();
    const [agentProducts, setAgentProducts] = useState([]);

    const initAgentRecord = async(uid, prodId) =>{
        setShowLoader(true)
        setAgentProducts(await getAgentRecord(uid));
        setShowLoader(false);
    }

    useIonViewWillEnter(()=>{
        const [path, objectId] = history.location.pathname.split(tools.shareDevider);
        const agentId = path.replace(routes.store+":","");
        initAgentRecord(agentId, objectId);
    });

    return(
        <IonPage>
            <div className="background bg-style-2">
                <ToolBar home/>

                <Loader isOpen={showLoader}/>
                
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