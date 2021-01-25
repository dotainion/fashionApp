import { IonAlert } from '@ionic/react';
import React from 'react';
import './deleteConfirm.css';


export const DeleteConfirm = (props) =>{
    return(
        <IonAlert
                isOpen={props.state}
                onDidDismiss={() =>{
                    if (props.onClose) props.onClose();
                }}
                cssClass=''
                header="Alert!!"
                subHeader="Confirmation"
                message="Are you sure you will like to delete this item?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            if (props.onDecline) props.onDecline();
                        }
                    },{
                        text: 'Okay',
                        handler: () => {
                            if (props.onAccept) props.onAccept();
                        }
                    }
                ]}
            />
    )
}