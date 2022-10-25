// deno-lint-ignore-file no-inferrable-types
import {
    MongoClient,
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
  import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';


export const connectDB = async (): Promise<any> => {
  //Params from .env file
  config({export: true});
  const dbName = Deno.env.get("DB_NAME");
  const usr = Deno.env.get("DB_USR");
  const pwd = Deno.env.get("DB_PWD");
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