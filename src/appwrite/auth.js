// ==============================
// src/appwrite/auth.js
// ==============================

import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create account
    async createAccount({ email, password, name }) {
        try {
            return await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
        } catch (error) {
            console.error("CreateAccount Error:", error);
            throw error;
        }
    }

    // Login
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    }

    // Get current user
    async currentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("CurrentUser Error:", error);
            return null;
        }
    }

    // Logout
    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Logout Error:", error);
            return false;
        }
    }

    // Check login status
    async isLoggedIn() {
        try {
            const user = await this.currentUser();
            return !!user;
        } catch {
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;