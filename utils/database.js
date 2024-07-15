import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ministories",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Not Connected", err.message);
  }
};
