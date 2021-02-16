import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

class FashionCamera{
    constructor(){
        defineCustomElements(window);//this is to show camera in browser
    }

    async takePicture(callBack=null) {
        //this function will be call when using the device camera
        //it will take a photo and pass it into the function that was passed in as a parameter
        //so the image can be use.
        const { Camera } = Plugins;
        Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source:CameraSource.Camera,
          saveToGallery:true,
          correctOrientation:true,
        }).then(results=>{
            if (callBack) callBack(results.base64String);
        }).catch(()=>{});
    
        /*var imageUrl = image.webPath;
        // Can be set to the src of an image now
        funcCall(imageUrl);
        console.log("testing");
        console.log(imageUrl.Base64);*/
    }

    async getGallery(callBack=null) {
        //this function will open up the gallery in the device
        //amd returns the photo the user chooses adn pass it in 
        //as parameter that was passed in as function parameter
        const { Camera } = Plugins;
        Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source:CameraSource.Photos,
          saveToGallery:false,
          correctOrientation:true,
        }).then(results=>{
            if (callBack) callBack(results.base64String);
        }).catch(()=>{});
    }
}
const fashionCam = new FashionCamera();
export { fashionCam };