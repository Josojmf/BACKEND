//import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import {
  Application,
} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import router from "./src/routes.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server running on port 8080");
app.listen({ port: 8080 });