import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { connectDB } from "./connectDB.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import { User, Transaction } from "../types.ts";
export const status = (ctx: Context) => {
  ctx.response.body = "Server is running";
};
export const getUser = async (ctx: Context) => {
  const client = await connectDB();
  const Email = ctx.request.url.searchParams.get("email");
  if (!Email) {
    ctx.response.status = 400;
    ctx.response.body = "Email is required";
    return;
  } else {
    const User = (await client
      .collection("Users")
      .findOne({ Email: Email })) as User;
    if (User == null) {
      ctx.response.body = "User not found";
      ctx.response.status = 404;
    } else {
      ctx.response.body = User;
      ctx.response.status = 200;
    }
  }
};
export const addUser = async (ctx: Context) => {
  const client = await connectDB();
  const domainRegEx = new RegExp('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
  const DNIRegEx = new RegExp('/^[0-9]{8}[A-Z]$/');
  const { DNI, Nombre, Apellido, Telefono, Email, IBAN} = {
    DNI: ctx.request.url.searchParams.get("DNI"),
    Nombre: ctx.request.url.searchParams.get("Nombre"),
    Apellido: ctx.request.url.searchParams.get("Apellido"),
    Telefono: ctx.request.url.searchParams.get("Telefono"),
    Email: ctx.request.url.searchParams.get("Email"),
    IBAN: ctx.request.url.searchParams.get("IBAN"),
  }
  if (!DNI || !Nombre || !Apellido || !Telefono || !Email || !IBAN ) {
    ctx.response.body = "Missing parameters";
    ctx.response.status = 400;
  }else if(
    DNI.length != 9 || Telefono.length != 9 || Email.length < 3 || IBAN.length != 24 || Email.includes("@") == false || Email.includes(".") == false || domainRegEx.test(Email) == true  || DNIRegEx.test(DNI) == true ){
    ctx.response.body = "Invalid parameters";
    ctx.response.status = 400;
  } 
  else {
    const Duped = (await client.collection("Users").findOne({
      $or: [
        { Email: Email },
        { DNI: DNI },
        { IBAN: IBAN },
        { Telefono: Telefono },
      ],
    })) as User;
    if (Duped) {
      ctx.response.body = "User already exists, please check your data";
      ctx.response.status = 403;
    } else {
      await client
        .collection("Users")
        .insertOne({ DNI, Nombre, Apellido, Telefono, Email, IBAN });
      ctx.response.body = "User added";
      ctx.response.status = 200;
    }
  }
};
export const deleteUser = async (ctx: Context) => {
  const client = await connectDB();
  const Email = ctx.request.url.searchParams.get("email");
  if (!Email) {
    ctx.response.status = 400;
    ctx.response.body = "Email is required";
    return;
  } else {
    const User = (await client
      .collection("Users")
      .findOne({ Email: Email })) as User;
    if (User == null) {
      ctx.response.body = "User not found";
      ctx.response.status = 404;
    } else {
      await client.collection("Users").deleteOne({ Email: Email });
      ctx.response.body = "User deleted";
      ctx.response.status = 200;
    }
  }
};
export const addTransaction = async (ctx: Context) => {
  const client = await connectDB();
  let { ID_Sender, ID_Receiver, amount } = {
    ID_Sender: ctx.request.url.searchParams.get("ID_Sender"),
    ID_Receiver: ctx.request.url.searchParams.get("ID_Receiver"),
    amount: ctx.request.url.searchParams.get("amount"),
  } as Transaction;
  if (!ID_Sender || !ID_Receiver || !amount) {
    ctx.response.body = "Missing parameters";
    ctx.response.status = 400;
  } else if (ID_Sender.length == !24 || ID_Receiver.length == !24) {
    ctx.response.body = "Invalid ID";
    ctx.response.status = 400;
    return;
  } else {
    ID_Sender = new ObjectId(ID_Sender);
    ID_Receiver = new ObjectId(ID_Receiver);
    const Sender = (await client
      .collection("Users")
      .findOne({ _id: ID_Sender })) as User;
    const Receiver = (await client
      .collection("Users")
      .findOne({ _id: ID_Receiver })) as User;
    if (Sender == null) {
      ctx.response.body = "Sender user does not exists ";
      ctx.response.status = 404;
    } else if (Receiver == null) {
      ctx.response.body = "Receiver user does not exists ";
      ctx.response.status = 404;
    } else {
      const Transaction = (await client
        .collection("Transactions")
        .insertOne({ ID_Sender, ID_Receiver, amount })) as Transaction;
      ctx.response.body = `Successfull transaction with id ${Transaction}`;
      ctx.response.status = 200;
    }
  }
};
export default { getUser, deleteUser, status, addUser };
