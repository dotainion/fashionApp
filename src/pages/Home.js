import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonIcon, IonList, IonThumbnail, IonImg, IonCardContent, IonPopover, IonItem, IonSelect, IonInput, IonSelectOption, IonButton, IonLabel, IonAlert, withIonLifeCycle, IonModal } from '@ionic/react';
import React, { Component } from 'react';
import './Home.css';
import { eyeOutline, close, search, cart } from 'ionicons/icons';
import { Header } from '../components/Widgets'
import tools from '../components/Tools';
import Menu from '../components/Menu';
import IMG from '../components/Images';
import ModelPopUp from '../components/MiniPage';
import { data } from '../database/database';


class Home extends Component{
    constructor(){
        super()
    };

    componentDidMount(){
        
    }

    async ionViewWillEnter(){
        
    }

    async serverRequest(){
        
    }

    addToCart(item){
        
    }

    render(){

        return(
            <IonPage>
                <Header/>
            </IonPage>
        );
    };
};

export default withIonLifeCycle(Home);
