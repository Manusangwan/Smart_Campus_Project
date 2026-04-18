import { createContext, useEffect, useState } from "react";
import authservice from "../appwrite/auth";
import dataservice from "../appwrite/database";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const currentUser = await authservice.currentuser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await authservice.login({ email, password });

      const currentUser = await authservice.currentuser();
      setUser(currentUser);

      return currentUser;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      const {name, course="Btech", department="NA",year="1",rollno="23456", email,password } = data;
      const userAccount = await authservice.createaccount({
        email,
        password,
        name,
      });

      await authservice.login({ email, password });
      await dataservice.createprofile({
      userId: userAccount.$id,
      name,
      email,
      course,
      department,
      year,
      rollno,
    });
      const currentUser = await authservice.currentuser();
      setUser(currentUser);

      return userAccount;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authservice.logout();
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
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
        working,
        setworking
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};