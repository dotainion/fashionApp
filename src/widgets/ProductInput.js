import { IonAlert, IonIcon, IonImg, IonItemDivider, IonThumbnail } from '@ionic/react';
import { addOutline, closeOutline, imagesOutline, refreshCircleOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/Context';
import defaultImage from '../images/default-image.jpg';
import { tools } from '../tools/Tools';
import { ColorPicker, SizePicker } from './ChoicePicker';



export const ProductInput = ({isOpen, onSubmit, onClose, record, header, prodRef, changeMade, setChangeMade}) =>{
    const { user } = useStore();
    //edit or add button
    const [editOrAddBtnText, setEditOrAddBtnText] = useState("Add");
    //holds image
    const [images, setImages] = useState([]);
    //holds the index of a element inside of image
    const [imgIndex, setImgIndex] = useState(0);
    //hold array of colors
    const [moreColors, setMoreColors] = useState([]);
    //hold array of size
    const [moreSizes, setMoreSizes] = useState([]);
    //hold object id if valu is being edited
    const [editingId, setEditingId] = useState("");

    //show message alert
    const [alertMessage, setAlertMessage] = useState("");
    //open alert
    const [showAlert, setShowAlert] = useState(false);

    //open color picker
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showSizePicker, setShowSizePicker] = useState(false);

    const titleRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();

    const onImageChange = async(e) =>{
        setImages([...images, await tools.toBase64(e.target.files[0])]);
        if (typeof setChangeMade === "function") setChangeMade(true);
    }

    const onClearFields = () =>{
        setImages([]);
        setMoreSizes([]);
        setMoreColors([]);
        setEditingId("");
        titleRef.current.value = "";
        priceRef.current.value = "";
        imageRef.current.files = null;
        descriptionRef.current.value = "";
    }

    const addMoreColors = (color) =>{
        if (!moreColors.includes(color.hex)) setMoreColors([color.hex, ...moreColors]);
        if (typeof setChangeMade === "function") setChangeMade(true);
    }

    const addMoreSize = (size) =>{
        if (!moreSizes.includes(size)) setMoreSizes([size, ...moreSizes]);
        if (typeof setChangeMade === "function") setChangeMade(true);
    }

    const deleteMoreColors = (index) =>{
        const newColors = JSON.parse(JSON.stringify(moreColors));
        newColors.splice(index,1)
        setMoreColors(newColors);
        if (typeof setChangeMade === "function") setChangeMade(true);
    }

    const deleteMoreSize = (index) =>{
        const newSizes = JSON.parse(JSON.stringify(moreSizes));
        newSizes.splice(index,1)
        setMoreSizes(newSizes);
        if (typeof setChangeMade === "function") setChangeMade(true);
    }

    const deleteAImage = (index) =>{
        const newImages = JSON.parse(JSON.stringify(images));
        newImages.splice(index,1);
        setImages(newImages);
        if (typeof setChangeMade === "function") setChangeMade(true);
    }

    const isHasImage = (img) =>{
        if (img.length > 0) return img;
        return [defaultImage];
    }

    const onAddItem = async() =>{
        if (Object.keys(record || {})?.length > 0){
            if (!changeMade){
                setAlertMessage("No change detected");
                return setShowAlert(true);
            }
        }
        if (!titleRef.current.value){
            setAlertMessage("Item title was not provided.");
            return setShowAlert(true);
        }
        if (!priceRef.current.value){
            setAlertMessage("Cost of the item was not provided.");
            return setShowAlert(true);
        }
        if (moreColors?.length <= 0){
            setAlertMessage("Must have at least one color.");
            return setShowAlert(true);
        }
        const itemObject = {
            title: titleRef.current.value ||  "",
            price: priceRef.current.value ||  "",
            colors: moreColors ||  [],
            sizes: moreSizes ||  [],
            images: isHasImage(images) || [],
            postBy: user?.id || "",
            description: descriptionRef.current.value || ""
        };
        if (editingId) itemObject["id"] = editingId;
        if (typeof onSubmit === "function") onSubmit(itemObject);
        if (typeof setChangeMade === "function") setChangeMade(false);
        onClearFields();
    }

    //detect change images
    useEffect(()=>{
        setImgIndex(images?.length -1);
    },[images]);

    //init data passed in
    useEffect(()=>{
        if (record){
            setEditOrAddBtnText("Update");
            setEditingId(record?.id);
            setImages(record?.info?.images);
            setMoreSizes(record?.info?.sizes);
            setMoreColors(record?.info?.colors);
            titleRef.current.value = record?.info?.title;
            priceRef.current.value = record?.info?.price;
            descriptionRef.current.value = record?.info?.description;
        }
    },[record]);
    return(
        <div hidden={!isOpen} className="add-edit-on-mobile" onClick={(e)=>e.stopPropagation()} style={{position:"relative"}}>
            <ColorPicker
                isOpen={showColorPicker} 
                onClose={()=>setShowColorPicker(false)} 
                onChange={(color)=>addMoreColors(color)}
                selected={moreColors}
            />
            <SizePicker
                isOpen={showSizePicker} 
                onClose={()=>setShowSizePicker(false)}
                onSelect={(size)=>addMoreSize(size)}
                selected={moreSizes}
                onDelete={(index)=>deleteMoreSize(index)}
            />
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={()=>setShowAlert(false)}
                cssClass='my-custom-class'
                header={'Alert!!'}
                subHeader={""}
                message={alertMessage}
                buttons={['OK']}
            />
            
            <IonIcon hidden={!onClose} onClick={onClose} class="float-top-right pad text-hover" style={{fontSize:"25px"}} icon={closeOutline}/>
            <IonItemDivider>{header || "Add Products"}</IonItemDivider>
            <div className="divider item-center center-add-container d-flex-on-mobile">
                <div className="max-width">
                    <IonIcon onClick={()=>imageRef.current?.click()} className="float-top-left add-btn-round" icon={imagesOutline}/>
                    <div className="add-img-max-height" style={{position:"relative"}}>
                        <div className="float-bottom-right-conner scroll-bar add-hold-more-image-container">
                            {images?.map((img, key)=>(
                                <div onClick={()=>setImgIndex(key)} className="inline" style={{position:"relative"}} key={key}>
                                    <img src={img} className="add-hold-more-image add-hold-more-image-hover" alt="" key={key} />
                                    <IonIcon onClick={()=>deleteAImage(key)} class="float-top-right round-shadow text-hover" icon={closeOutline}/>
                                </div>
                            ))}
                        </div>
                        <IonThumbnail class="max-width max-height prod-image-on-mobile">
                            <IonImg src={images?.[imgIndex] || defaultImage}/>
                        </IonThumbnail>
                    </div>
                </div>
                <div className="max-width" style={{userSelect:"none"}}>
                    <div className="float-top-right hide-on-mobile">
                        <button onClick={onClearFields} className="add-btn btn-click btn-hover">Clear<IonIcon style={{marginLeft:"5px"}} icon={refreshCircleOutline}/></button>
                        <button onClick={onAddItem} className="add-btn btn-click btn-hover">{editOrAddBtnText}<IonIcon style={{marginLeft:"5px"}} icon={addOutline}/></button>
                    </div>
                    <div className="item-center center-add-container">
                        
                        <div className="add-input-container">
                            <div>title</div>
                            <input onChange={()=>setChangeMade?.(true)} ref={titleRef} placeholder="Item name" className="add-input"/>
                        </div>
                        <div className="add-input-container">
                            <div>price</div>
                            <span className="price-dollar-sign"><input onChange={()=>setChangeMade?.(true)} ref={priceRef} type="number" placeholder="$0.00" className="add-input"/></span>
                        </div>

                        <div className="add-input-container">
                            <label>Color</label>
                            <div className="add-hold-image-picker-item scroll-bar inline white-bg">
                                {moreColors?.map((color, key)=>(
                                    <label className="add-hold-more-item color-dot" style={{backgroundColor:color,boxShadow:"none"}} key={key}>
                                        <IonIcon onClick={()=>deleteMoreColors(key)} class="add-hold-more-delete-2 text-hover" icon={closeOutline}/>
                                    </label>
                                ))}
                            </div>
                            <IonIcon onClick={()=>setShowColorPicker(true)} class="add-product-add-more-btn btn-click btn-hover inline" icon={addOutline}/>
                            <div hidden={moreColors?.length} className="float-left pad" style={{top:"63%",color:"gray"}}>Click the plus sign to add color</div>
                        </div>
                        <div className="add-input-container">
                            <label>Size</label>
                            <div className="add-hold-image-picker-item scroll-bar inline white-bg">
                                {moreSizes?.map((color, key)=>(
                                    <label className="add-hold-more-item" key={key}>
                                        <span>{color}</span>
                                        <IonIcon onClick={()=>deleteMoreSize(key)} class="add-hold-more-delete text-hover" icon={closeOutline}/>
                                    </label>
                                ))}
                            </div>
                            <IonIcon onClick={()=>setShowSizePicker(true)} class="add-product-add-more-btn btn-click btn-hover inline" icon={addOutline}/>
                            <div hidden={moreSizes?.length} className="float-left pad" style={{top:"63%",color:"gray"}}>Click the plus sign to add size</div>
                        </div>
                        <div className="add-input-container">
                            <div>Description</div>
                            <textarea onChange={()=>setChangeMade?.(true)} ref={descriptionRef} rows={5} placeholder="Description of item" className="add-input" style={{resize:"none"}}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="hide-on-desktop" style={{textAlign:"right",marginBottom:"40px"}}>
                <button onClick={onClearFields} className="add-btn btn-click btn-hover">Clear<IonIcon style={{marginLeft:"5px"}} icon={refreshCircleOutline}/></button>
                <button ref={prodRef} onClick={onAddItem} className="add-btn btn-click btn-hover">Add<IonIcon style={{marginLeft:"5px"}} icon={addOutline}/></button>
            </div>
            <input ref={imageRef} onChange={onImageChange} hidden type="file"/>
        </div>
    )
}


export const ProductInputFloat = ({isOpen, onClose, onSubmit, record}) =>{
    //open if data needs saving
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    //
    const [changeMade, setChangeMade] = useState(false);

    const updateRef = useRef();

    const triggerClose = () =>{
        if (changeMade) setShowSaveAlert(true);
        else{
            if (typeof onClose === "function") onClose();
        }
    }
    return(
        <div hidden={!isOpen} onClick={triggerClose} className="backdrop-translucent-screen-size scroll-on-mobile">
            <div className="float-center prod-input-width-on-hover">
                <IonAlert
                    isOpen={showSaveAlert}
                    onDidDismiss={()=>setShowSaveAlert(false)}
                    backdropDismiss={false}
                    cssClass='my-custom-class'
                    header={'Alert!!'}
                    subHeader={"Are you sure you will like to close this window?"}
                    message={"Changes you made may not be saved."}
                    buttons={[
                        {
                            text: 'Close',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                if (typeof onClose === "function"){
                                    setChangeMade(false);
                                    onClose();
                                }
                            }
                        },{
                            text: 'Save Changes',
                            handler: () => {
                                updateRef.current.click();
                            }
                        }
                    ]}
                />
                <ProductInput
                    isOpen={true} 
                    record={record}
                    onSubmit={onSubmit} 
                    onClose={triggerClose}
                    header="Edit Product"
                    prodRef={updateRef}
                    changeMade={changeMade}
                    setChangeMade={setChangeMade}
                />
            </div>
        </div>
    )
}