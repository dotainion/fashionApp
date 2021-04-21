import { IonPage } from '@ionic/react';
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
    const { products, searchProducts, initProducts, addCartItem } = useStore();
    return(
        <IonPage>
            <div className="background background-color">
                <ToolBar 
                    onSearch={(filter)=>searchProducts(filter)}
                    refresh={initProducts}
                />
                {
                    products?.map((item,key)=>(
                        <ProductProspect
                            key={key}
                            style={{boxShadow:"none"}}
                            title={item?.info?.title}
                            price={item?.info?.price}
                            colors={item?.info?.colors}
                            images={item?.info?.images}
                            //onAdd={()=>addCartItem(item)}
                            onSelect={()=>history.push(routes.viewProduct+":"+item?.id)}
                            //onMore={()=>history.push(routes.agent+":"+item?.info?.postBy+tools.shareDevider+item?.id)}
                        />
                    ))
                    }
            </div>
            
        </IonPage>
    )
}