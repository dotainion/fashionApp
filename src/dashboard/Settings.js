import { IonAlert, IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenuToggle, IonPage, IonThumbnail, IonTitle, IonToggle } from '@ionic/react';
import { addOutline, analyticsOutline, bookmarkOutline, checkbox, clipboardOutline, homeOutline, pricetagOutline, readerOutline, reorderFourOutline, shareSocialOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { NavSideBar } from '../components/NavSideBar';
import { addr } from '../content/contents';
import { updateUser } from '../database/CollectionsRequsts';
import { useStore } from '../context/Context';
import { Loader } from '../widgets/Loader';
import { DashNavWrapper } from '../components/DashNavWrapper';



export const Settings = () =>{
    const { user } = useStore();
    //show or hide loader
    const [showLoader, setShowLoader] = useState(false);

    const [initSate, setInitState] = useState("");

    //show alert
    const [showAlert, setShowAlert] = useState(false);
    //alert message
    const [alertMessage, setAlertMessage] = useState("");

    //default feild values
    const [defaultCountry, setDefaultCountry] = useState("");
    const [defaultState, setDefaultCity] = useState("");

    //hold boolean value when change is made
    const [changeMade, setChangeMade] = useState([]);

    const countriesRef = useRef();
    const statesRef = useRef();
    const addressRef = useRef();
    const pickupAddressRef = useRef();
    const checkboxRef = useRef();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneNumberRef = useRef();

    const onSave = async() =>{
        setShowLoader(true);
        if (changeMade.length > 0){
            if (changeMade.includes("address")){
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
                await updateUser(shippingAddress, user?.id);
            }

            if (changeMade.includes("profile")){
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
                    number: phoneNumberRef.current.value
                }
                await updateUser(profileObj, user?.id);
            }

            setAlertMessage(`${changeMade.join(" and ")} was updated`);
            setShowAlert(true);
            setChangeMade([]);
        }else{
            setAlertMessage("No change detected");
            setShowAlert(true);
        }
        setShowLoader(false);
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

    const onChangeMade = (cmd) =>{
        if (!changeMade.includes(cmd)) setChangeMade([cmd,...changeMade]);
    }

    //init field on lister of user change
    useEffect(()=>{
        firstNameRef.current.value = user?.firstName || "";
        lastNameRef.current.value = user?.lastName || "";
        phoneNumberRef.current.value = user?.number || "";
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
                header={''}
                subHeader={""}
                message={alertMessage}
                buttons={['OK']}
            />

            <Loader isOpen={showLoader}/>

            <DashNavWrapper>
                <div className="pad-xl" style={{position:"relative"}}>

                    <button onClick={onSave} slot="end" className="setting-save-btn add-btn btn-click btn-hover white-fg dark">Save</button>
                    
                    <div className="half-width max-width-on-mobile settings-center-content">
                        <div className="settigns-item-container">
                            <IonItemDivider>Profile</IonItemDivider>
                            <div className="divider d-flex-on-mobile">
                                <div className="add-input-container max-width">
                                    <div>First Name</div>
                                    <input ref={firstNameRef} onChange={()=>onChangeMade("profile")} placeholder="First name" type="text" className="add-input"/>
                                </div>
                                <div className="add-input-container max-width">
                                    <div>Last Name</div>
                                    <input ref={lastNameRef} onChange={()=>onChangeMade("profile")} placeholder="First name" type="text" className="add-input"/>
                                </div>
                            </div>
                            <div className="add-input-container max-width">
                                <div>Phone Number</div>
                                <input ref={phoneNumberRef} onChange={()=>onChangeMade("profile")} placeholder="First name" type="number" className="add-input"/>
                            </div>
                        </div>

                        <div className="settigns-item-container">
                            <IonItemDivider>Shipping Address</IonItemDivider>
                            <div className="divider d-flex-on-mobile">
                                <div className="add-input-container max-width">
                                    <div>Country</div>
                                    <select ref={countriesRef} onChange={(e)=>{setInitState(JSON.parse(e.target.value).code);onChangeMade("address")}} className="select-input-2 max-width">
                                        <option hidden defaultChecked>{defaultCountry}</option>
                                        {addr.countries().map((country, key)=>(
                                            <option value={JSON.stringify(country)} key={key}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="add-input-container max-width">
                                    <div>City</div>
                                    <select ref={statesRef} onChange={()=>onChangeMade("address")} className="select-input-2 max-width">
                                        <option hidden defaultChecked>{defaultState}</option>
                                        {addr.states(initSate).map((state, key)=>(
                                            <option key={key} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="add-input-container">
                                <div>Address</div>
                                <input ref={addressRef} onChange={()=>onChangeMade("address")} placeholder="Address" type="address" className="add-input"/>
                            </div>
                            <div className="add-input-container">
                                <div>Pickup Address</div>
                                <div className="pad"><input ref={checkboxRef} onChange={pickupHandler} type="checkbox"/><span>Same as address</span></div>
                                <input ref={pickupAddressRef} onChange={()=>onChangeMade("address")} placeholder="Pickup address" type="address" className="add-input"/>
                            </div>
                        </div>

                    </div>
                </div>
            </DashNavWrapper>
        </IonPage>
    )
}