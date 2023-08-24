import mongoose from "mongoose";

export async function connect() {
  try {
    const dbUrl = process.env.DB_URL || ''// Atribui uma string vazia caso DB_URL seja undefined
    await mongoose.connect(dbUrl)
    
  } catch (error) {
    console.log('Error connecting to database', error);

  }
}