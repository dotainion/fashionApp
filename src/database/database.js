import { db } from '../auth/authentication';


class Database{
    async getUser(id){
        const userRef = db.collection("fashionUsers");
        const userData = await userRef.doc(id).get();
        return userData.data();
    }
    async addUser(uid,data){
        delete data.password;
        await db.collection("fashionUsers").doc(uid).set(data);
    }
    async addData(record){
        const dataToAdd = db.collection("fashion");
        await dataToAdd.add(record);
    }
    async getData(limit=5){
        let storeRecords = [];
        const dataToGet = db.collection("fashion").limit(limit);
        const records = await dataToGet.get();
        records.forEach((record)=>{
            const info = record.data();
            storeRecords.push({id:record.id,record: info});
        });
        return {state:true,records:storeRecords};
    }
    async search(searchBy,limit=5){
        let allRecords = await this.getData(limit);
        allRecords = allRecords.records;
        const searchResults = allRecords.filter((value) =>
            value.record.title.toLowerCase()
            .includes(searchBy.toLowerCase())
        );
        return searchResults;
    }
}
const data = new Database();
export { data };


