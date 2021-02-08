import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonFooter, IonIcon, IonButtons, IonItem, IonMenuButton, IonRouterOutlet, IonButton, IonLabel, IonLoading, IonPopover, IonList, IonToast } from '@ionic/react';
import tools from '../components/Tools';
import './Widgets.css';
import { cart, arrowUpCircleSharp, arrowDownCircleSharp } from 'ionicons/icons';


class Widgets{

    BottomNavMobileBar(){
        return(
            <>
                <IonFooter hidden={tools.compare(tools.isMobile(),true,false,true)}>
                    <IonToolbar>
                        <IonTitle>{tools.MSG.APPNAME}</IonTitle>
                    </IonToolbar>
                </IonFooter>
            </>
        )
    }

    BottomNavWebInfo(){
        return(
            <>
                <div hidden={tools.compare(tools.isMobile(),true,true,false)} 
                    style={{width:"100%", backgroundColor:"SteelBlue",paddingTop:"10px",bottom:0,position:"absolute"}}>
                    <IonItem color="medium" style={{marginBottom:"20px"}}>
                        <div style={{float:"right",width:"100%",paddingTop:"20px",height:"130px"}}>
                            <IonLabel style={{backgroundColor:"gray"}}><b>Company Info</b></IonLabel>
                            {
                                tools.companyInfo ?
                                tools.companyInfo.map((item, i)=>
                                    <IonLabel key={i} class="bottomWebInfoBar">{item}</IonLabel>
                                ):
                                null
                            }
                        </div>

                        <div style={{float:"right",width:"100%",paddingTop:"20px",height:"130px"}}>
                            <IonLabel style={{backgroundColor:"gray"}}><b>Quick Links</b></IonLabel>
                            {
                                tools.quickLinks ?
                                tools.quickLinks.map((item, i)=>
                                    <IonLabel key={i} class="bottomWebInfoBar">{item}</IonLabel>
                                ):
                                null
                            }
                        </div>

                        <div style={{float:"right",width:"100%",paddingTop:"20px",height:"130px"}}>
                            <IonLabel style={{backgroundColor:"gray"}}><b>Categories</b></IonLabel>
                            {
                                tools.searchCategory ?
                                tools.searchCategory.map((item, i)=>
                                    <IonLabel key={i} class="bottomWebInfoBar">{item}</IonLabel>
                                ):
                                null
                            }
                        </div>

                        <div style={{float:"right",width:"100%",paddingTop:"20px",height:"130px"}}>
                            <IonLabel style={{backgroundColor:"gray"}}><b>Payment Method</b></IonLabel>
                        </div>
                    </IonItem>
                </div>
            </>
        )
    }

    loadSpinner(){
        const [ showLoading, setShowLoading ] = useState(false);
        return(
            <>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                    //duration={5000}
                    />
                
                <IonButton hidden id="start-loader" onClick={()=>{
                    setShowLoading(true);
                }}/>
                <IonButton hidden id="stop-loader" onClick={()=>{
                    setShowLoading(false);
                }}/>
            </>
        )
    }

    languages(){
        const [ showLanguage, setShowLanguage ] = useState(false);
        return(
            <>
                <IonPopover isOpen={showLanguage} cssClass='my-custom-class' onDidDismiss={()=>{
                    setShowLanguage(false);
                }}>
                    <IonList style={{border:"1px solid #000",margin:"2%"}}>
                        {
                            tools.LANGUAGES.length ?
                            tools.LANGUAGES.map((language, i)=>
                                <IonItem key={i}>
                                    <IonLabel class="languageHover" onClick={()=>{
                                        console.log(language)
                                    }} style={{padding:"5px"}}>{language}</IonLabel>
                                </IonItem>
                                
                            ):null
                        }
                    </IonList>
                    <IonItem style={{marginLeft:"60%"}}>
                        <IonButton color="light" onClick={()=>{
                            setShowLanguage(false);
                        }}>close</IonButton>
                    </IonItem>
                </IonPopover>

                <IonButton hidden id="show-language" onClick={()=>{
                    setShowLanguage(true);
                }}/>
            </>
        )
    }


    passwordProgressBar(data){
        var results = tools.passwordStrength(data.creds);
        var percentageValue = ((100 / data.max) * parseFloat(results.value)).toString();
        return(
            <>
                <div style={{width:"100%",height:"9px",marginTop:data.mTop,
                        borderRadius:"25px",border:"1px solid gray"}}>
                    <div style={{backgroundColor:results.color,width:percentageValue+"%",
                            height:"7px",borderRadius:"25px",marginTop:"0px"}}></div>
                </div>
                <div style={{color:results.color,fontSize:"12px",margin:"5px"}}>{results.text}</div>
            </>
        )
    }

    pageArrow(data){
        const [showText,setShowText] = useState(false);
        const [hoverColor,setHoverColor] = useState("lightblue");

        const arrow = {
            up:arrowUpCircleSharp,
            down:arrowDownCircleSharp
        }
        var style = {
            up:{
                position: "fixed",
                marginTop: tools.compare(tools.isMobile(),true,"20%","7%"),
                marginRight: tools.compare(tools.isMobile(),true,"0px","20px"),
                right: "0",
                zIndex: "999",
                fontSize: "40px",
                color: hoverColor,
            },
            down:{
                position: "fixed",
                marginRight: tools.compare(tools.isMobile(),true,"0px","20px"),
                marginBottom: tools.compare(tools.isMobile(),true,"20%","7%"),
                right: "0",
                bottom:"0",
                zIndex: "999",
                fontSize: "40px",
                color: hoverColor,
            },
            text:{
                fontSize:"12px",
                textAlign:"center",
            }
        }
        return(
            <>
                <div hidden={!data.show} style={style[data.face]}>
                    <div hidden={!showText} style={style.text}>{data.face}</div>
                    <IonIcon icon={arrow[data.face]} onClick={()=>{
                        if (data.onClick){
                            data.onClick();
                        }
                    }} onMouseEnter={()=>{
                        setShowText(true);
                        setHoverColor("teal");
                    }} onMouseLeave={()=>{
                        setShowText(false);
                        setHoverColor("lightblue");
                    }}/> 
                </div>                 
            </>
        )
    }

    openMenu(){
        const textColor = "teal";
        const borderColor = "teal";
        const iconColor = "teal";
        const mainStyle = {
            position:"fixed",
            zIndex: 999,
            top:"15%",
            fontSize:"11px",
            cursor:"pointer",
            width:"27px",
            height:"180px",
        }
        const subStyle1 = {
            width:"31px",
            color:textColor,
            marginLeft:"2px",
        }
        const subStyle2 = {
            textAlign:"center",
            borderRight:"1px solid "+borderColor,
            borderTopRightRadius:"30px",
            borderBottomRightRadius:"30px",
            marginLeft:"-12px",
            width:"60px",
            color:iconColor,
        }
        const subStyle3 = {
            fontSize:"20px",
            marginLeft:"-60px",
            transform:"rotate(-90deg)",
            borderBottom:"1px solid "+borderColor,
            borderLeft:"1px solid "+borderColor,
            marginTop:"60px",
            width:"150px",
            textAlign:"center",
            color:textColor,
        }
        const verticalText = "More options";
        return(
            <>
                <div hidden={tools.compare(tools.isMobile(),true,true,false)} onClick={()=>{
                    tools.clickById("side-menu-button")
                }} style={mainStyle}>
                    <div style={subStyle1}>
                        <IonLabel>Menu</IonLabel>
                    </div>
                    <div style={subStyle2}>
                        <IonButtons>
                            <IonMenuButton autoHide={false}/>
                        </IonButtons>
                    </div>
                    
                    <div style={subStyle3}>
                        <IonLabel>{verticalText}</IonLabel>
                    </div>
                </div>
                
            </>
        )
    }

    popUpMsg(show=false,time=2000,position="top",msg="Pop up message"){
        const [showToast,setShowToast] = useState(false);
        if (show){
            setShowToast(true);
        }else if (show === false){
            setShowToast(false);
        }else{
            console.log("show: only accept boolean value");
        }
        return(
            <>
                <IonToast
                    isOpen={showToast}
                    position={position}
                    onDidDismiss={() => setShowToast(false)}
                    message={msg}
                    duration={time}/>
            </>
        )
    }

    dropDownMenu(){
        //not in use yet or develepted
        const [hide, setHIde] = useState(true)
        return(
            <>
                <div hidden={hide} style={{position:"fixed",zIndex: 999}}>

                </div>

                <IonButton hidden id="menu" onClick={()=>{setHIde(false)}}/>
            </>
        )
    }
}


//var systemWidgets = new Widgets()
//export default systemWidgets;