import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { SketchPicker, SwatchesPicker, PhotoshopPicker, ChromePicker } from 'react-color';



export const ColorPicker = ({isOpen, onChange, onClose}) =>{
    const [color, setColor] = useState();
    const onTriggerChange = (colorObj) =>{
        if (typeof onChange === "function") onChange(colorObj);
        setColor(colorObj);
    }
    return(
        <div hidden={!isOpen} className="backdrop">
            <div className="float-center">
                <IonIcon onClick={onClose} class="float-top-right text-hover" icon={closeOutline}/>
                <SketchPicker
                    onChange={onTriggerChange}
                    color={color}
                />
            </div>
        </div>
    )
}

export const ColorPicker2 = ({isOpen, onChange, onClose}) =>{
    const [color, setColor] = useState();
    const onTriggerChange = (colorObj) =>{
        if (typeof onChange === "function") onChange(colorObj);
        setColor(colorObj);
    }
    return(
        <div hidden={!isOpen} className="backdrop">
            <div className="float-center">
                <IonIcon onClick={onClose} class="float-top-right text-hover" icon={closeOutline}/>
                <SwatchesPicker
                    onChange={onTriggerChange}
                    color={color}
                />
            </div>
        </div>
    )
}

export const ColorPicker3 = ({isOpen, onChange, onClose}) =>{
    const [color, setColor] = useState();
    const onTriggerChange = (colorObj) =>{
        if (typeof onChange === "function") onChange(colorObj);
        setColor(colorObj);
    }
    return(
        <div hidden={!isOpen} className="backdrop">
            <div className="float-center">
                <IonIcon onClick={onClose} class="float-top-right text-hover" icon={closeOutline}/>
                <PhotoshopPicker
                    onChange={onTriggerChange}
                    color={color}
                />
            </div>
        </div>
    )
}

export const ColorPicker4 = ({isOpen, onChange, onClose}) =>{
    const [color, setColor] = useState();
    const onTriggerChange = (colorObj) =>{
        if (typeof onChange === "function") onChange(colorObj);
        setColor(colorObj);
    }
    return(
        <div hidden={!isOpen} className="backdrop">
            <div className="float-center">
                <IonIcon onClick={onClose} class="float-top-right text-hover" icon={closeOutline}/>
                <ChromePicker 
                    onChange={onTriggerChange}
                    color={color}
                />
            </div>
        </div>
    )
}