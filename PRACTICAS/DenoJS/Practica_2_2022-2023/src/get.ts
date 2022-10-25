// deno-lint-ignore-file no-unused-vars
import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { connectDB } from "./connectDB.ts";
import { User } from "../types.ts";

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
