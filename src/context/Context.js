import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import { auth } from "../config/firebase";
import { getAgentRecord, getProducts, getUser } from "../database/CollectionsRequsts";
import { routes } from "../global/routes";
import { tools } from "../tools/Tools";
import { Loader } from "../widgets/Loader";

const AppContext = createContext();

export const useStore = () =>{
    return useContext(AppContext);
}

export const ContextProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    //holds user data
    const [user, setUser] = useState({});
    //holds user login
    const [isSignIn, setIsSignIn] = useState();

    //holds cart item
    const [cart, setCart] = useState([]);

    //holds products for sales 
    const [products, setProducts] = useState([]);

    //holds agent products for dashboard
    const [agentProducts, setAgentProducts] = useState([]);

    const initProducts = async() =>{
        setShowLoader(true)
        setProducts(await getProducts());
        setShowLoader(false);
    }
    //search for produts
    const searchProducts = (filter) =>{
        alert(filter)
    }

    //init cart items
    const initCartItem = () => setCart(JSON.parse(window.localStorage.getItem("cart")) || []);

    //check if item inclued in cart
    const isItemIncludedInCart = (id) =>{
        let cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];
        for (let item of cartItems){
            if (item?.id === id) return true;
        }
        return false;
    }

    //add cart items
    const addCartItem = (item) =>{
        if (!isItemIncludedInCart(item?.id)){
            let cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];
            item["qty"] = 1;
            item["checkout"] = true;
            cartItems.push(item);
            window.localStorage.setItem("cart",JSON.stringify(cartItems));
            tools.toast(`${item?.info?.title} at $${item?.info?.price} was added.`,"success");
            initCartItem();
        }else tools.toast("Item alrady added.","light")
    }

    //delete cart item
    const deleteCartItem = (item) =>{
        let remainingItem = [];
        let cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];
        for (let element of cartItems){
            if (element?.id !== item?.id) remainingItem.push(element);
        }
        window.localStorage.setItem("cart",JSON.stringify(remainingItem));
        initCartItem();
    }

    //update cart item .. will only update quty value
    const updateCartItemQty = (item,value) =>{
        let remainingItem = [];
        let cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];
        for (let element of cartItems){
            if (element?.id === item?.id) element["qty"] = value;
            remainingItem.push(element);
        }
        window.localStorage.setItem("cart",JSON.stringify(remainingItem));
        initCartItem();
    }

    //update cart item .. will only update quty value
    const updateCartItemCheckout = (item, value) =>{
        let remainingItem = [];
        let cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];
        for (let element of cartItems){
            if (element?.id === item?.id) element["checkout"] = value;
            remainingItem.push(element);
        }
        window.localStorage.setItem("cart",JSON.stringify(remainingItem));
        initCartItem();
    }

    //get agent product from dashbeard
    const initAgentProducts = async(load=true) =>{
        if (load) setShowLoader(true);
        setAgentProducts(await getAgentRecord(user?.id));
        setShowLoader(false);
    }

    //sign in to account
    const signIn = async(email, password) =>{
        try{
            return await auth.signInWithEmailAndPassword(email, password);
        }catch(error){
            console.log(error.message)
            return {error: error.message}
        }
    }

    //sign out from account
    const signOut = async() =>{
        await auth.signOut();
    }

    //share to social media
    const onShare = async(userName,route,docId) =>{
        try{
            setShowLoader(true);
            await navigator.share({
                title: document.title,
                text: `${tools.capitalize(userName)} invited you to view their products.`,
                url: window.location.protocol+route+":"+docId
            });
            setShowLoader(false);
        }catch(error){
            setShowLoader(false);
            console.log(error)
        }
    }

    //holds all functions to be call on render that needs auth
    useEffect(()=>{
        initAgentProducts(false);
    },[user]);

    //holds all funtions to be call on render
    const initializeStore = async() =>{
        initCartItem();
        initProducts();
    }
    
    useEffect(()=>{
        initializeStore();
        auth.onAuthStateChanged(async(authState)=>{
            if (authState){
                let authUser = await getUser(authState.uid);
                authUser["id"] = authState.uid;
                setUser(authUser);
            }
            setIsSignIn(authState);
            setLoading(false);
        });
    },[]);
    
    return (
        <>
            <Loader isOpen={showLoader} />
            <AppContext.Provider value={{
                onShare,
                signIn,
                signOut,
                products,
                searchProducts,
                initProducts,
                user,
                isSignIn,
                cart,
                addCartItem,
                deleteCartItem,
                updateCartItemQty,
                updateCartItemCheckout,
                agentProducts,
                setAgentProducts,
                initAgentProducts
            }}>
                {! loading && children}
            </AppContext.Provider>
        </>
    )
}