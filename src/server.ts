import mongoose from "mongoose";
import {Server} from "http";
import app from "./app";

let server : Server;

const PORT = 3000;
async function main(){
    try {
        await mongoose.connect(
          "mongodb+srv://library_management_master:O1DvmaP8O6LN9o1V@cluster0.yrwn1se.mongodb.net/noteDB?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Database connection successful");
        server = app.listen(PORT, () =>{
            console.log(`Library Management Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log("Error in main function:", error);
    }
}

main();