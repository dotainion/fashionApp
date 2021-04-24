import { IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';
import img from '../images/testdd.jpg'
import { tools } from '../tools/Tools';
import { ProductProspect } from '../widgets/ProductContainer';
import { ToolBar } from '../widgets/ToolTopBar';


export const Sales = () =>{
    const history = useHistory();
    const { products, searchProducts } = useStore();
    useEffect(()=>{
        searchProducts("sales","");
    },[]);
    return(
        <IonPage>
            <div className="background bg-style-2">
                <ToolBar 
                    onSearch={searchProducts}
                    refresh
                    searchbar
                    mostResent
                    deals
                />
                {
                    products.length?
                    products?.map((item,key)=>(
                        <ProductProspect
                            key={key}
                            style={{boxShadow:"none"}}
                            title={item?.info?.title}
                            price={item?.info?.price}
                            deal={item?.info?.deal}
                            colors={item?.info?.colors}
                            images={item?.info?.images}
                            onSelect={()=>history.push(routes.viewProduct+":"+item?.id)}
                        />
                    )):
                    <div className="pad-xl teal" style={{textAlign:"center"}}>
                        <label><b>No results</b></label>
                        <p>Try a different search</p>
                    </div>
                }
            </div>
            
        </IonPage>
    )
}