import { db } from '../auth/authentication';


class Database{
    async getUser(id){
        try{
            const userRef = db.collection("fashionUsers");
            const userData = await userRef.doc(id).get();
            return userData.data();
        }catch{return []}
    }
    async addUser(uid,data){
        try{
            delete data.password;
            await db.collection("fashionUsers").doc(uid).set(data);
        }catch{return }
        
    }
    async addData(record){
        try{
            const dataToAdd = db.collection("fashion");
            await dataToAdd.add(record);
        }catch{return }
        
    }
    async getDataById(id){
        let getDataStore = [];
        try{
            const dataToGEt = db.collection("fashion").where("userId","==",id);
            const rec = await dataToGEt.get();
            rec.forEach((record)=>{
                const info = record.data();
                getDataStore.push({id:record.id,record: info});
            });
            return getDataStore;
        }catch{return getDataStore}
        
    }
    async getData(limit=5){
        let storeRecords = [];
        try{
            const dataToGet = db.collection("fashion").limit(limit);
            const records = await dataToGet.get();
            records.forEach((record)=>{
                const info = record.data();
                storeRecords.push({id:record.id,record: info});
            });
            return {state:true,records:storeRecords};
        }catch{return storeRecords}
    }
    async updateRecord(id, record){
        try{
            const dataToUpdate = db.collection("fashion").doc(id);
            await dataToUpdate.update(record);
        }catch{return }
    }
    async deleteRecord(id){
        try{
            const dataToUpdate = db.collection("fashion").doc(id);
            await dataToUpdate.delete();
        }catch{return }
    }
    async search(searchBy,limit=5){
        let searchResults = [];
        try{
            let allRecords = await this.getData(limit);
            allRecords = allRecords.records;
            searchResults = allRecords.filter((value) =>
                value.record.title.toLowerCase()
                .includes(searchBy.toLowerCase())
            );
            return searchResults;
        }catch{return searchResults}
    }
    async order(newOrders){
        try{
            const dataToOrder = db.collection("fashionOrder");
            for (let orders of newOrders) await dataToOrder.add(orders);
        }catch{return }
    }
    async getOrder(userId){
        let orders = [];
        try{
            const orderToGet = db.collection("fashionOrder")
            .where("sellerId","==",userId);
            const records = await orderToGet.get();
            records.forEach(async(record)=>{
                const ord = record.data();
                const recordByOrder = db.collection("fashion").doc(ord.orderId);
                const recordOrder = await recordByOrder.get();
                const info = recordOrder.data();   
                orders.push({
                    fashionOrderId:recordOrder.id,
                    id: record.id,
                    record: info
                });
            });
            return orders;
        }catch{return orders}
    }
    async  getClientOrder(userId){
        let orders = [];
        try{
            const orderToGet = db.collection("fashionOrder")
            .where("buyerId","==",userId);
            const records = await orderToGet.get();
            records.forEach(async(record)=>{
                const ord = record.data();
                const recordByOrder = db.collection("fashion").doc(ord.orderId);
                const recordOrder = await recordByOrder.get();
                const info = recordOrder.data();  
                orders.push({
                    id:recordOrder.id,
                    record: info,
                    detail: ord
                });
            });
            return orders;
        }catch{return orders}
    }
    async deleteClientOrder(id){
        try{
            const dataToUpdate = db.collection("fashionOrder").doc(id);
            await dataToUpdate.delete();
        }catch{return }
    }
}
const data = new Database();
export { data };


