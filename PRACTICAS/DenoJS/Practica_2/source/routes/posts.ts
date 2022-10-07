import { Express } from "https://deno.land/x/sentry_deno@v0.2.2/packages/tracing/src/integrations/node/express.ts";
import controller from '../controllers/posts.ts';
//Exports for express router
const router = Express.Router();
router.get('/status', controller.getStatus);
router.get('/characters', controller.getPosts);
router.get('/character/:id', controller.getPost);
router.put('/switchstatus/:id', controller.switchStatus);
router.delete('/character/:id', controller.deletePost);
router.post('/addPost',controller.addPost);
//export = router;

