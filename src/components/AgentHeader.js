import { IonCard, IonImg, IonThumbnail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getUser } from '../database/CollectionsRequsts';
import { routes } from '../global/routes';
import img from '../images/testdd.jpg'


export const AgentHeader = ({uid, visit, onLoad}) =>{
    const history = useHistory();
    const [agent, setAgent] = useState({});

    const initAgent = async(id) =>{
        setAgent(await getUser(id));
    }

    const visitPage = () =>{
        history.push({pathname:routes.store+":"+uid});
    }

    useEffect(()=>{
        initAgent(uid);
    },[uid]);

    useEffect(()=>{
        if (typeof onLoad === "function") onLoad(agent);
    },[agent,onLoad]);
    return(
        <div className="white-bg white-fg">
            <div className="divider bg-style" style={{borderBottom:"1px solid lightgray",paddingTop:"8px",paddingBottom:"8px"}}>
                <IonCard class="prifile-image-container">
                    <IonThumbnail class="prifile-image">
                        <IonImg src={agent?.image || img}/>
                    </IonThumbnail>
                </IonCard>
                <div className="agent-header-col-2">
                    <div className="float-left" style={{paddingRight:"5px"}}>
                        <div><b>Business name</b></div>
                        <div>{`${agent?.firstName || ""} ${agent?.lastName || ""}`}</div>
                    </div>
                </div>
                <div className="agent-header-col-3">
                    <div className="float-left" style={{paddingLeft:"10px"}}>
                        <p>some bio message</p>
                    </div>
                </div>
                <div className="agent-header-col-4">
                    <div hidden={!visit} onClick={visitPage} className="btn-add-to-cart float-left pad-l-r">Visit Store</div>
                </div>
            </div>
        </div>
    )
}