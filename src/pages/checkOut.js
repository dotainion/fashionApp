import { IonAlert, IonButton, IonCard, IonCheckbox, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonThumbnail, withIonLifeCycle } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { cart } from '../cart/utils';
import { Menu } from '../components/Menu';
import tools from '../components/Tools';
import { data } from '../database/database';
import { Header } from '../widgets/header';
import './checkOut.css';


class CheckOut extends React.Component{
    constructor(){
        super();
        
        this.showAlert = {
            state: false,
            data: null
        };

        this.cartList = [];

        this.deliveryOpton = {
            pickup: false,
            delivery: false
        }
        this.showShippingAddress = false;
        this.address = {
            address: "",
            city: "",
            state: "",
            email: "",
            phone: ""
        }
    }
    async ionViewWillEnter(){
        const getCart = cart.get();
        if (getCart){ 
            this.cartList = getCart;
            this.setState({cartList:this.cartList});
        }
        const user = await data.getUser(tools.getCreds().id);
        this.address = {
            address: user?.shippingaddress,
            city: user?.city,
            state: user?.stateaddress,
            email: user?.email,
            phone: user?.contact
        }
        this.setState({address:this.address});
    }
    submit(){

    }
    render(){
        return(
            <IonPage>
                <Header home/>
                <Menu/>
                <IonAlert
                isOpen={this.showAlert.state}
                onDidDismiss={() =>{
                    this.showAlert = {
                        state: false,
                        data: null
                    };
                    this.setState({showAlert:this.showAlert});
                }}
                cssClass=''
                header="Alert!!"
                subHeader="Confirmation"
                message="Are you sure you will like to delete this item?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            this.showAlert = {
                                state: false,
                                data: null
                            };
                            this.setState({showAlert:this.showAlert});
                        }
                    },{
                        text: 'Okay',
                        handler: () => {
                            cart.delete(this.showAlert.data?.id);
                            this.ionViewWillEnter();
                        }
                    }
                ]}
            />
                <IonContent>
                    <IonList class="checkout-main-container">
                        <IonList class="checkout-cart-list-container">
                            <IonList>
                                {
                                    this.cartList.length ?
                                    this.cartList.map((item, key)=>(
                                        <IonCard key={key}>
                                            <IonThumbnail class="checkout-cart-image">
                                                <IonImg src={item?.record?.image}/>
                                            </IonThumbnail>
                                            <IonList class="checkout-cart-content-container">
                                                <IonLabel>{item?.record?.title}</IonLabel><br/>
                                                <IonLabel>Qty: {item?.qty}</IonLabel><br/>
                                                <IonLabel>Price: ${item?.record?.price}</IonLabel><br/>
                                                <IonNote>{item?.record?.detail}</IonNote>
                                                <IonIcon class="checkout-cart-delete checkout-cart-close-hover" onClick={()=>{
                                                    this.showAlert = {
                                                        state: true,
                                                        data: item
                                                    };
                                                    this.setState({showAlert:this.showAlert});
                                                }} icon={closeOutline}/>
                                            </IonList>
                                        </IonCard>
                                    )):
                                    <IonLabel>No Item In Cart</IonLabel>
                                }
                            </IonList>
                        </IonList>
                        <IonList class="checkout-type-main-container">
                            <IonList class="checkout-type-main-sub-container">
                                <IonList class="checkout-type-container">
                                    <div className="checkout-type-header">Delevery Type</div>
                                    <IonList style={{backgroundColor:"dodgerblue"}} class="checkout-type-sub-container">
                                        <IonLabel>Pick Up</IonLabel>
                                        <br/>
                                        <IonLabel>Free</IonLabel>
                                        <p className="checkout-type-info">some info</p>
                                    </IonList>
                                    <IonItem lines="full">
                                        <IonCheckbox onIonChange={(e)=>{
                                            this.deliveryOpton = {
                                                pickup: e.detail.checked,
                                                delivery: !e.detail.checked,
                                            }
                                            if (e.detail.checked) this.showShippingAddress = false;
                                            this.setState({
                                                deliveryOpton:this.deliveryOpton,
                                                showShippingAddress:this.showShippingAddress
                                            });
                                        }} checked={this.deliveryOpton.pickup}/>
                                        <IonLabel>Pick up</IonLabel>
                                    </IonItem>
                                </IonList>
                                <IonList class="checkout-type-container">
                                    <div className="checkout-type-header">Delevery Type</div>
                                    <IonList style={{backgroundColor:"purple"}} class="checkout-type-sub-container">
                                        <IonLabel>Ship Delevery</IonLabel>
                                        <br/>
                                        <IonLabel>${0.0}</IonLabel>
                                        <p className="checkout-type-info">some info</p>
                                    </IonList>
                                    <IonItem lines="full">
                                        <IonCheckbox onIonChange={(e)=>{
                                            this.deliveryOpton = {
                                                pickup: !e.detail.checked,
                                                delivery: e.detail.checked,
                                            }
                                            if (e.detail.checked) this.showShippingAddress = true;
                                            this.setState({
                                                deliveryOpton:this.deliveryOpton,
                                                showShippingAddress:this.showShippingAddress
                                            });
                                        }} checked={this.deliveryOpton.delivery}/>
                                        <IonLabel>Shipping</IonLabel>
                                    </IonItem>
                                </IonList>
                            </IonList>
                            <IonList hidden={!this.showShippingAddress}>
                                <IonItem>
                                    <IonLabel position="floating">Shipping Address</IonLabel>
                                    <IonInput value={this.address.address}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">City</IonLabel>
                                    <IonInput value={this.address.city}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">State</IonLabel>
                                    <IonInput value={this.address.state}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput value={this.address.email}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Phone</IonLabel>
                                    <IonInput value={this.address.phone}/>
                                </IonItem>
                            </IonList>    
                            <IonItem lines="full">
                                <IonButton onClick={async()=>{
                                    await data.getUser(tools.getCreds().id)
                                }}>Checkout</IonButton>
                            </IonItem>
                        </IonList>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}

export default withIonLifeCycle(CheckOut);