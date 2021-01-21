import { IonContent, IonPage, IonCard, IonIcon, IonThumbnail, IonImg, IonPopover, IonItem, IonSelect, IonInput, IonSelectOption, IonButton, IonLabel, IonAlert, withIonLifeCycle, IonModal, IonRouterOutlet, IonLoading } from '@ionic/react';
import React, { Component } from 'react';
import './Home.css';
import { Menu } from '../components/Menu';
import { Header } from '../widgets/header';
import no_item_img from '../images/shopping-bags.jpg';
import { data } from '../database/database';
import { searchOutline } from 'ionicons/icons';
import { CartDisplay } from '../cart/cartDisplay';
import { cart } from '../cart/utils';


class Home extends Component{
    constructor(){
        super()

        this.showLoading = true;

        this.cartOpen = false;
        this.cartData = [];
        this.cartCount = 0;

        this.showAlert = false;
        this.showPopover = {
            state: false,
            data: undefined,
            qty: null
        };;

        this.records = [];
    };
    async ionViewWillEnter(){
        const res = await data.getData();
        this.records = res.records;
        this.showLoading = false;
        this.setState({
            records:this.records,
            showLoading:this.showLoading
        });
    }
    addToCart(item){
        cart.add(item);
    }
    setItemInCart(){
        this.cartOpen = true;
        this.cartData = cart.get();
        this.setState({
            cartOpen:this.cartOpen,
            cartData:this.cartData
        });
    }
    checkDuplication(item){
        const fromCart = cart.get();
        for (let value of fromCart){
            if (value.id === item.id){
                this.showAlert = true;
                this.setState({showAlert:this.showAlert});
                return;
            }
        }
        this.showPopover = {
            state: true,
            data: item,
            qty: 1
        };
        this.setState({showPopover:this.showPopover});
    }
    render(){
        return(
            <IonPage>
                <Header 
                    count={cart.get()?.length}
                    cartClick={()=>{
                        this.setItemInCart();
                    }}
                />
                <Menu/>
                <CartDisplay 
                    data={this.cartData}
                    state={this.cartOpen}
                    onClose={()=>{
                        this.cartOpen = false;
                        this.setState({cartOpen:this.cartOpen});
                    }}
                    refresh={()=>{
                        this.setItemInCart();
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
                <IonAlert
                    isOpen={this.showAlert}
                    onDidDismiss={() =>{
                        this.showAlert = false;
                        this.setState({showAlert:this.showAlert});
                    }}
                    cssClass=''
                    header="Alert!!"
                    subHeader="Duplicate"
                    message="Item already in you cart"
                    buttons={['OK']}
                />
                <IonPopover
                    cssClass=''
                    event={undefined}
                    isOpen={this.showPopover.state}
                    onDidDismiss={() =>{
                        this.showPopover = {
                            state: false,
                            data: undefined,
                            qty: null
                        };
                        this.setState({showPopover:this.showPopover});
                    }}
                >
                    <IonItem style={{textAlign:"center"}} lines="full">
                        <IonLabel>{this.showPopover?.data?.record?.title}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Qty</IonLabel>
                        <IonInput value={this.showPopover.qty} onIonChange={(e)=>{
                            let qtyValue = e.detail.value;
                            if (qtyValue < 0){ 
                                this.showPopover.qty = 0;
                                this.setState({showPopover:this.showPopover});
                            }else{
                                this.showPopover.qty = qtyValue;
                            }
                        }} type="number"/>
                    </IonItem>
                    <IonItem>
                        <IonButton color="light" onClick={() =>{
                            this.showPopover = {
                                state: false,
                                data: undefined,
                                qty: null
                            };
                            this.setState({showPopover:this.showPopover});
                        }} slot="end">Cancel</IonButton>
                        <IonButton color="light" onClick={() =>{
                            this.showPopover.data["qty"] = this.showPopover.qty;
                            this.addToCart(this.showPopover.data);
                            this.showPopover = {
                                state: false,
                                data: undefined,
                                qty: null
                            };
                            this.setState({showPopover:this.showPopover});
                        }} slot="end">Save</IonButton>
                    </IonItem>
                </IonPopover>

                <IonContent>
                    {
                        this.records.length?
                        this.records.map((info, key)=>(
                            <IonCard key={key} class="home-item-container">
                                <IonIcon class="home-item-enlarge-icon" icon={searchOutline}/>
                                <IonThumbnail class="home-item-image">
                                    <IonImg src={info?.record?.image}/>
                                </IonThumbnail>
                                <div className="home-item-info-container">
                                    <div>{info?.record?.title || "Not Provided"}</div>
                                    <div>${info?.record?.price || "Not Provided"}</div>
                                    <div className="home-add-button" onClick={()=>{
                                        this.checkDuplication(info);
                                    }}>Add To Cart</div>
                                </div>
                            </IonCard>
                        )):
                        <IonThumbnail class="home-no-items-image">
                            <IonImg src={no_item_img}/>
                        </IonThumbnail>
                    }
                </IonContent>
            </IonPage>
        );
    };
};

export default withIonLifeCycle(Home);
