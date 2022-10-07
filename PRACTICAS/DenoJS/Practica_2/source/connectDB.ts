import { Db, MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
config()
export const connectDB = async (): Promise<Db> => {
  //Params from .env file
  const dbName = Deno.env.get("DB_NAME");
  const usr = Deno.env.get("DB_USR");
  const pwd =Deno.env.get("DB_PWD")
  const cluster = Deno.env.get("DB_CLUSTER")
  //Creating mongo client
  const mongouri: string = `mongodb+srv://${usr}:${pwd}${cluster}/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.info("MongoDB connected");
    return client.db(dbName);
  } catch (e) {
    throw e;
  }
};