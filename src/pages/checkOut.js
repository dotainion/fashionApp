import { IonAlert, IonButton, IonCard, IonCheckbox, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonPopover, IonRouterOutlet, IonThumbnail, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import { cardOutline, closeOutline, listOutline, locationOutline, radioButtonOnOutline } from 'ionicons/icons';
import React from 'react';
import { cart } from '../cart/utils';
import tools from '../components/Tools';
import { data } from '../database/database';
import { Header } from '../widgets/header';
import './checkOut.css';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { DeleteConfirm } from '../widgets/deleteConfirm';
import { MapModel } from '../map/googleMap';


class CheckOut extends React.Component{
    constructor(){
        super();

        this.maps = {
            state: false
        }
        
        this.showItemDeleteAlert = {
            state: false,
            data: null
        };
        this.showCompleteAlert = false;

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

        this.errorMessage = "";

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
        console.log(option)
        const addrOption = Object.keys(this.address);
        for (let addr of addrOption){
            /*if (option === this.address[addr]){ 
                return option;
            }*/
        }return "";
    }
    submitChecks(){
        if (this.deliveryOpton.delivery){
            this.errorMessage = "Only pickup options availble at the moment";
            return false;
        }else if (this.deliveryOpton.pickup){
            return true;
        }else{
            this.errorMessage = "Please choose a delevery option";
            return false;
        }
    }
    async submit(){
        if (this.submitChecks()){
            this.errorMessage = "";
            let newOrder = [];
            const orders = cart.get();
            const user = tools.getCreds();
            const date = tools.date.getTodaysDate();
            for (let order of orders){
                newOrder.push({
                    qty: order?.qty,
                    orderDate: date,
                    orderId: order?.id,
                    buyerId: user?.id,
                    sellerId: order?.record?.userId
                });
            }
            await data.order(newOrder);
            this.showCompleteAlert = true;
            cart.clear();

        }
        this.setState({
            errorMessage:this.errorMessage,
            showCompleteAlert:this.showCompleteAlert
        });
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

                <MapModel
                    state={this.maps.state}
                    onClose={()=>{
                        this.maps.state = false;
                        this.setState({maps:this.maps});
                    }}
                />
                
                <IonAlert
                    isOpen={this.showCompleteAlert}
                    onDidDismiss={() =>{
                        this.showCompleteAlert = false;
                        this.setState({
                            showCompleteAlert:this.showCompleteAlert
                        });
                    }}
                    cssClass=''
                    header="Alert!!"
                    subHeader="Successful"
                    message="Order send successful, you will receive an email when ready"
                    buttons={['OK']}
                    //duration={200}
                />
                <DeleteConfirm
                    state={this.showItemDeleteAlert.state}
                    onClose={()=>{
                        this.showItemDeleteAlert = {
                            state: false,
                            data: null
                        };
                        this.setState({showAlert:this.showItemDeleteAlert});
                    }}
                    onAccept={()=>{
                        cart.delete(this.showItemDeleteAlert.data?.id);
                        this.ionViewWillEnter();
                    }}
                    onDecline={()=>{
                        this.showItemDeleteAlert = {
                            state: false,
                            data: null
                        };
                        this.setState({showAlert:this.showItemDeleteAlert});
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
                                            <IonItem>
                                                <IonCheckbox onIonChange={(e)=>{
                                                    cart.onHold(item.id,e.detail.checked);
                                                }} checked={item.checked} slot="end"/>
                                                <IonLabel slot="end">Checkout</IonLabel>
                                            </IonItem>
                                            <IonThumbnail class="checkout-cart-image">
                                                <IonImg src={item?.record?.image}/>
                                            </IonThumbnail>
                                            <IonList class="checkout-cart-content-container">
                                                <IonLabel>{item?.record?.title}</IonLabel><br/>
                                                <IonLabel>Qty: {item?.qty}</IonLabel><br/>
                                                <IonLabel>Price: ${item?.record?.price}</IonLabel><br/>
                                                <IonNote>{item?.record?.detail}</IonNote>
                                                <IonIcon class="checkout-cart-delete checkout-cart-close-hover" onClick={()=>{
                                                    this.showItemDeleteAlert = {
                                                        state: true,
                                                        data: item
                                                    };
                                                    this.setState({showAlert:this.showItemDeleteAlert});
                                                }} icon={closeOutline}/>
                                            </IonList>
                                        </IonCard>
                                    )):
                                    <IonLabel>No Item In Cart</IonLabel>
                                }
                            </IonList>
                        </IonList>
                        <IonList class="checkout-type-main-container">
                            <IonList class="checkout-error-container">
                                <div>{this.errorMessage}</div>
                            </IonList>
                            <div onClick={()=>{
                                this.maps.state = true;
                                this.setState({maps:this.maps});
                            }} className="checkout-map-button checkout-map-hover">
                                <IonIcon icon={locationOutline}/>
                                <div className="checkout-map-text">Google Map</div>
                            </div>
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
                                        <label className="checkout-address-header">State</label>
                                        <select onChange={(e)=>{
                                            this.address.state = e.target.value;
                                            this.setState({address:this.address});
                                        }} className="checkout-address-options">
                                            {tools.address.list().map((addr,key)=>(
                                                <option key={key} defaultValue={this.isSelected(addr.state)}>{addr.state}</option>
                                            ))}
                                        </select>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">City</label>
                                        <select onChange={(e)=>{
                                            this.address.city = e.target.value;
                                            this.setState({address:this.address});
                                        }} className="checkout-address-options">
                                            {tools.address.cityByState(this.address.state).map((addr,key)=>(
                                                <option key={key} defaultValue={this.isSelected(addr.city)}>{addr.city}</option>
                                            ))}
                                        </select>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">Shipping Address</label>
                                        <select onChange={(e)=>{
                                            this.address.address = e.target.value;
                                            this.setState({address:this.address});
                                        }} className="checkout-address-options">
                                            {tools.address.addressByCity(this.address.city).map((addr,key)=>(
                                                <option key={key} defaultValue={this.isSelected(addr)}>{addr}</option>
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
                                    this.submit();
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