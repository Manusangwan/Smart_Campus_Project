const conf={
    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteprofilecollectionid: String(import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID)
}
export default conf;