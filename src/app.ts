import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';



class App {
    public app: express.Application;
    public port: number;

    private corsOptions = {
        origin: 'https://sofadog-newsflare.vercel.app',
        optionsSuccessStatus: 200
    }

    constructor(controllers: any, port: number) {
        this.app = express();
        this.port = port;
        this.app.options('*', cors()) ;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', cors(), controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;