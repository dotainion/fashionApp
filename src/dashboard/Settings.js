import { IonAlert, IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, checkbox, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { NavSideBar } from '../widgets/NavSideBar';
import { addr } from '../content/contents';
import { updateUser } from '../database/CollectionsRequsts';
import { useStore } from '../context/Context';



export const Settings = () =>{
    const { user } = useStore();
    //show and hide side menu when in mobile view with habmurger menu
    const [mobileSideMenu, setMobileSideMenu] = useState("");
    const [initSate, setInitState] = useState("");

    //show alert
    const [showAlert, setShowAlert] = useState(false);
    //alert message
    const [alertMessage, setAlertMessage] = useState("");
    //success message
    const [successMessage, setSuccessMessage] = useState("");
    const [successProfileMessage, setSuccessProfileMessage] = useState("")

    //default feild values
    const [defaultCountry, setDefaultCountry] = useState("");
    const [defaultState, setDefaultCity] = useState("");

    //hold boolean value when change is made
    const [changeMade, setChangeMade] = useState(false);

    const countriesRef = useRef();
    const statesRef = useRef();
    const addressRef = useRef();
    const pickupAddressRef = useRef();
    const checkboxRef = useRef();

    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const profileHandler = async() =>{
        if (changeMade){
            if (!firstNameRef.current.value){
                setAlertMessage("First name must be provided");
                return setShowAlert(true);
            }
            if (!lastNameRef.current.value){
                setAlertMessage("Last name must be provided");
                return setShowAlert(true);
            }
            const profileObj = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
            }
            const res = await updateUser(profileObj, user?.id);
            if (res){
                setChangeMade(false);
                setSuccessProfileMessage("Successfully updated");
            }else{
                setAlertMessage("Something went wrong");
                return setShowAlert(true);
            }
        }else{
            setAlertMessage("No change detected");
            return setShowAlert(true);
        }
    }

    const addressHandler = async() =>{
        if (changeMade){
            let country;
            if (countriesRef.current.value === ""){
                setAlertMessage("Country was not provided");
                return setShowAlert(true);
            }else{
                if (countriesRef.current.value.includes("{")){
                    country = JSON.parse(countriesRef.current.value || null).name;
                }else if (typeof countriesRef.current.value === "string"){
                    country = countriesRef.current.value;
                }else{
                    setAlertMessage("Country was not provided");
                    return setShowAlert(true);
                }
            }
            if (!statesRef.current.value){
                setAlertMessage("State was not provided");
                return setShowAlert(true);
            }
            if (!addressRef.current.value){
                setAlertMessage("Address was not provided");
                return setShowAlert(true);
            }
            if (!pickupAddressRef.current.value){
                setAlertMessage("Pickup address was not provided");
                return setShowAlert(true);
            }
            const shippingAddress = {
                country: country || "",
                city: statesRef.current.value || "",
                address: addressRef.current.value || "",
                pickupAddress: pickupAddressRef.current.value || ""
            }
            const res = await updateUser(shippingAddress, user?.id);
            if (res){
                setChangeMade(false);
                setSuccessMessage("Successfully updated");
            }else{
                setAlertMessage("Something went wrong");
                return setShowAlert(true);
            }
        }else{
            setAlertMessage("No change detected");
            return setShowAlert(true);
        }
    }

    const pickupHandler = (e) =>{
        if (e.target.checked){
            checkboxRef.current.checked = true;
            pickupAddressRef.current.hidden = true;
            pickupAddressRef.current.value = addressRef.current.value;
        }
        else{
            checkboxRef.current.checked = false;
            pickupAddressRef.current.hidden = false;
            pickupAddressRef.current.value = "";
        }
    }

    const menuToggle = () =>{
        if (mobileSideMenu) setMobileSideMenu("");
        else setMobileSideMenu("hide");
    }

    //init field on lister of user change
    useEffect(()=>{
        firstNameRef.current.value = user?.firstName || "";
        lastNameRef.current.value = user?.lastName || "";
        setDefaultCountry(user?.country || "");
        setDefaultCity(user?.city || "");
        addressRef.current.value = user?.address || "";
        if (user?.address === user?.pickupAddress) pickupHandler({target:{checked:true}});
        else pickupHandler({target:{checked:false}});
    },[user]);

    return(
        <IonPage>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={()=>setShowAlert(false)}
                cssClass='my-custom-class'
                header={'Alert!!'}
                subHeader={""}
                message={alertMessage}
                buttons={['OK']}
            />
            <div onClick={(e)=>{if (!mobileSideMenu) setMobileSideMenu("hide")}} className="background">
                <div className="main-header dash-header">
                    <div className="divider">
                        <IonIcon onClick={menuToggle} class=" hide-on-desktop dash-burger-menu" icon={reorderFourOutline}/>
                        <span>Dashboard</span>
                    </div>
                </div>
                <div className="divider" style={{paddingTop:"80px"}}>
                    <div className={`dash-nav-container dash-menu-on-mobile ${mobileSideMenu}`}>
                        <div onClick={menuToggle} className="dash-nav border box-margin max-height side-menu-ease-in-on-mobile">
                            <NavSideBar/>
                        </div>
                    </div>
                    <div className="dash-containser">
                        <div className="box-margin chart-Colors">
                            <div className="border">
                                {/*----------------------------------*/}
                                <div className="pad-xl">
                                    <div className="half-width max-width-on-mobile settings-center-content">
                                        <div className="settigns-item-container">
                                            <IonItemDivider>Profile</IonItemDivider>
                                            <div style={{color:"green",textAlign:"center"}}>{successProfileMessage}</div>
                                            <div className="divider d-flex-on-mobile">
                                                <div className="add-input-container max-width">
                                                    <div>First Name</div>
                                                    <input ref={firstNameRef} onChange={()=>setChangeMade(true)} placeholder="First name" type="text" className="add-input"/>
                                                </div>
                                                <div className="add-input-container max-width">
                                                    <div>Last Name</div>
                                                    <input ref={lastNameRef} onChange={()=>setChangeMade(true)} placeholder="First name" type="text" className="add-input"/>
                                                </div>
                                            </div>
                                            <IonItem lines="none">
                                                <button onClick={profileHandler} slot="end" className="add-btn btn-click btn-hover white-fg dark">Save</button>
                                            </IonItem>
                                        </div>

                                        <div className="settigns-item-container">
                                            <IonItemDivider>Shipping Address</IonItemDivider>
                                            <div style={{color:"green",textAlign:"center"}}>{successMessage}</div>
                                            <div className="divider d-flex-on-mobile">
                                                <div className="add-input-container max-width">
                                                    <div>Country</div>
                                                    <select ref={countriesRef} onChange={(e)=>{setInitState(JSON.parse(e.target.value).code);setChangeMade(true)}} className="select-input-2 max-width">
                                                        <option hidden defaultChecked>{defaultCountry}</option>
                                                        {addr.countries().map((country, key)=>(
                                                            <option value={JSON.stringify(country)} key={key}>{country.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="add-input-container max-width">
                                                    <div>City</div>
                                                    <select ref={statesRef} onChange={()=>setChangeMade(true)} className="select-input-2 max-width">
                                                        <option hidden defaultChecked>{defaultState}</option>
                                                        {addr.states(initSate).map((state, key)=>(
                                                            <option key={key} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="add-input-container">
                                                <div>Address</div>
                                                <input ref={addressRef} onChange={()=>setChangeMade(true)} placeholder="Address" type="address" className="add-input"/>
                                            </div>
                                            <div className="add-input-container">
                                                <div>Pickup Address</div>
                                                <div className="pad"><input ref={checkboxRef} onChange={pickupHandler} type="checkbox"/><span>Same as address</span></div>
                                                <input ref={pickupAddressRef} onChange={()=>setChangeMade(true)} placeholder="Pickup address" type="address" className="add-input"/>
                                            </div>
                                            <IonItem lines="none">
                                                <button onClick={addressHandler} slot="end" className="add-btn btn-click btn-hover white-fg dark">Save</button>
                                            </IonItem>
                                        </div>
                                    </div>
                                </div>
                                {/*----------------------------------*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IonPage>
    )
}