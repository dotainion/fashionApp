import { IonLabel, IonList } from '@ionic/react';
import React from 'react';
import tools from '../components/Tools';

export const TextStyle = (data) =>{
    return(
        <>
            <div style={{textAlign:"center",fontSize:"25px"}}>                            
                <IonList lines="none">
                    {
                        data.title.length ?
                        data.title.split("").map((alph, i)=>
                            <label key={i} style={{
                                color:tools.color[tools.getIndex(tools.color.length)],
                                marginRight:tools.compare(alph," ","8px","")
                            }}>{alph}</label>
                        ):null
                    }
                </IonList>
                <div style={{marginBottom:"30px",color:data.textColor,fontSize:"15px"}}>
                    <IonLabel>{data.subtitle}</IonLabel>
                </div>
            </div>
        </>
    )
}