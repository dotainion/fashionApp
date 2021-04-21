import { IonButton, IonIcon, IonItem } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { SketchPicker, SwatchesPicker, PhotoshopPicker, ChromePicker } from 'react-color';



export const ColorPicker = ({isOpen, onChange, onClose, selected, onDelete}) =>{
    const [color, setColor] = useState();

    const onTriggerChange = (colorObj) =>{
        if (typeof onChange === "function") onChange(colorObj);
        setColor(colorObj);
    }
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop-translucent">
            <div onClick={(e)=>e.stopPropagation()} className="float-center">
                <div style={{width:"220px"}} className="add-hold-image-picker-item scroll-bar inline size-picker-container-holder white-bg">
                    {selected?.map((colr, key)=>(
                        <label className="add-hold-more-item color-dot" style={{backgroundColor:colr,boxShadow:"none"}} key={key}>
                        <IonIcon onClick={()=>onDelete?.(key)} class="add-hold-more-delete-2 text-hover" icon={closeOutline}/>
                    </label>
                    ))}
                </div>

                <div>
                    <IonIcon style={{top:"-20px"}} onClick={onClose} class="float-top-right text-hover round-shadow" icon={closeOutline}/>
                    <SketchPicker
                        onChange={onTriggerChange}
                        color={color}
                    />
                </div>
                
                <IonItem style={{marginTop:"5px"}}>
                    <IonButton onClick={onClose} slot="end">Close</IonButton>
                </IonItem>
            </div>
        </div>
    )
}

export const SizePicker = ({isOpen, onClose, onSelect, selected, onDelete}) =>{
    const sizes = [
        "M-L",
        "L-S",
        "L-T",
        "M-T",
        "XL",
        "2XL",
        "3XL",
        "5XL",
        "6XL",
        "XXL",
        "SMALL",
        "MEDIUM",
    ]
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop-translucent">
            <div className="float-center size-picker-container" onClick={(e)=>e.stopPropagation()}>
            <IonIcon style={{top:"-20px"}} onClick={onClose} class="float-top-right text-hover round-shadow" icon={closeOutline}/>
                <div className="add-hold-image-picker-item scroll-bar inline size-picker-container-holder white-bg">
                    {selected?.map((size, key)=>(
                        <label className="add-hold-more-item" key={key}>
                            <span>{size}</span>
                            <IonIcon onClick={()=>onDelete?.(key)} class="add-hold-more-delete text-hover" icon={closeOutline}/>
                        </label>
                    ))}
                </div>

                <div className="white-bg pad" style={{boxShadow:"0.5px 0.5px 5px rgb(0, 0, 0,0.5)",borderRadius:"5px"}}>
                    {sizes.map((size, key)=>(
                        <label style={{borderRadius:"5px",backgroundColor:"lightgray"}} onClick={()=>onSelect?.(size)} key={key}>{size}</label>
                    ))}
                </div>

                <IonItem style={{marginTop:"5px"}}>
                    <IonButton onClick={onClose} slot="end">Close</IonButton>
                </IonItem>
            </div>
        </div>
    )
}