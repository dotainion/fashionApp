import { IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import tools from '../components/Tools';

export const TextStyle = (data) =>{
    return(
        <>
            <div style={{textAlign:"center"}}>                            
                <IonItem style={{textAlign:data.C,marginLeft:data.L}} lines="none">
                    {
                        data.title.length ?
                        data.title.split("").map((alph, i)=>
                            <h3 key={i} style={{
                                color:tools.color[tools.getIndex(tools.color.length)],
                                marginRight:tools.compare(alph," ","8px","")
                            }}>{alph}</h3>
                        ):null
                    }
                </IonItem>
                <div style={{marginBottom:"20px",color:data.textColor}}>
                    <IonLabel>{data.subtitle}</IonLabel>
                </div>
            </div>
        </>
    )
}