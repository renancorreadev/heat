import "dotenv/config";
import * as express from 'express';
import {router} from './routes';
import {Server} from "socket.io"
import * as http from 'http';
import * as cors from "cors";

const app = express();
const serverHttp = http.createServer(app);
app.use(express.json());
app.use(router);
app.use(cors());

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log(`User connect to Socket ${socket.id}`)
});

app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.get("/signin/callback", (request, response) => {
    const {code} = request.query; //
    return response.json(code);
})

export {serverHttp, io};

