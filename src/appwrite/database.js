import { Client, ID, Databases, Permission, Role } from "appwrite";
import conf from "../conf/conf";

export class DataService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);

    this.databases = new Databases(this.client);
  }

  async createprofile({
    userId,
    name,
    email,
    course,
    department,
    year,
    rollno,
  }) {
    try {
      // 🔥 DEBUG: see what is being sent
      console.log("Creating profile with data:", {
        userId,
        name,
        email,
        course,
        department,
        year,
        rollno,
      });

      const response = await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwriteprofilecollectionid,
        ID.unique(),
        {
          userId,
          name,
          email,
          course,
          department,
          year: Number(year),   // ✅ FIXED datatype
          rollno: String(rollno), // ✅ safer (rollno often string)
        },
        [
          // 🔐 Document-level permissions (BEST PRACTICE)
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      console.log("Profile created successfully:", response);
      return response;

    } catch (error) {
      console.error("❌ Database createprofile error:", error.message || error);
      throw error;
    }
  }
}

const dataservice = new DataService();
export default dataservice;