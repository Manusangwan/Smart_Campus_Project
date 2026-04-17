import { Client,ID,Databases } from "appwrite";
import conf from '../conf/conf'

export class DataService{
    client= new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid)
        this.databases= new Databases(this.client)
    }
    async createprofile({userId,name,email,course,department,year,rollno}){
        try{
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwriteprofilecollectionid,
                ID.unique(),
                {
                    userId,
                    name,
                    email,
                    course,
                    department,
                    year,
                    rollno
                }
            )
        }
        catch(error){
            console.log("Appwrite Service:: Database:: createpost :: Error:, ",error);
        }
    }
    
}
const dataservice= new DataService()
export default dataservice;