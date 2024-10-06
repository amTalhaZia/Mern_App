import axios from "axios"


const axiosInstance = axios.create({
    baseUrl: "http://localhost:4000/api/v1/users",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})



// login user

export const loginUser = async(username, email) => {
    try {
        const response = await axiosInstance.post("/login", {
            username,
            email
        })

        return response.data
    } catch (error) {
        throw new Error("Failed to login user", error.message)
    }
}


// register user

export  const  registerUser = async(username, email,  password)=> {
    try {
        const  respone =  await  axiosInstance.post("/register", {
            username,
            email,
            password
        })
        return respone.data
    } catch (error) {
        throw new Error("Couldn't register user", error.message)
    }
}


// Logout User
export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post("/logout");
        return response.data; // Returns the logout success message or data
    } catch (error) {
        throw new Error("Failed to logout user", error.message);
    }
};
