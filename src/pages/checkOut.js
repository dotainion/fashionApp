import { IonAlert, IonButton, IonCard, IonCheckbox, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonNote, IonPage, IonThumbnail, withIonLifeCycle } from '@ionic/react';
import { cardOutline, closeOutline, locationOutline, radioButtonOnOutline } from 'ionicons/icons';
import React, { createRef } from 'react';
import { cart } from '../cart/utils';
import tools from '../components/Tools';
import { data } from '../database/database';
import { Header } from '../widgets/header';
import './checkOut.css';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { DeleteConfirm } from '../widgets/deleteConfirm';
import { MapModel } from '../map/googleMap';
import { FashionAlert } from '../widgets/fashionAlert';


class CheckOut extends React.Component{
    constructor(){
        super();

        this.selectOptionState = createRef();
        this.selectOptionCity = createRef();
        this.selectOptionAddr = createRef();//ref added but not used

        this.maps = {
            state: false
        }

        this.showItemDeleteAlert = {
            state: false,
            data: null
        };

        this.showMessageAlert = {
            state: false,
            header: "",
            subHeader: "",
            message: ""
        };

        this.showLoading = false;

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
        this.disablePickupPayment = false;

        this.addrErrorMsg = "";

        this.toggleIcon = cardOutline;
    }
    listener(){
        setInterval(()=>{
            let element = document.getElementById("checkout-cart-list");
            if (!tools.isMobile()) element.style.display = "";
        },400);
    }
    initializeCartList(){
        const getCart = cart.get();
        if (getCart){ 
            this.cartList = getCart;
            this.setState({cartList:this.cartList});
        }
    }
    async initializeAddress(){
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
    async ionViewWillEnter(){
        this.initializeCartList();
        this.initializeAddress();
        this.listener();
    }
    submitChecks(){
        if (cart.get().length > 0){
            if (cart.checkedIndex() > 0){
                if (this.deliveryOpton.delivery){
                    this.showMessageAlert = {
                        state: true,
                        header: "Alert!!",
                        subHeader: "Unavailable",
                        message: "Only pickup options availble at the moment"
                    };
                    return false;
                }else if (this.deliveryOpton.pickup){
                    if (!this.disablePickupPayment){
                        this.showMessageAlert = {
                            state: true,
                            header: "Alert!!",
                            subHeader: "Unavailable",
                            message: "Credit cart payment is not yet available. Please choose (Pay on pickup)"
                        };
                        return false;
                    }
                    return true;
                }else{
                    this.showMessageAlert = {
                        state: true,
                        header: "Alert!!",
                        subHeader: "Delevery option",
                        message: "Please choose a delevery option"
                    };
                    return false;
                }
            }
            this.showMessageAlert = {
                state: true,
                header: "Alert!!",
                subHeader: "On hold",
                message: "All item are placed on hold. Please remove hold on items"
            };
            return false;            
        }
        this.showMessageAlert = {
            state: true,
            header: "Alert!!",
            subHeader: "Empty cart",
            message: "No item in cart"
        };
        return false;
    }
    async submit(){
        if (this.submitChecks()){
            this.showLoading = true;
            this.setState({showLoading:this.showLoading});
            let newOrder = [];
            const user = tools.getCreds();
            const date = tools.date.getTodaysDate();
            for (let order of cart.get()){
                if (order.checked){
                    newOrder.push({
                        qty: order?.qty,
                        orderDate: date,
                        orderId: order?.id,
                        buyerId: user?.id,
                        sellerId: order?.record?.userId,
                        address: this.address.address,
                        city: this.address.city,
                        state: this.address.state,
                        email: this.address.email,
                        phone: this.address.phone
                    });
                }
            }
            await data.order(newOrder);
            this.showLoading = false;
            this.showMessageAlert = {
                state: true,
                header: "Alert!!",
                subHeader: "Successful",
                message: "Order place successfully."
            };
            cart.clearSelected();
            this.initializeCartList();

        }
        this.setState({
            showLoading:this.showLoading,
            errorMessage:this.errorMessage,
            showMessageAlert:this.showMessageAlert
        });
    }
    isAddrMatchCity(){
        let STATE = false;
        let CITY = false;
        let ADDRESS = false;
        const BORDER = "1px solid red";
        for (let addr of tools.address.list()){
            if (addr.state === this.address.state){
                STATE = true;
                for (let parish of addr.list){
                    if (parish.city === this.address.city){
                        CITY = true;
                        for (let adr of parish.addr){
                            if (adr === this.address.address){
                                ADDRESS = true;
                            }
                        }
                        if (!ADDRESS){
                            this.selectOptionAddr.current.style.border = BORDER;
                        }
                    }
                }
                if (!CITY){
                    this.selectOptionCity.current.style.border = BORDER;
                }
            }
        }
        if (!STATE){
            this.selectOptionState.current.style.border = BORDER;
        }


        this.setState({address:this.address});
    }
    resetSelectOptionErrorThenCheckServicable(){
        const BORDER = "none";
        const msg = "We not yet shipping this parish";
        this.selectOptionAddr.current.style.border = BORDER;
        this.selectOptionCity.current.style.border = BORDER;
        this.selectOptionState.current.style.border = BORDER;
        if (tools.address.addressByCity(this.address.city).length <= 0){
            this.addrErrorMsg = `${msg} (${this.address.city}).`;
        }else{
            this.addrErrorMsg = "";
        }
        this.setState({addrErrorMsg:this.addrErrorMsg});
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

                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={this.showLoading}
                    onDidDismiss={() =>{
                        this.showLoading = false;
                        this.setState({showLoading:this.showLoading});
                    }}
                    message={'Please wait...'}
                    duration={5000}
                />

                <FashionAlert
                    state={this.showMessageAlert.state}
                    header={this.showMessageAlert.header}
                    subHeader={this.showMessageAlert.subHeader}
                    message={this.showMessageAlert.message}
                    onClose={()=>{
                        this.showMessageAlert = {
                            state: false,
                            header: "",
                            subHeader: "",
                            message: ""
                        };
                        this.setState({showCompleteAlert:this.showMessageAlert});
                    }}
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
                                                    this.initializeCartList();
                                                }} checked={item.checked} slot="end"/>
                                                <IonLabel slot="end">Ready</IonLabel>
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
                                    <div className="checkout-address-reset checkout-address-reset-hover" onClick={()=>{
                                        this.initializeAddress();
                                    }}>Reset</div>
                                    <div className="checkout-shipping-error">
                                        <div>{this.addrErrorMsg}</div>
                                    </div>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">State</label>
                                        <select ref={this.selectOptionState} onChange={(e)=>{
                                            this.address.state = e.target.value;
                                            this.resetSelectOptionErrorThenCheckServicable();
                                            this.isAddrMatchCity();
                                        }} className="checkout-address-options">
                                            <option defaultChecked hidden>{this.address.state}</option>
                                            {tools.address.list().map((addr,key)=>(
                                                <option key={key}>{addr.state}</option>
                                            ))}
                                        </select>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">City</label>
                                        <select ref={this.selectOptionCity} onChange={(e)=>{
                                            this.address.city = e.target.value;
                                            this.resetSelectOptionErrorThenCheckServicable();
                                            this.isAddrMatchCity();
                                        }} className="checkout-address-options">
                                            <option defaultChecked hidden>{this.address.city}</option>
                                            {tools.address.cityByState(this.address.state).map((addr,key)=>(
                                                <option key={key}>{addr.city}</option>
                                            ))}
                                        </select>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <label className="checkout-address-header">Shipping Address</label>
                                        <select ref={this.selectOptionAddr} onChange={(e)=>{
                                            this.address.address = e.target.value;
                                            this.resetSelectOptionErrorThenCheckServicable();
                                            this.isAddrMatchCity();
                                        }} className="checkout-address-options">
                                            <option defaultChecked hidden>{this.address.address}</option>
                                            {tools.address.addressByCity(this.address.city).map((addr,key)=>(
                                                <option key={key}>{addr}</option>
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
                                    <IonList hidden={!this.disablePickupPayment || this.showShippingAddress} class="checkout-payment-disable-container">
                                        <div className="checkout-payment-disable-address">
                                            <div>Pickup Address:</div>
                                            <p>
                                                Pick up is determined by individual 
                                                sales agent. You will be notify via email
                                            </p>
                                        </div>
                                    </IonList>
                                    <IonItem hidden={this.showShippingAddress} class="checkout-payment-disable-button">
                                        <IonCheckbox onIonChange={(e)=>{
                                            this.disablePickupPayment = e.detail.checked;
                                            this.setState({disablePickupPayment:this.disablePickupPayment});
                                        }} checked={this.disablePickupPayment}/>
                                        <IonLabel>Pay on pickup</IonLabel>
                                    </IonItem>
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