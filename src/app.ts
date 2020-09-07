import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';



class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: any, port: number) {
        this.app = express();
        this.port = port;
        this.app
            .use(cors())
            .use(cors({ origin: '*' }))
            .use(bodyParser.urlencoded({ extended: true }))
            .use(bodyParser.json());

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
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