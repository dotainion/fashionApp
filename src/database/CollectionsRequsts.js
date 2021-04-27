import { addData, deleteDataById, getData, getDataByField, getDataById, updateData } from "./Collections"

const collection = {
    users: "users",
    orders: "orders",
    products: "products",
}

export const addUser = async(data,uid) =>{
    try{
        await addData(collection.users, data, uid);
        return true
    }catch(error){
        console.log(error);
        return false;
    }
}

export const updateUser = async(data,uid) =>{
    try{ 
        await updateData(collection.users, data, uid);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getUser = async(uid) =>{
    try{
        return await getDataById(collection.users,uid);
    }catch(error){
        console.log(error);
        return {}
    }
}

export const addProduct = async(data) =>{
    try{
        await addData(collection.products, data);
        return true
    }catch(error){
        console.log(error);
        return false;
    }
}

export const updateProduct = async(data,id) =>{
    try{
        await updateData(collection.products, data, id);
        return true
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getAProduct = async(id) =>{
    try{
        return await getDataById(collection.products,id);
    }catch(error){
        console.log(error);
        return {}
    }
}

export const getProducts = async(limit=false) =>{
    try{
        return await getData(collection.products,limit);
    }catch(error){
        console.log(error);
        return []
    }
}

export const getAgentRecord = async(agentId,limit=false) =>{
    try{
        return await getDataByField(collection.products,"postBy",agentId,limit);
    }catch(error){
        console.log(error);
        return []
    }
}

export const deleteAgentRecord = async(id) =>{
    try{
        await deleteDataById(collection.products,id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const orderProduct = async(data) =>{
    try{
        await addData(collection.orders,data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getOrder = async(id) =>{
    try{
        return await getDataByField(collection.orders,"postBy",id);
    }catch(error){
        console.log(error);
        return [];
    }
}