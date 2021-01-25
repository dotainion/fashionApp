import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './profile.css';
import img from '../images/defaultImage.jpg';
import { closeOutline, cloudUploadOutline, imagesOutline, listOutline, radioButtonOnOutline } from 'ionicons/icons';
import tools from '../components/Tools';
import { data } from '../database/database';
import { useHistory } from 'react-router';
import { routes } from '../global/routes';
import { DeleteConfirm } from '../widgets/deleteConfirm';
import { Header } from '../widgets/header';


const Profile = () =>{
    const [toUpload, setToUpload] = useState({
        image: img, title: "",price: "", detail: "", userId: ""
    });
    const [showAlert, setShowAlert] = useState({
        state: false,
        data: null
    });
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

    const sendToDatabase = () =>{
        if (toUpload.title && toUpload.price){
            data.addData(toUpload);
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
    const listener = () =>{
        setInterval(()=>{
            let element = document.getElementById("profile-list-container");
            if (!tools.isMobile()) element.style.display = "";
        },400);
    }
    useEffect(()=>{
        document.title = "Sales Upload";
        initialize();
        listener();
    },[]);

    return(
        <IonPage>
            <Header
                home
                menu
                toggleMenu={{
                    icon: menu,
                    onClick: ()=>{
                        let element = document.getElementById("profile-list-container");
                        if (element.style.display === "none"){ 
                            setMenu(cloudUploadOutline);
                            element.style.display = "";
                        }else{ 
                            setMenu(radioButtonOnOutline);
                            element.style.display = "none";
                        }
                    }
                }}
            />
            
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
                <IonList class="profile-flext-container">
                    <IonList id="profile-list-container" class="profile-list-container">
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
                    <IonList class="profile-container">
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