import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectdb = async () => {
  try {
    const database = await mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "ims",
      })
    console.log(`database connected with ${database.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectdb;
