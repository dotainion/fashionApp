import firebase from 'firebase';
import { FB_DB_CONFIG } from '../config/firebase';
import testImage from '../images/test.jpg';
import tools from '../components/Tools';

const db = firebase.initializeApp(FB_DB_CONFIG).firestore();

class Database{
    //add data to database
    async addData(record){
        const dataToAdd = db.collection("fashion");
        console.log(await dataToAdd.add(record));
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

export const getData = async() =>{
    const data = [
        {
            img: "",
            title: "testing",
            price: "505df",
            detail: "this is just a test",
            id: "some id"
        }
    ]
    return {state:true,data:data};
}

