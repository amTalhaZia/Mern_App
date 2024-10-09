import axios from "axios";

// Login User
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/users/login", {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {

        throw new Error("Failed to login user: " + (error.message));
    }
};

// Register User
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/users/register", {
            username,
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data; 
    } catch (error) {
        throw new Error("Couldn't register user: " + ( error.message));
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/users/logout", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        // console.log(response.data)
        return response.data; 

    } catch (error) {

        throw new Error("Failed to logout user: " + error.message);
    }
};
