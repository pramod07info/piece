import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

const allowedOrigins:any = ['http://localhost:3000',
                      'https://sofadog-newsflare.vercel.app'];

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
        
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: function(origin, callback){
              // allow requests with no origin 
              // (like mobile apps or curl requests)
              if(!origin) return callback(null, true);
              if(allowedOrigins.indexOf(origin) === -1){
                var msg = 'The CORS policy for this site does not ' +
                          'allow access from the specified Origin.';
                return callback(new Error(msg), false);
              }
              return callback(null, true);
            }
          }));
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