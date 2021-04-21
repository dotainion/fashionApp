import { IonIcon, IonImg, IonItemDivider, IonThumbnail } from '@ionic/react';
import { addOutline, closeOutline, image, imagesOutline, refreshCircleOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/Context';
import defaultImage from '../images/default-image.jpg';
import { tools } from '../tools/Tools';
import { ColorPicker } from './ColorPicker';
import { SizePicker } from './SizePicker';



export const ProductInput = ({isOpen, onSubmit, onClose, record, header}) =>{
    const { user } = useStore();
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
    //open color picker
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showSizePicker, setShowSizePicker] = useState(false);

    const titleRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();

    const onImageChange = async(e) =>{
        setImages([...images, await tools.toBase64(e.target.files[0])]);
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
        setMoreColors([...moreColors,color.hex]);
        setShowColorPicker(false)
    }

    const addMoreSize = (size) =>{
        setMoreSizes([...moreSizes, size]);
    }

    const deleteMoreColors = (index) =>{
        const newColors = JSON.parse(JSON.stringify(moreColors));
        newColors.splice(index,1)
        setMoreColors(newColors);
    }

    const deleteMoreSize = (index) =>{
        const newSizes = JSON.parse(JSON.stringify(moreSizes));
        newSizes.splice(index,1)
        setMoreSizes(newSizes);
    }

    const deleteAImage = (index) =>{
        const newImages = JSON.parse(JSON.stringify(images));
        newImages.splice(index,1);
        setImages(newImages);
    }

    const onAddItem = async() =>{
        const itemObject = {
            title: titleRef.current.value ||  "",
            price: priceRef.current.value ||  "",
            colors: moreColors ||  [],
            sizes: moreSizes ||  [],
            images: images || [],
            postBy: user?.id || "",
            description: descriptionRef.current.value || ""
        };
        if (editingId) itemObject["id"] = editingId;
        if (typeof onSubmit === "function") onSubmit(itemObject);
        onClearFields();
    }

    //detect change images
    useEffect(()=>{
        setImgIndex(images?.length -1);
    },[images]);

    //init data passed in
    useEffect(()=>{
        if (record){
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
            />
            <SizePicker
                isOpen={showSizePicker} 
                onClose={()=>setShowSizePicker(false)}
                onSelect={(size)=>addMoreSize(size)}
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
                <div className="max-width">
                    <div className="float-top-right hide-on-mobile">
                        <button onClick={onClearFields} className="add-btn btn-click btn-hover">Clear<IonIcon style={{marginLeft:"5px"}} icon={refreshCircleOutline}/></button>
                        <button onClick={onAddItem} className="add-btn btn-click btn-hover">Add<IonIcon style={{marginLeft:"5px"}} icon={addOutline}/></button>
                    </div>
                    <div className="item-center center-add-container">
                        
                        <div className="add-input-container">
                            <div>title</div>
                            <input ref={titleRef} className="add-input"/>
                        </div>
                        <div className="add-input-container">
                            <div>price</div>
                            <input ref={priceRef} className="add-input"/>
                        </div>

                        <div className="add-input-container">
                            <label>Color</label>
                            <div className="add-hold-image-picker-item scroll-bar inline">
                                {moreColors?.map((color, key)=>(
                                    <label className="add-hold-more-item" key={key}>
                                        <span>{color}</span>
                                        <IonIcon onClick={()=>deleteMoreColors(key)} class="add-hold-more-delete text-hover" icon={closeOutline}/>
                                    </label>
                                ))}
                            </div>
                            <IonIcon onClick={()=>setShowColorPicker(true)} class="add-product-add-more-btn btn-click btn-hover inline" icon={addOutline}/>
                        </div>
                        <div className="add-input-container">
                            <label>Size</label>
                            <div className="add-hold-image-picker-item scroll-bar inline">
                                {moreSizes?.map((color, key)=>(
                                    <label className="add-hold-more-item" key={key}>
                                        <span>{color}</span>
                                        <IonIcon onClick={()=>deleteMoreSize(key)} class="add-hold-more-delete text-hover" icon={closeOutline}/>
                                    </label>
                                ))}
                            </div>
                            <IonIcon onClick={()=>setShowSizePicker(true)} class="add-product-add-more-btn btn-click btn-hover inline" icon={addOutline}/>
                        </div>
                        <div className="add-input-container">
                            <div>Description</div>
                            <textarea ref={descriptionRef} rows={5} className="add-input" style={{resize:"none"}}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="hide-on-desktop" style={{textAlign:"right",marginBottom:"40px"}}>
                <button onClick={onClearFields} className="add-btn btn-click btn-hover">Clear<IonIcon style={{marginLeft:"5px"}} icon={refreshCircleOutline}/></button>
                <button onClick={onAddItem} className="add-btn btn-click btn-hover">Add<IonIcon style={{marginLeft:"5px"}} icon={addOutline}/></button>
            </div>
            <input ref={imageRef} onChange={onImageChange} hidden type="file"/>
        </div>
    )
}


export const ProductInputFloat = ({isOpen, onClose, onSubmit, record}) =>{
    return(
        <div hidden={!isOpen} onClick={onClose} className="backdrop-translucent-screen-size scroll-on-mobile">
            <div className="float-center prod-input-width-on-hover">
                <ProductInput
                    isOpen={true} 
                    record={record}
                    onSubmit={onSubmit} 
                    onClose={onClose}
                    header="Edit Product"
                />
            </div>
        </div>
    )
}