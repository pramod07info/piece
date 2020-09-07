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
        this.app.options('*', cors())
       // this.app.use(cors());
        // this.app.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        //   });
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router,cors());
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;