import { IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';
import img from '../images/testdd.jpg'
import { tools } from '../tools/Tools';
import { ProductProspect } from '../widgets/ProductContainer';
import { ToolBar } from '../components/ToolTopBar';


export const Home = () =>{
    const history = useHistory();
    const { products, searchProducts } = useStore();
    useEffect(()=>{
        searchProducts(routes.home,"");
    },[]);
    return(
        <IonPage>
            <div className="background bg-style-2">
                <ToolBar 
                    sideMenu
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
                    </div>
                }
            </div>
            
        </IonPage>
    )
}