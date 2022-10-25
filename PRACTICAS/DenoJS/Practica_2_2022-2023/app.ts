import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import router from "./src/routes.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { config } from "https://deno.land/x/dotenv@v1.0.1/mod.ts";

config({ export: true });
const port = Deno.env.get("PORT");
router.allowedMethods();
const app = new Application();
let fallBackPort;
if (port == null) {
  console.log("Port not found, using 8000");
  fallBackPort = 8000;
} else fallBackPort = parseInt(port);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(oakCors());
console.log(`Server running on port ${fallBackPort}`);
app.listen({ port: fallBackPort });
