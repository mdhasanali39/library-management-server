import mongoose from "mongoose";
import {Server} from "http";
import app from "./app";

let server : Server;

async function main(){
    try {
        await mongoose.connect(`${process.env.DB_URI}`);
        console.log("Database connection successful");
        server = app.listen(process.env.PORT, () =>{
            console.log(
              `Library Management Server is running on port ${process.env.PORT}`
            );
        })
    } catch (error) {
        console.log("Error in main function:", error);
    }
}

main();