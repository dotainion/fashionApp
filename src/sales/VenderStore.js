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
import { AgentHeader } from '../components/AgentHeader';
import { Loader } from '../widgets/Loader';
import { ProductProspect } from '../widgets/ProductContainer';
import { ToolBar } from '../components/ToolTopBar';




export const VenderStore = () =>{
    const { searchProducts } = useStore();
    const history = useHistory();
    const [showLoader, setShowLoader] = useState(false);
    const [agentProducts, setAgentProducts] = useState([]);

    const initAgentRecord = async(uid) =>{
        setShowLoader(true)
        setAgentProducts(await getAgentRecord(uid));
        setShowLoader(false);
    }

    useIonViewWillEnter(()=>{
        const agentId = history.location.pathname.replace(routes.store+":","");
        initAgentRecord(agentId);
    });

    return(
        <IonPage>
            <div className="background bg-style-2">
                <ToolBar
                    sideMenu
                    mostResent
                    deals
                    home
                    refresh
                    onSearch={searchProducts}
                />

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
                                deal={item?.info?.deal}
                                images={item?.info?.images}
                                colors={item?.info?.colors}
                                onSelect={()=>history.push(routes.viewProduct+":"+item?.id)}
                            />
                        </span>
                    ))
                }
            </div>
            
        </IonPage>
    )
}