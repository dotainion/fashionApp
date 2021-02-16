import { IonContent, IonPage, IonCard, IonIcon, IonThumbnail, IonImg, IonPopover, IonItem, IonInput, IonButton, IonLabel, IonAlert, withIonLifeCycle, IonLoading, IonList, IonRefresherContent, IonRefresher, IonModal } from '@ionic/react';
import React, { Component } from 'react';
import './Home.css';
import { Header } from '../widgets/header';
import { Searchbar } from '../widgets/searchbar';
import no_item_img from '../images/shopping-bags.jpg';
import { data } from '../database/database';
import { chevronDownCircleOutline, searchOutline } from 'ionicons/icons';
import { CartDisplay } from '../cart/cartDisplay';
import { cart } from '../cart/utils';
import { auth } from '../auth/authentication';
import { LargeView } from '../widgets/largeView';
import { MdCloudOff } from 'react-icons/md';
import { FashionAlert } from '../widgets/fashionAlert';
import { AddToCart } from '../cart/addToCart';


class Home extends Component{
    constructor(){
        super()
    
        this.scrollRef = React.createRef();

        this.showLoading = true;
        this.showNoData = false;

        this.cartOpen = true;
        this.cartData = [];
        this.cartCount = 0;

        this.showAlert = false;
        this.showPopover = {
            state: false,
            data: undefined,
            qty: null
        };;
        this.showLargeView = {
            state: false,
            data: null
        };

        this.records = [];
        
        this.limit = 50
        this.searchLimit = this.limit;
        this.searchValue = "";
    };
    limitIterate(isMoreCheck=false){
        if (isMoreCheck){
            if (this.records.length + this.limit <= this.searchLimit){
                return true;
            }return false;
        }else{
            if (this.records.length >= this.searchLimit){
                this.searchLimit += this.limit;
            }
        }
    }
    async search(value=""){
        if (this.limitIterate(true)){
            this.showLoading = true;
            this.showNoData = false;
            this.setState({
                showLoading:this.showLoading,
                showNoData:this.showNoData
            });
            this.records = await data.search(value,this.searchLimit);
            this.showLoading = false;
            this.setState({
                records:this.records,
                showLoading:this.showLoading
            });
            this.limitIterate();
        }else{
            this.showNoData = true;
            this.setState({showNoData:this.showNoData});
        }
    }
    async ionViewWillEnter(){
        document.title = "Home";
        await auth.anonymous();
        const res = await data.getData(this.searchLimit);
        this.records = res.records;
        this.showLoading = false;
        this.cartPreload = false;
        this.setState({
            menuId:this.menuId,
            records:this.records,
            showLoading:this.showLoading
        });
        this.limitIterate();
    }
    async doRefresh(event){
        this.searchLimit = this.limit;
        const res = await data.getData(this.searchLimit);
        this.records = res.records;
        this.setState({records:this.records,});
        this.limitIterate();
        event.detail.complete();
    }
    addToCart(item){
        cart.add(item);
    }
    async setItemInCart(){
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
            <IonPage className="home-page">
                <Header 
                    cart
                    menu
                    sales
                    signout
                    ordered
                    count={cart.get()?.length}
                    cartClick={()=>{
                        this.setItemInCart();
                    }}
                />

                <CartDisplay 
                    data={this.cartData}
                    state={this.cartOpen}
                    preload={true}
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
                
                <FashionAlert
                    state={this.showAlert}
                    header="Alert!!"
                    subHeader="Duplicate"
                    message="Item already in your cart"
                    onClose={()=>{
                        this.showAlert = false;
                        this.setState({showAlert:this.showAlert});
                    }}
                />

                <AddToCart
                    state={this.showPopover.state}
                    title={this.showPopover?.data?.record?.title}
                    value={this.showPopover.qty}
                    onChange={(e)=>{
                        let qtyValue = e.detail.value;
                        if (qtyValue < 0){ 
                            this.showPopover.qty = 0;
                            this.setState({showPopover:this.showPopover});
                        }else{
                            this.showPopover.qty = qtyValue;
                        }
                    }}
                    onAccept={()=>{
                        this.showPopover.data["qty"] = this.showPopover.qty;
                        this.addToCart(this.showPopover.data);
                        this.showPopover = { state: false, data: undefined, qty: null };
                        this.setState({showPopover:this.showPopover});
                    }}
                    onClose={()=>{
                        this.showPopover = { state: false, data: undefined, qty: null };
                        this.setState({showPopover:this.showPopover});
                    }}
                />

                <LargeView 
                    state={this.showLargeView.state}
                    data={this.showLargeView.data}
                    onAdd={(item)=>{
                        this.checkDuplication(item);
                    }}
                    onClose={()=>{
                        this.showLargeView = { state: false, data: null }
                        this.setState({showLargeView:this.showLargeView});
                    }}
                />
                
                <div className="home-search-bar">
                    <Searchbar
                        onSearch={(value)=>{
                            this.searchLimit = this.limit;
                            this.records.length = 0;
                            this.search(value);
                        }}
                        onClear={()=>{
                            this.searchValue = "";
                        }} 
                        onChange={(value)=>{
                            this.searchValue = value;
                        }}
                    />
                </div>

                <IonContent ref={this.scrollRef} onIonScroll={async(e)=>{
                    const scrollElement = await this.scrollRef.current?.getScrollElement()
                    var scrolHightFullLength = scrollElement?.scrollHeight;
                    var scrollHeightContainer = this.scrollRef.current?.scrollHeight
                    if (scrolHightFullLength && scrollHeightContainer){
                        var bottomValue = scrolHightFullLength - scrollHeightContainer;
                        if (bottomValue <= e.detail.scrollTop){
                            await this.search(this.searchValue);
                        }
                    }
                }} class="home-main-scroll-container" scrollEvents={true}>
                    <IonRefresher slot="fixed" onIonRefresh={async(e)=>{this.doRefresh(e)}}>
                        <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing...">
                        </IonRefresherContent>
                    </IonRefresher>
                    {
                        this.records.length?
                        this.records.map((info, key)=>(
                            <IonCard key={key} class="home-item-container">
                                <IonIcon class="home-item-enlarge-icon" onMouseEnter={()=>{
                                    this.showLargeView = {
                                        state: true,
                                        data: info
                                    }
                                    this.setState({showLargeView:this.showLargeView});
                                }} icon={searchOutline}/>
                                <IonThumbnail class="home-item-image">
                                    <IonImg src={info?.record?.image}/>
                                </IonThumbnail>
                                <div className="home-item-info-container">
                                    <div className="home-item-info-sub-container">
                                        <div>{info?.record?.title || "Not Provided"}</div>
                                        <div>${info?.record?.price || "Not Provided"}</div>
                                        <div className="home-add-button home-add-button-hover" onClick={()=>{
                                            this.checkDuplication(info);
                                        }}>Add To Cart</div>
                                    </div>
                                </div>
                            </IonCard>
                        )):
                        <IonList class="home-no-items-container">
                            <IonThumbnail class="home-no-items-image">
                                <IonImg src={no_item_img}/>
                                    </IonThumbnail>
                            <IonItem class="home-no-items-content" lines="full">
                                <IonLabel>No Results</IonLabel>
                            </IonItem>
                            <IonItem  class="home-no-items-content2"lines="none">
                                <IonLabel>Try to search by a different different key word</IonLabel>
                            </IonItem>
                        </IonList>
                    }
                </IonContent>
                <IonList hidden={!this.showNoData} class="home-no-more-records-container">
                    <MdCloudOff className="home-no-more-records-icon"/>
                    <IonLabel>No more records</IonLabel>
                </IonList>
            </IonPage>
        );
    };
};

export default withIonLifeCycle(Home);
