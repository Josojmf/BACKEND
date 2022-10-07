import { Server } from "https://deno.land/x/http/mod.ts";
import { Express } from "https://deno.land/x/sentry_deno@v0.2.2/packages/tracing/src/integrations/node/express.ts";
import  routes  from './routes/posts.ts';
const router: Express = Express();
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { createBodyParser, JsonBodyParser } from  "https://deno.land/x/body_parser/mod.ts"
config();
const bodyParser = createBodyParser({
    parsers: [new JsonBodyParser()],
  });
/** Parse the request */
router.use(Express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(Express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);
router.use(bodyParser.json());
router.use(bodyParser.text());
router.use(bodyParser.urlencoded({ extended: true }))


 /*Error handling */
router.use((req, res, next) => {
    const error = new Error('not found ');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = Server.createServer(router);
const PORT: any = Deno.env.get("PORT");
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));



