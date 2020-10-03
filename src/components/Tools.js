import { isPlatform } from '@ionic/react';


class Tools{
    constructor(){
        this.index = 0;

        this.cartItems = [];

        this.SERVERUSERNAME = "user";
        this.SERVERPASSWORD = "users"

        this.link = "http://127.0.0.1:80"
        this.URL = {
            GET:this.link+"/see/products",
            LOGIN:this.link+"/login",
            REGISTER:this.link+"/register",
            RECOVER:this.link+"/recover"
        }

        this.CREDENTIALS = {
            SERVERUSERNAME:this.SERVERUSERNAME,
            SERVERPASSWORD:this.SERVERPASSWORD,
            search:"",
            cagegory:"",
            moreData:0,
        }

        this.searchCategory = [
            "jeans",
            "pants",
            "shirt",
            "All Category"
        ]

        this.companyInfo = [
            "About us",
            "Contact us",
            "Privacy and policy",
            "Terms and conditions",
        ]

        this.quickLinks = [
            "Cart",
            "Login"
        ]

        this.LANGUAGES = [
            "English",
            "Spanish",
            "French",
            "Dutch"
        ]

        this.color = [
            "blue",
            "red",
            "yellow",
            "black",
            "orange",
            "green",
            "brown",
            "pink",
            "gray",
            "navy",
            "purple",
            "blue",
            "red",
            "yellow",
            "black",
            "orange",
            "green",
            "brown",
            "pink",
            "gray",
            "navy",
            "purple",
        ];

        this.MSG = {
            APPNAME:"Fashion App",
            fieldsRequired:"Feilds are required",
            passwordMatch:"Passwords dose not match",
            somethingWrong:"Something went wrong",
            serverDown:"Server is down",
            wrongPassword:"Username or password is incorrect",
            userNotExist:"User not exist",
            provideValidCreds:"Please provide valid credentials",
            recoverinfo:"A verification email will be sent to your email address. Please check your email account for your confirmation id after submiting this form.",
            recoververificationinfo:"Please enter the 5 digit code that was sent to your email address.",
            validEmail:"Email is invalid. Please double check email",
            resendverificationcode:{
                1:"To resend verification code click ",
                2:"here",
            },
            cartMsg:"Shipping cost will be calculated based on your shipping address.",
            userExist:"User already exist, try to login",
            passwordStrength:"Password must be above 50%.",
        }
    }

    clickById(id){
        try{
            document.getElementById(id).click();
        }catch{

        }
    }

    saveCartItems(items){
        window.localStorage.setItem("cart",JSON.stringify(items));
    }

    getSaveCartItems(){
        var cartItem = JSON.parse(window.localStorage.getItem("cart"));
        if (cartItem){
            return cartItem;
        }
        return "";
    }

    cartEmpty(){
        if (this.cartItems.length <= 0){
            return false;
        }else{
            return true;
        }
    }

    platform(test=false){
        if (!test){
            if (isPlatform("mobile") || isPlatform("tablet") || isPlatform("ios")){
                return true;
            }else{
                return false;
            }
        }else{
            if (window.innerWidth < 500){
                return true;
            }else{
                return false;
            }
        }
        
    }

    cartTotal(){
        var cost = 0;
        for (var item of this.cartItems){
            cost = cost + parseFloat(item.price.replace("$",""));
        }
        return cost;
    }

    saveCreds(username, password){
        window.localStorage.setItem("username",username);
        window.localStorage.setItem("password",password);
    }

    getCreds(){
        var creds = {
            username:window.localStorage.getItem("username"),
            password:window.localStorage.getItem("password"),
        }
        return creds;
    }

    clearStorage(){
        window.localStorage.clear();
    }

    compare(value,ref,returnIfTrue,returnIfFalse){
        if (value === ref){
            return returnIfTrue;
        }else{
            return returnIfFalse;
        }
    }

    inputValidation(itemsArray){
        var valid = true;
        for (var inputs of itemsArray){
            if (inputs[0] === ""){
                document.getElementById(inputs[1]).style.border = "1px solid red";
                valid = false;
            }else{
                document.getElementById(inputs[1]).style.border = "";
            }
        }
        return valid
    }

    inputValidationSet(reset,color="lightgray"){
        document.getElementById(reset).style.border = "1px solid "+color;
    }

    inputValidationReset(reset){
        document.getElementById(reset).style.border = "1px solid lightgray";
    }

    credsConfirmValidation(validate){
        if (validate[0][0] === validate[1][0]){
            return true;
        }else{
            document.getElementById(validate[0][1]).style.border = "1px solid orange";
            document.getElementById(validate[1][1]).style.border = "1px solid orange";
        }
        return false;
    }

    passwordStrength(password){
        var result = 0;
        //check to see if password has 8 or more characters
        if (password.split("").length >= 8){
            result ++;
        }
        //check for Capital letters
        if (/[A-Z]/.test(password)){
            result ++;
        }
        //check for a Numeric value
        if (/\d/.test(password)){
            result ++;
        }
        //check if password has a Symbol character
        if (password.match(/[|\\/~^:,;?!&%$@#*+()]/)){
            result ++;
        }
            
        switch (result) {
            case 0:
                return {value:0.02,text:'Weak',color:"red"};
            case 1:
                return {value:1,text:'Weak',color:"red"};
            case 2:
                return {value:2,text:'Fair',color:"orange"};
            case 3:
                return {value:3,text:'Good',color:"blue"};
            case 4:
                return {value:4,text:'Strong',color:"green"};
            default:
                return {value:0,text:'Weak',color:"red"};
        }
    }

    emailValidate(email){
        //check if email in valid format
        var validate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (validate.test(email)){
            return true;
        }else{
            return false;
        }
    }

    getIndex(limit){
        if (this.index === limit){
            return this.index = 0;
        }else{
            return this.index ++;
        }
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

var systemTools = new Tools()

export default systemTools;