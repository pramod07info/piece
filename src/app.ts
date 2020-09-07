import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: any, port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(function (req, res, next) {
            console.log("====== dataad tes");

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
        
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        
            // Pass to next layer of middleware
            next();
        });
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;