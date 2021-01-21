import firebase from 'firebase';
import tools from '../components/Tools';
import { FB_DB_CONFIG } from '../config/firebase';
import { data } from '../database/database';

const fb = firebase.initializeApp(FB_DB_CONFIG);
const db = fb.firestore();

class Auth{
    async signIn(email,password){
        try{
            const user = await fb.auth().signInWithEmailAndPassword(email,password);
            tools.saveCreds(email,password,user.user.uid);
            return true;
        }catch{
            return false;
        }
    }
    async signUp(record){
        try{
            const user = await fb.auth().createUserWithEmailAndPassword(record?.email,record?.password);
            tools.saveCreds(record?.email,record?.password,user.user.uid);
            data.addUser(user.user.uid,record)
            return true;
        }catch(error){
            return false;
        }
    }
    isLogin(){
        const user = fb.auth().currentUser;
        if (user !== null) return true;
        else if (tools.getCreds()) return true;
        return false;
    }
}

const auth = new Auth();
export { auth, db };