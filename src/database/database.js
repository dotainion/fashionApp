import { db } from '../auth/authentication';


class Database{
    async addUser(uid,data){
        delete data.password;
        await db.collection("fashionUsers").doc(uid).set(data);
    }
    async addData(record){
        const dataToAdd = db.collection("fashion");
        await dataToAdd.add(record);
    }
    async getData(){
        let storeRecords = [];
        const dataToGet = db.collection("fashion");
        const records = await dataToGet.get();
        records.forEach((record)=>{
            const info = record.data();
            storeRecords.push({id:record.id,record: info});
        });
        return {state:true,records:storeRecords};
    }
}
const data = new Database();
export { data };


