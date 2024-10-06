import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


const  connectDb= async() => {
    try {
        const con = await mongoose.connect(`${process.env.URL}`)
        console.log('db connected', con.connection.host);
    } catch (error) {
        console.log("incoorrect   db url",error.message);
        process.exit(1);
    }
}

export default connectDb