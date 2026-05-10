// ==============================
// src/conf/conf.js
// ==============================

const conf = {
    // Appwrite Config
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL || "",
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "",
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
    appwriteProfileCollectionId:
        import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID || "",

    // Optional APIs
    openRouterApiKey: import.meta.env.VITE_OPENROUTER_API_KEY || "",
};



// Validation
if (!conf.appwriteUrl) {
    throw new Error("VITE_APPWRITE_URL is missing in .env");
}

if (!conf.appwriteProjectId) {
    throw new Error("VITE_APPWRITE_PROJECT_ID is missing in .env");
}

export default conf;