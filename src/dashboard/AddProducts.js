import { IonIcon, IonPage } from '@ionic/react';
import { reorderFourOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { addProduct } from '../database/CollectionsRequsts';
import { DashNavWrapper } from '../components/DashNavWrapper';
import { NavSideBar } from '../components/NavSideBar';
import { ProductInput } from '../components/ProductInput';


export const AddProducts = () =>{

    const submitProduct = async(data) =>{
        await addProduct(data);
    }
    
    return(
        <IonPage>
            <DashNavWrapper>
                <ProductInput isOpen={true} onSubmit={(obj)=>submitProduct(obj)}/>
            </DashNavWrapper>
        </IonPage>
    )
}