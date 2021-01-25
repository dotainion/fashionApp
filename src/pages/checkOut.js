import { IonAlert, IonButton, IonCard, IonCheckbox, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonThumbnail, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import { cardOutline, closeOutline, listOutline, radioButtonOnOutline } from 'ionicons/icons';
import React from 'react';
import { cart } from '../cart/utils';
import { Menu } from '../components/Menu';
import tools from '../components/Tools';
import { data } from '../database/database';
import { Header } from '../widgets/header';
import './checkOut.css';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { DeleteConfirm } from '../widgets/deleteConfirm';



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

        this.toggleIcon = cardOutline;
    }
    listener(){
        setInterval(()=>{
            let element = document.getElementById("checkout-cart-list");
            if (!tools.isMobile()) element.style.display = "";
        },400);
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
        this.listener();
        this.setState({address:this.address});
    }
    isSelected(option){
        const addrOption = Object.keys(this.address);
        for (let addr of addrOption){
            if (option.toLowerCase() === this.address[addr].toLowerCase()){ 
                return addr;
            }
        }return "";
    }
    submit(){

    }
    render(){
        return(
            <IonPage>
                <Header 
                    menu
                    sales
                    home
                    toggleMenu={{
                        icon: this.toggleIcon,
                        onClick: ()=>{
                            let element = document.getElementById("checkout-cart-list");
                            if (element.style.display === "none"){
                                element.style.display = "";
                                this.toggleIcon = cardOutline;
                                this.setState({toggleIcon:this.toggleIcon});
                            }else{
                                element.style.display = "none";
                                this.toggleIcon = radioButtonOnOutline;
                                this.setState({toggleIcon:this.toggleIcon});
                            }
                        }
                    }}
                />
                <DeleteConfirm
                    state={this.showAlert.state}
                    onClose={()=>{
                        this.showAlert = {
                            state: false,
                            data: null
                        };
                        this.setState({showAlert:this.showAlert});
                    }}
                    onAccept={()=>{
                        cart.delete(this.showAlert.data?.id);
                        this.ionViewWillEnter();
                    }}
                    onDecline={()=>{
                        this.showAlert = {
                            state: false,
                            data: null
                        };
                        this.setState({showAlert:this.showAlert});
                    }}
                />
                <IonContent>
                    <IonList class="checkout-main-container">
                        <IonList id="checkout-cart-list" class="checkout-cart-list-container">
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
                            <IonList class="checkout-address-card-main-container">
                                <IonList class="checkout-shipping-info-container" hidden={!this.showShippingAddress}>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">Shipping Address</label>
                                        <select className="checkout-address-options">
                                            {tools.address.getAddress().map((addr,key)=>(
                                                <option key={key} defaultValue={this.isSelected(this.address.address)}>{addr}</option>
                                            ))}
                                        </select>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">City</label>
                                        <select className="checkout-address-options">
                                            {tools.address.getCities().map((city,key)=>(
                                                <option key={key} defaultValue={this.isSelected(this.address.city)}>{city}</option>
                                            ))}
                                        </select>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">State</label>
                                        <select className="checkout-address-options">
                                            {tools.address.getStates().map((state,key)=>(
                                                <option key={key} defaultValue={this.isSelected(this.address.state)}>{state}</option>
                                            ))}
                                        </select>
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
                                <IonList class="checkout-payment-container">
                                    <IonItem>
                                        <IonLabel>Pay With</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <FaCcMastercard className="checkout-cards"/>
                                        <FaCcVisa className="checkout-cards"/>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>cardholder</IonLabel>
                                        <input type="text" className="checkout-input" slot="end"/>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>date</IonLabel>
                                        <input type="date" className="checkout-input" slot="end"/>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>CVC/CVV</IonLabel>
                                        <input type="number" className="checkout-input" slot="end"/>
                                    </IonItem>
                                </IonList>
                            </IonList>   
                            <IonList class="checkout-button">
                                <IonButton onClick={async()=>{
                                    await data.getUser(tools.getCreds().id)
                                }}>Checkout</IonButton>
                            </IonList>
                        </IonList>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}

export default withIonLifeCycle(CheckOut);