import conf from "../conf/conf";
import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid)
        this.account= new Account(this.client);
    }
    async createaccount({email,password,name}){
        try{
            const useraccount= await this.account.create(ID.unique(),email,password,name)
            return useraccount;
        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }
        catch(error){
            throw error;
        }
    }

    async currentuser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service:: currentuser :: error: ",error)
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }
        catch(error){
            console.log("Appwrite Service:: logout:: error: ", error)
        }
    }
    async isLoggedIn() {
    try {
        const user = await this.currentuser();
        return !!user;
    } catch {
        return false;
    }
    }
}
const authservice= new AuthService();
export default authservice;