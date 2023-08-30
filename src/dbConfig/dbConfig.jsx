// import mongoose, { connection } from "mongoose";

// export async function connect(){

//     try {
//         mongoose.connect(process.env.MONGO_URI)

//         const connection = mongoose.connection

//         connection.on('conncetd',()=>{
//             console.log('connected')
//         })

//         connection.on('error', () => {
//             console.log('some Error occured')
//             process.exit()
//         })
//     } catch (error) {
//         console.log('connection error')
//         console.log(error); //
//     }
// }

import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to the database');
        });

        connection.on('error', (err) => {
            console.error('Database connection error:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('Error while connecting to the database:', error);
        process.exit(1);
    }
}
