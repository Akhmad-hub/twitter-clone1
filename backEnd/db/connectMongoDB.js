import mongoose from "mongoose"


const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connected : ${conn.connection.host}`)
    }
    catch (error) {
        console.error(`error conntected to mongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectMongoDB