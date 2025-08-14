import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [Auth, setAuth] = useState({
        user: null, // 🔹 User ki details store karega
        token: "",
        isLoading: true, // 🔹 Initial loading state
    });

    useEffect(() => {
        // 🔹 LocalStorage se token aur user details fetch
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            // ✅ Safe parse: only parse if storedUser is not null
            try {
                setAuth({
                    user: JSON.parse(storedUser), // String ko object me convert
                    token: storedToken, // Token set
                    isLoading: false,
                });
            } catch (error) {
                console.error("Error parsing stored user:", error);
                setAuth({
                    user: null,
                    token: "",
                    isLoading: false,
                });
            }
        } else {
            // 🔹 Agar token ya user nahi mila to auth state reset
            setAuth({
                user: null,
                token: "",
                isLoading: false,
            });
        }
    }, []);

    async function logout() {
        // 🔹 Logout functionality
        localStorage.removeItem("token"); // Token ko remove karo
        localStorage.removeItem("user"); // User ko remove karo
        setAuth({
            user: null, // User ko null karo
            token: "", // Token ko empty karo
            isLoading: false, // Loading state ko false karo
        });
    }

    return (
        <AuthContext.Provider value={{ Auth, setAuth , logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
