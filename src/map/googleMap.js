import React from 'react';
import GoogleMapReact from 'google-map-react';
import { IonIcon, IonModal } from '@ionic/react';
import { closeOutline, locationOutline } from 'ionicons/icons';
import './googleMap.css';
 
const AnyReactComponent = ({text}) =>{
    return (
        <div>
            <IonIcon icon={locationOutline}/>
        </div>
    )
}
 
export const Maps = ({onClose}) =>{
    const defaultPosition = {
        center: {
        lat: 12.152484542023572,
        lng: -61.68130804387665
        },
        zoom: 11
    };
    const getPosition = (e) =>{
        console.log(e);
    }
    return (
    // Important! Always set the container height explicitly
        <div className="map-main-container">
            <IonIcon icon={closeOutline} onClick={()=>{
                if (onClose) onClose();
            }} class="map-close map-close-hover"/>
            <GoogleMapReact
            bootstrapURLKeys={{ key: /* YOUR KEY HERE */"" }}
            defaultCenter={defaultPosition.center}
            defaultZoom={defaultPosition.zoom}
            onClick={(e)=>{getPosition(e)}}
            >
            <AnyReactComponent
                lat={defaultPosition.center.lat}
                lng={defaultPosition.center.lng}
                text="Main Office"
            />
            </GoogleMapReact>
        </div>
    );
}

export const MapModel = ({state,onClose}) =>{
    return(
        <IonModal onDidDismiss={()=>{
            if (onClose) onClose();
        }} isOpen={state}>
            <Maps onClose={()=>{
                if (onClose) onClose();
            }}/>
        </IonModal>
    )
}
 
