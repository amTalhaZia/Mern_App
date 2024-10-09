import { createContext, useContext, useState } from "react";
import { registerUser, loginUser, logoutUser } from "../Api/Api.jsx";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleRegister = async (username, email, password) => {
        try {
            setError(false)
            setLoading(true);
            const newUser = await registerUser(username, email, password);
            console.log(newUser);
            
            setUser(newUser);
        } catch (error) {
            console.log(error);
            
            setError(error)
        } finally {
            setLoading(false); 
        }
    };

    const handleLogin = async (email, password) => {
        try {
            setError(false)
            setLoading(true);
            const loggedInUser = await loginUser(email, password);
            setUser(loggedInUser);
        } catch (error) {
            setError(error); 
        } finally {
            setLoading(false); 
        }
    };

    const handleLogout = async () => {
        try {
            setError(false)
            setLoading(true);
              await logoutUser();
            setUser(null); 
        } catch (error) {
            setError(error); 
        } finally {
            setLoading(false); 
        }
    };



    return (
        <AuthContext.Provider value={{ user, loading, error, handleRegister, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


export default AuthProvider