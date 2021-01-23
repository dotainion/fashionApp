import { IonButtons, IonCard, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline, searchOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import './searchbar.css';
import { FaSearch } from 'react-icons/fa';

/**
 * 
 * @param { onSearch } props 
 * @param { onClear } props 
 * @param { onChange } props 
 */
export const Searchbar = (props) =>{
    const [inputValue, setInputValue] = useState("");
    const [showClear, setShowClear] = useState(false);
    return(
        <IonCard onMouseEnter={(e)=>{
                if (inputValue) setShowClear(true);
            }} onMouseLeave={()=>{
                setShowClear(false);
            }} onKeyUp={(e)=>{
                if (e.key === "Enter" || e.keyCode === 13){
                    if (props.onSearch) props.onSearch(inputValue);
                }
            }}  className="searchbar-container">
            <div className="searchbar-icon-container">
                <FaSearch onClick={()=>{
                    if (props.onSearch) props.onSearch(inputValue);
                }} className="searchbar-icon"/>
            </div>
            <IonInput onIonChange={(e)=>{
                setInputValue(e.detail.value);
                if (e.detail.value) setShowClear(true);
                else setShowClear(false);
                if (props.onChange) props.onChange(e.detail.value);
            }} value={inputValue} class="searchbar-input" placeholder="Search"/>
            <div className="searchbar-clear-container">
                <IonIcon hidden={!showClear} onClick={()=>{
                    setInputValue("");
                    if (props.onClear) props.onClear();
                }} className="searchbar-clear" icon={closeOutline}/>
            </div>
        </IonCard>
    )
}