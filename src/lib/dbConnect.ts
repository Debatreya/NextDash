import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to Database");
        
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

        connection.isConnected = db.connections[0].readyState;

        // For more information about DB
        console.log("DB -> ", db);
        console.log("DB Connections -> ", db.connections);

        console.log("Connected to Database");
        
    }
    catch(err : any){
        console.error("Error connecting to Database", err);
        process.exit(1);
    }
}

export default dbConnect;