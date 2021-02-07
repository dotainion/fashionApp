import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRouterOutlet, IonTextarea, IonThumbnail, IonTitle, IonToolbar, useIonViewWillEnter, useIonViewWillLeave, withIonLifeCycle } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import './inventory.css';
import img from '../images/defaultImage.jpg';
import { closeOutline, cloudUploadOutline, imagesOutline, listOutline, radioButtonOnOutline } from 'ionicons/icons';
import tools from '../components/Tools';
import { data } from '../database/database';
import { DeleteConfirm } from '../widgets/deleteConfirm';
import { Header } from '../widgets/header';



const Profile = () =>{
    const inventoryToggleRef = useRef();
    const orderToggleRef = useRef();
    const inventorySwitchRef = useRef();
    const orderSwitchRef = useRef();
    const uploadToggleRef = useRef();
    const uploadSwitchRef = useRef();
    const [toUpload, setToUpload] = useState({
        image: img, title: "",price: "", detail: "", userId: ""
    });
    const [showAlert, setShowAlert] = useState({
        state: false,
        data: null
    });
    const [orders, setOrders] = useState([]);
    const [menu, setMenu] = useState(cloudUploadOutline);
    const [userRecords, setUserRecords] = useState([]);
    const addUserInfo = (cmd,value) =>{
        setToUpload({
            image: tools.compare(cmd,"i",value,toUpload.image), 
            title: tools.compare(cmd,"t",value,toUpload.title),
            price: tools.compare(cmd,"p",value,toUpload.price),
            detail: tools.compare(cmd,"d",value,toUpload.detail),
            userId: tools.getCreds().id
        });
    };

    const sendToDatabase = async() =>{
        if (toUpload.title && toUpload.price){
            await data.addData(toUpload);
            setToUpload({
                image: img, title: "",
                price: "", detail: "", userId: ""
            });
        }else{

        }
    }
    const initialize = async () =>{
        const user = tools.getCreds();
        const record = await data.getDataById(user?.id);
        setUserRecords(record);
        const order = await data.getOrder(user?.id);
        setTimeout(()=>{
            setOrders(order);
        },500);
    }
    const saveButtonHidden = (id,state=false) =>{
        let element = document.getElementById(id);
        if (element) element.hidden = state;
    }
    const updateRecord = async(id) =>{
        let title = document.getElementById(`${id}title`);
        let price = document.getElementById(`${id}price`);
        let detail = document.getElementById(`${id}detail`);
        const record = {
            title: title.value,
            price: price.value,
            detail: detail.value
        }
        await data.updateRecord(id,record);
    }
    const deleteRecord = async(id) =>{
        await data.deleteRecord(id);
        initialize();
    }
    const resetItemValue = (id,titleDefault,priceDefault,detailDefault) =>{
        let title = document.getElementById(`${id}title`);
        let price = document.getElementById(`${id}price`);
        let detail = document.getElementById(`${id}detail`);
        title.value = titleDefault;
        price.value = priceDefault;
        detail.value = detailDefault;
    }
    const togglePage = (cmd) =>{
        const bgReset = () =>{
            orderToggleRef.current.style.backgroundColor = "lightgray";
            inventoryToggleRef.current.style.backgroundColor = "lightgray";
            uploadToggleRef.current.style.backgroundColor = "lightgray";
            inventorySwitchRef.current.hidden = true;
            orderSwitchRef.current.hidden = true;
            uploadSwitchRef.current.hidden = true;
        }
        bgReset();
        if (cmd === "inventory"){
            inventoryToggleRef.current.style.backgroundColor = "white";
            inventorySwitchRef.current.hidden = false;
            if (!tools.isMobile()) uploadSwitchRef.current.hidden = false;
        }else if (cmd === "order"){
            orderToggleRef.current.style.backgroundColor = "white";
            orderSwitchRef.current.hidden = false;
        }else if (cmd === "upload"){
            uploadToggleRef.current.style.backgroundColor = "white";
            uploadSwitchRef.current.hidden = false;
        }else console.log(`${cmd} value not recognize`);
    }
    useIonViewWillLeave(()=>{
        
    });
    useIonViewWillEnter(()=>{
        document.title = "Sales Upload";
        initialize();
    });
    useEffect(()=>{
        inventoryToggleRef.current.style.backgroundColor = "white";
        orderToggleRef.current.style.backgroundColor = "lightgray";
        inventorySwitchRef.current.hidden = false;
        orderSwitchRef.current.hidden = true;
    },[]);
    return(
        <IonPage>
            <Header
                home
                menu
            />

            <IonList className="profile-page-toggle-container">
                <div className="profile-page-toggle-buttons" onClick={()=>{
                    togglePage("inventory");
                }} ref={inventoryToggleRef}>Sales</div>
                <div className="profile-page-toggle-buttons" onClick={()=>{
                    togglePage("order")
                }} ref={orderToggleRef}>Order Status</div>
                <div className="profile-page-toggle-buttons" onClick={()=>{
                    togglePage("upload");
                }} ref={uploadToggleRef}>Upload</div>
            </IonList>

            <DeleteConfirm
                state={showAlert.state}
                onClose={()=>{
                    setShowAlert({
                        state: false,
                        data: null
                    });
                }}
                onAccept={()=>{
                    deleteRecord(showAlert.data.id);
                }}
                onDecline={()=>{
                    setShowAlert({
                        state: false,
                        data: null
                    });
                }}
            />
            <IonContent>
                <IonList ref={orderSwitchRef}>
                    <IonLabel>test order satus</IonLabel>
                    {
                        orders.map((order,key)=>(
                            <IonList key={key}>
                                {console.log(order)}
                                <IonThumbnail>
                                    <IonImg src={order?.record?.image}/>
                                </IonThumbnail>
                                <IonItem lines="full">
                                    <IonLabel>{order?.record?.title}</IonLabel>
                                </IonItem>
                                <IonItem lines="full">
                                    <IonLabel>{order?.record?.price}</IonLabel>
                                </IonItem>
                                <IonItem lines="full">
                                    <IonLabel>{order?.record?.detail}</IonLabel>
                                </IonItem>
                            </IonList>
                        ))
                    }
                </IonList>

                <IonList class="profile-flext-container">
                    <IonList ref={inventorySwitchRef} class="profile-list-container">
                        <div className="profile-list-header">Store Items</div>
                        <IonList class="profile-item-list">
                            {userRecords.map((item,key)=>(
                                <IonCard style={{display:"flex"}} key={key}>
                                    <IonThumbnail class="profile-item-list-image">
                                        <IonImg src={item.record.image}/>
                                    </IonThumbnail>
                                    <div style={{width:"100%"}}>
                                        <div className="profile-item-list-input-container">
                                            <input className="profile-item-list-input" onChange={()=>{
                                                saveButtonHidden(`${item.id}${key}`);
                                            }} type="text" id={`${item.id}title`} defaultValue={item.record.title}/>
                                        </div>
                                        <div className="profile-item-list-input-container">
                                            <span>$</span>
                                            <input className="profile-item-list-input" onChange={()=>{
                                                saveButtonHidden(`${item.id}${key}`);
                                            }} type="number" id={`${item.id}price`} defaultValue={item.record.price}/>
                                        </div>
                                        <div className="profile-item-list-input-container">
                                            <textarea className="profile-item-list-textarea" onChange={()=>{
                                                saveButtonHidden(`${item.id}${key}`);
                                            }} type="text" id={`${item.id}detail`} defaultValue={item.record.detail}/>
                                        </div>
                                        <div className="profile-item-list-save-button-container" id={`${item.id}${key}`} hidden>
                                            <div className="profile-item-list-save-button profile-button-click" onClick={()=>{
                                                updateRecord(item.id);
                                                saveButtonHidden(`${item.id}${key}`,true);
                                            }}>Save changes</div>
                                            <div className="profile-item-list-save-button profile-button-click" onClick={()=>{
                                                resetItemValue(item.id,item.record.title,item.record.price,item.record.detail);
                                                saveButtonHidden(`${item.id}${key}`,true);
                                            }}>Cancel</div>
                                        </div>
                                        <IonIcon class="profile-item-delete profile-item-delete-hover" onClick={()=>{
                                            setShowAlert({
                                                state: true,
                                                data: item
                                            });
                                        }} icon={closeOutline}/>
                                    </div>
                                </IonCard>
                            ))}
                        </IonList>
                    </IonList>
                    <IonList ref={uploadSwitchRef} class="profile-container">
                        <IonItem class="profile-header" lines="none">
                            <IonLabel>Upload and Advertise</IonLabel>
                        </IonItem>
                        <IonList class="profile-spliter">
                            <IonList class="profile-user-info">
                                <IonList class="profile-product-info">
                                    <IonLabel color="medium">Product Information</IonLabel>
                                    <IonItem>
                                        <IonLabel position="floating">Item Title</IonLabel>
                                        <IonInput onIonChange={(e)=>{
                                            addUserInfo("t",e.detail.value);
                                        }} value={toUpload.title}/>
                                    </IonItem>
                                    <div className="profile-dollar-sign-container">
                                        <span className="profile-dollar-sign">$</span>
                                        <IonItem>
                                            <IonLabel position="floating">Item Price</IonLabel>
                                            <IonInput onIonChange={(e)=>{
                                                addUserInfo("p",e.detail.value);
                                            }} defaultValue="$" value={toUpload.price} type="number"/>
                                        </IonItem>
                                    </div>
                                    <IonItem>
                                        <IonLabel position="floating">Item Details</IonLabel>
                                        <IonInput onIonChange={(e)=>{
                                            addUserInfo("d",e.detail.value);
                                        }} value={toUpload.detail}/>
                                    </IonItem>
                                </IonList>
                            </IonList>
                            <IonList class="profile-image-side">
                                <IonThumbnail onClick={()=>{
                                    let element = document.getElementById("profile-choose-file");
                                    if (element) element.click();
                                }} class="profile-upload-image">
                                    <IonImg src={toUpload.image}/>
                                </IonThumbnail>
                            </IonList>
                        </IonList>
                        <IonItem>
                            <IonList slot="end" onClick={()=>{
                                document.getElementById("profile-choose-file").click();
                            }} class="profile-icons-container profile-hover">
                                <IonIcon class="profile-icons" icon={imagesOutline}/>
                                <div className="profile-icons-text">Upload Image</div>
                            </IonList>
                            <IonButton onClick={()=>{
                                sendToDatabase();
                            }}>Upload</IonButton>
                        </IonItem>
                    </IonList>
                </IonList>
            </IonContent>
            <input hidden onChange={async(e)=>{
                addUserInfo("i",await tools.toBase64(e.target.files[0]));
            }} id="profile-choose-file" type="file"/>
        </IonPage>
    )
}

export default Profile;