// deno-lint-ignore-file no-inferrable-types
import {
    MongoClient,
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";


export const connectDB = async (): Promise<any> => {
  //Params from .env file
  const dbName = "Practica_2_2023";
  const usr = "joso";
  const pwd = "123456j"
  //Creating mongo client
  const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster0.6xzff.mongodb.net/${dbName}?authMechanism=SCRAM-SHA-1`;
  const client = new MongoClient();
  try {
    await client.connect(mongouri);
    console.info("MongoDB connected");
    return client.database(dbName);
  } catch (e) {
    throw e;
  }
};