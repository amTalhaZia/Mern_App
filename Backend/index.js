import { app } from "./app.js";
import connectDb from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000; 

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log(`Error connecting to DB: ${"db not connected", err.message}`));
