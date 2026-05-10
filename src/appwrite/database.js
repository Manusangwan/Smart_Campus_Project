// ==============================
// src/appwrite/database.js
// ==============================

import { Client, ID, Databases, Permission, Role } from "appwrite";
import conf from "../conf/conf";

export class DataService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    // Create user profile
    async createProfile({
        userId,
        name,
        email,
        course,
        department,
        year,
        rollno,
    }) {
        try {
            console.log("Creating profile:", {
                userId,
                name,
                email,
                course,
                department,
                year,
                rollno,
            });

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                ID.unique(),
                {
                    userId,
                    name,
                    email,
                    course,
                    department,
                    year: Number(year),
                    rollno: String(rollno),
                },
                [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId)),
                ]
            );
        } catch (error) {
            console.error("CreateProfile Error:", error);
            throw error;
        }
    }

    // Get profile
    async getProfile(documentId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                documentId
            );
        } catch (error) {
            console.error("GetProfile Error:", error);
            return null;
        }
    }

    // Update profile
    async updateProfile(documentId, data) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                documentId,
                data
            );
        } catch (error) {
            console.error("UpdateProfile Error:", error);
            throw error;
        }
    }

    // Delete profile
    async deleteProfile(documentId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                documentId
            );
        } catch (error) {
            console.error("DeleteProfile Error:", error);
            throw error;
        }
    }
}

const dataService = new DataService();
export default dataService;