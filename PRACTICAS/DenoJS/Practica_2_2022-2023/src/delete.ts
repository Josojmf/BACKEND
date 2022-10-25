import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { connectDB } from "./connectDB.ts";
// deno-lint-ignore no-unused-vars
import { User } from "../types.ts";

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
