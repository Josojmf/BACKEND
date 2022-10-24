import {Router} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {getUser,deleteUser,status,addUser,addTransaction} from "./controllers.ts";

const router:Router = new Router();
router.get("/status",status);
router.get("/getUser/email",getUser);
router.post("/addUser",addUser);
router.post("/addTransaction",addTransaction);
router.delete("/deleteUser/email",deleteUser);
export default router;