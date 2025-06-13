import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log("Connected to database\n\n\n");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default dbConnect;
