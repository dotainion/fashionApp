import firebase from 'firebase';
import tools from '../components/Tools';
import { FB_DB_CONFIG } from '../config/firebase';
import { data } from '../database/database';
import { anonymousCreds } from './config';

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
            data.addUser(user.user.uid,record);
            return true;
        }catch(error){
            return false;
        }
    }
    async signOut(){
        const anonymous = anonymousCreds;
        const creds = tools.getCreds();
        if (creds.id !== anonymous.id){
            await fb.auth().signOut();
            this.signIn(anonymous.email,anonymous.password);
        }
    }
    isLogin(){
        //if anonymous creds is in login then
        //return false and so user can login
        const user = fb.auth().currentUser;
        const creds = tools.getCreds();
        if (user !== null && user?.uid !== anonymousCreds.id) return true;
        else if (creds.username && creds?.id !== anonymousCreds.id){ 
            this.signIn(creds.username,creds.password);
            return true;
        }
        return false;
    }
    async anonymous(){
        //if user is not logged in then
        //login with anonymouse credentials
        //this only allow login for home page
        if (!this.isLogin()){
            const creds = anonymousCreds;
            await this.signIn(creds.email,creds.password);
        }
    }
}

const auth = new Auth();
export { auth, db };