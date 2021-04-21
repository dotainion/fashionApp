import { routes } from "../global/routes";


class Tools{
    shareDevider = "~fashion-app~";
    async toBase64(file){
        try{
            return await new Promise((res, rej) => {
                const reader = new FileReader();
                reader.onload = e => res(e.target.result);
                reader.onerror = e => rej(e);
                reader.readAsDataURL(file); 
            });
        }catch(error){
            console.log(error)
            return null;
        }
    };
    capitalize = (sentence) =>{
        let joiner = [];
        for (let word of sentence?.split?.(" ") || []){
            joiner.push(word?.charAt?.(0)?.toUpperCase?.() + word?.slice?.(1));
        }
        return joiner?.join?.(" ");
    }
    async toast(message,color="dark",position="top",duration=3000){
        const toast = document.createElement('ion-toast');
        toast.message = message;
        toast.duration = duration;
        toast.position = position;
        toast.color = color;
        toast.buttons = [{text:"Ok"}]
      
        document.body.appendChild(toast);
        return toast.present();
    }
    async sleep(milliseconds){
        return await new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}

export const tools = new Tools();