import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonIcon, IonList, IonThumbnail, IonImg, IonCardContent, IonPopover, IonItem, IonSelect, IonInput, IonSelectOption, IonButton, IonLabel, IonAlert, withIonLifeCycle } from '@ionic/react';
import React, { Component } from 'react';
import './Home.css';
import { eyeOutline, close, search, cart } from 'ionicons/icons';
import Widgets from '../components/Widgets'
import axios from 'axios';
import tools from '../components/Tools';
import Menu from '../components/Menu';
import IMG from '../components/Images';
import ModelPopUp from '../components/MiniPage';


class Home extends Component{
    constructor(){
        super()

        this.alertShow = false;

        this.state = {
            posts:[]
        }

        this.imgEnlarge = {
            show:false,
            img:null,
            price:0,
            title:"",
            detail:"",
            data:null,
        }

        this.QTY = {
            show:false,
            temp:null,
            qty:1,
        }

        this.errorText = "";
        this.serverCallRetry = true;

        this.contentRef = React.createRef();
        this.arrowScroll = false;
        this.timeOut = null;
    };

    componentDidMount(){
        this.serverRequest()
    }

    async ionViewWillEnter(){
        tools.cartItems = tools.getSaveCartItems();
        for (var i=0;i<tools.cartItems.length;i++){
            await tools.clickById("cart-counter");
        }
    }

    serverRequest(){
        this.serverCallRetry = true;
        this.errorText = "";
        tools.clickById("start-loader");
        axios.post(tools.URL.GET,tools.CREDENTIALS)
        .then(response=>{
            this.setState({posts:response.data});
        })
        .catch(error=>{
            this.serverCallRetry = false;
            this.errorText = tools.MSG.serverDown;
        })
        .finally(final=>{
            tools.clickById("stop-loader");
            this.setState({errorText:this.errorText,serverCallRetry:this.serverCallRetry})
        })
    }

    addToCart(item){
        tools.cartItems.push(item);
        tools.clickById("cart-counter");
        tools.saveCartItems(tools.cartItems)
    }

    isItemExist(newItem){
        const key = ["img","title","price","email","detail"]
        for (var cartItem of tools.cartItems){
            if (newItem[key[0]] === cartItem[key[0]] && newItem[key[1]] === cartItem[key[1]] &&
                newItem[key[2]] === cartItem[key[2]] && newItem[key[3]] === cartItem[key[3]] &&
                newItem[key[4]] === cartItem[key[4]]){
                this.alertShow = true;
                    this.setState({alertShow:true});
                    return true;
            }
        }
        return false;
    }

    arrowScrollTimer(){
        if (!this.arrowScroll){
            this.arrowScroll = true;
            this.setState({arrowScroll:this.arrowScroll})
            this.timeOut = setTimeout(()=>{
                this.arrowScroll = false;
                this.setState({arrowScroll:this.arrowScroll})
                console.log("teting 1")
            }, 8000)
        }
    }

    render(){
        const { posts } = this.state;
        const { show: enlargeShow, img, price, title, detail, data } = this.imgEnlarge;
        const { show: qtyShow, temp, qty } = this.QTY;
        var searchValue = ""; var categoryValue = "";
        return(
            <IonPage>
                <Menu.menu/>
                <Widgets.Header/>
                <Widgets.routes/>
                <Widgets.loadSpinner/>
                <Widgets.openMenu/>
                <ModelPopUp.favorites/>
                <ModelPopUp.Cart/>
                <Widgets.pageArrow onClick={()=>{
                    this.contentRef.current.scrollToTop();
                    this.arrowScroll = false;
                    this.setState({arrowScroll:this.arrowScroll});
                    clearTimeout(this.timeOut);
                }} face="up" show={this.arrowScroll}/>
                <Widgets.pageArrow onClick={()=>{
                    this.contentRef.current.scrollToBottom();
                    this.arrowScroll = false;
                    this.setState({arrowScroll:this.arrowScroll});
                    clearTimeout(this.timeOut);
                }} face="down" show={this.arrowScroll}/>

                {/*Display alert when item already exist in cart*/}
                <IonAlert
                isOpen={this.alertShow}
                onDidDismiss={() =>{
                    this.alertShow = false;
                    this.setState({alertShow:false});
                }}
                cssClass='my-custom-class'
                header={'Stop!'}
                message={'This item already exist in your cart.'}
                buttons={['OK']}/>

                {/*this pop up will display the image in a large view with details*/}
                <IonPopover isOpen={enlargeShow} cssClass='my-custom-class' onDidDismiss={e => {
                    this.imgEnlarge.show= false;
                    this.setState({show:false})
                }}>
                    <IonImg src={img} style={{width:"250px",height:tools.compare(tools.platform(),true,"220px","480px")}}/>
                    <div style={{height:"200px",marginTop:tools.compare(tools.platform(),true,"-180px","-200px")}}>
                        <div style={{textAlign:"center",overflow:"auto",color:"red"}}>
                            <h1>{title}</h1>
                            <h1>{price}</h1>
                            <p><b>{detail}</b></p>
                        </div>
                        <IonCardContent style={{padding:"2px",color:"white"}} onClick={()=>{
                            if (!this.isItemExist(data)){
                                this.QTY.temp = data;
                                this.QTY.show = true;
                                this.imgEnlarge.show = false;
                                this.setState({qtyShow:true,show:false});
                            }
                        }} class="addToCartHover">
                            <div style={{backgroundColor:"SlateGrey",padding:"5px",textAlign:"center",width:"100%",cursor:"pointer"}}>
                                <IonIcon icon={cart}/>ADD TO CART</div>
                        </IonCardContent>
                    </div>
                </IonPopover>

                {/*this pop up will display a input to enter item quantity*/}
                <IonPopover isOpen={qtyShow} cssClass='my-custom-class' onDidDismiss={e => {
                    this.QTY.show = false;
                    this.setState({qtyShow:false});
                }}>
                    <IonItem>
                        <IonLabel style={{float:"left",width:"100px",fontSize:"15px",marginLeft:"30px"}}>Item quantity</IonLabel>
                        <IonInput style={{float:"right",border:"1px solid #000",height:"20px",marginRight:"30px",borderRadius:"25px"}} onIonChange={e=>{
                            this.QTY.qty = e.detail.value;
                            this.setState({qty:this.QTY.qty})
                        }} type="number" value={qty}/>
                    </IonItem>
                    <IonItem>
                        <IonButton color="light"  style={{marginLeft:"45px",width:"65px"}} onClick={()=>{
                            this.QTY.show = false;
                            this.setState({qtyShow:false});
                        }}>Cancel</IonButton>
                        <IonButton color="light" style={{width:"65px"}} onClick={()=>{
                            temp["Qty"] = qty;
                            this.addToCart(temp);
                            this.QTY.show = false;
                            this.setState({qtyShow:false});
                        }}>Okay</IonButton>
                    </IonItem>
                </IonPopover>

                <IonContent ref={this.contentRef} scrollEvents={true} onIonScrollEnd={e=>{
                    this.arrowScrollTimer()
                }}>
                    {/*this is the search input bar*/}
                    <IonCard style={{marginLeft:tools.compare(tools.platform(),true,"","30%"),marginRight:tools.compare(tools.platform(),true,"","30%")}}>
                        <IonItem>
                            <IonInput onIonChange={e => {searchValue = e.detail.value}} placeholder="Search" value={searchValue} />
                            <IonIcon class="searchDeleteHover" onClick={()=>{searchValue = "";this.setState({searchValue:""})}} icon={close} />
                            <IonSelect interface="popover" placeholder="Category" value={categoryValue} onIonChange={e =>{
                                categoryValue = e.detail.value;
                            }}>
                                {
                                    tools.searchCategory ?
                                    tools.searchCategory.map((category,i)=>
                                    <IonSelectOption key={i}>{category}</IonSelectOption>
                                    ):
                                    null
                                }
                            </IonSelect>
                            <IonIcon class="searchGoHover searchIconFg" icon={search} onClick={()=> {
                                tools.CREDENTIALS.search = searchValue;
                                tools.CREDENTIALS.cagegory = categoryValue;
                                tools.CREDENTIALS.moreData = 0;
                                this.serverRequest();
                            }}/>
                        </IonItem>
                    </IonCard>

                    <div style={{textAlign:"center",color:"red"}} lines="none">
                        <IonLabel>{this.errorText}</IonLabel>
                        <div hidden={this.serverCallRetry} style={{textDecoration:"underline",cursor:"pointer",color:"blue"}}>
                            <span onClick={()=>{this.serverRequest()}}>Retry</span>
                        </div>
                    </div>

                    <IonGrid>
                    <IonRow>
                    {
                        posts.length ?
                        posts.map(post => 
                        <IonCol key={post.id}>
                            <IonCard style={{margin:"0px",width:tools.compare(tools.platform(),true,"105px","210px"),height:"100%"}} class="cardItemOnHover">
                            <div style={{textAlign:"right"}}>
                                <IonIcon style={{marginTop:"10px",marginRight:"10px"}} icon={eyeOutline} onClick={()=>{
                                    this.imgEnlarge.show = true;
                                    this.imgEnlarge.img = IMG.base64+post.img;
                                    this.imgEnlarge.title = post.title;
                                    this.imgEnlarge.price = post.price;
                                    this.imgEnlarge.detail = post.detail;
                                    this.imgEnlarge.data = post;
                                    this.setState({
                                        img:IMG.base64+post.img,
                                        show:true,
                                        title:post.title,
                                        price:post.price,
                                        detail:post.detail,
                                        data:post
                                    })
                                }}/>
                            </div>
                            <div onClick={()=>{}}>
                                <IonList>
                                    <IonThumbnail style={{width:tools.compare(tools.platform(),true,"105px","210px"),height:tools.compare(tools.platform(),true,"80px","160px")}} slot="start">
                                        <IonImg src={IMG.base64+post.img} />
                                    </IonThumbnail>
                                </IonList>
                                <IonCardContent style={{height:"80px"}}>
                                    <p style={{textAlign:"center"}}>{post.title}</p>
                                    <p style={{textAlign:"center"}}>{post.price}</p>
                                </IonCardContent>
                                <IonCardContent style={{padding:"2px"}} class="addToCartHover" onClick={()=>{
                                    if (!this.isItemExist(post)){
                                        this.QTY.temp = post;
                                        this.QTY.show = true;
                                        this.setState({qtyShow:true});
                                    }
                                }}> 
                                    <div style={{backgroundColor:"SlateGrey",color:"white",position:"absolute",width:"98%",cursor:"pointer"}}>
                                        <div style={{float:"left",marginLeft:"8px"}}>
                                            <IonIcon icon={cart}/>
                                        </div>
                                        <div style={{float:"right",marginRight:"8px",width:"70%"}}>
                                            <p style={{fontSize:"10px"}}>ADD TO CART</p>
                                        </div>
                                    </div> 
                                    <div>.</div>
                                </IonCardContent>  
                            </div>
                            </IonCard>
                        </IonCol>
                        ):
                        <div>
                            <IonImg src={IMG.noItemImg}/>
                            <div>
                                <Widgets.textStyle title="" color="" name="No item available" L="" C="center"/>
                            </div>
                        </div>
                    }
                    </IonRow>
                    </IonGrid>
                    
                    {/*this button appears at the bottom of items for next sets of items*/}
                    <div hidden={true} style={{textAlign:"center"}}>
                        <IonButton color="light" onClick={()=>{

                        }}>{'Next >>'}</IonButton>
                    </div>
                    <Widgets.BottomNavWebInfo/> 
                </IonContent>
                <Widgets.BottomNavMobileBar/>
            </IonPage>
        );
    };
};

export default withIonLifeCycle(Home);
