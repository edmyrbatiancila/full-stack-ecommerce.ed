import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://rymdebatman:102793@cluster0.zfmjjpy.mongodb.net/practice-ecommerce'
    ).then(() =>console.log("DB Connected"));
}