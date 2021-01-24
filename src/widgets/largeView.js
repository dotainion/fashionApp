import { IonIcon, IonImg, IonModal, IonThumbnail } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import './largeView.css';

/**
 * 
 * @param { state } props 
 * @param { onClose } props
 */

export const LargeView = (props) =>{
    return(
        <IonModal onDidDismiss={()=>{
            if (props.onClose) props.onClose();
        }} isOpen={props.state} >
            <div onMouseLeave={()=>{
                if (props.onClose) props.onClose();
            }} className="large-view-container">
                <IonIcon icon={closeOutline} onClick={()=>{
                    if (props.onClose) props.onClose();
                }} className="large-view-close large-view-close-hover"/>
                <IonThumbnail class="large-view-image">
                    <IonImg src={props?.data?.record.image}/>
                </IonThumbnail>
                <div className="large-view-info-container">
                    <div>{props?.data?.record?.title || "Not Provided"}</div>
                    <div>${props?.data?.record?.price || "Not Provided"}</div>
                    <p className="large-view-detail">{props?.data?.record?.detail || "Not Provided"}</p>
                </div>
                <div className="large-view-add-button large-view-button-click" onClick={()=>{
                    if (props.onAdd){ 
                        props.onAdd(props?.data);
                        if (props.onClose) props.onClose();
                    }
                }}>Add To Cart</div>
            </div>
        </IonModal>
    )
}