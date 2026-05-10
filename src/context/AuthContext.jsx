import { createContext, useEffect, useState } from "react";
import authservice from "../appwrite/auth";
import dataservice from "../appwrite/database";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current logged-in user
  const fetchUser = async () => {
    try {
      const currentUser = await authservice.currentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("FetchUser Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      await authservice.login({
        email: email.trim(),
        password,
      });

      const currentUser = await authservice.currentUser();

      if (!currentUser) {
        throw new Error("Login failed. Please try again.");
      }

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      console.error("Login Context Error:", error);
      throw error;
    }
  };

  // Signup
  const signup = async (data) => {
    try {
      const {
        name,
        course,
        department,
        year,
        rollno,
        email,
        password,
      } = data;

      let userAccount;

      try {
        userAccount = await authservice.createAccount({
          email: email.trim(),
          password,
          name: name.trim(),
        });
      } catch (error) {
        if (
          error.message?.toLowerCase().includes("already exists") ||
          error.code === 409
        ) {
          throw new Error("Account already exists. Please login.");
        }

        throw error;
      }

      if (!userAccount) {
        throw new Error("Signup failed.");
      }

      // Auto login after signup
      await authservice.login({
        email: email.trim(),
        password,
      });

      let currentUser = null;

      // Retry fetching user session
      for (let i = 0; i < 5; i++) {
        currentUser = await authservice.currentUser();

        if (currentUser) break;

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (!currentUser) {
        throw new Error("Signup succeeded but login failed.");
      }

      // Create user profile
      try {
        await dataservice.createProfile({
          userId: currentUser.$id,
          name: name.trim(),
          email: email.trim(),
          course,
          department:
            course === "BTech" || course === "MTech"
              ? department
              : "NA",
          year,
          rollno: rollno.trim(),
        });
      } catch (profileError) {
        console.error("Profile Creation Error:", profileError);
      }

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      console.error("Signup Context Error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authservice.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout Context Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};