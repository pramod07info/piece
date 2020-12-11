import express from 'express';
import { SourceRepository } from '../repositories/index'

class SourceController {
    private sourceRepository = new SourceRepository();
    public path = '/sources';
    public pathDelete = '/sources/:id';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.createSources);
        this.router.put(this.path, this.updateSource);
        this.router.delete(this.pathDelete, this.deleteSource);
    }

    createSources = async (request: express.Request, response: express.Response) => {
        const result = await this.sourceRepository.createSources(request)
        response.send(result);
    }
    updateSource = async (request: express.Request, response: express.Response) => {
        const result = await this.sourceRepository.updateSource(request)
        response.send(result);
    }
    deleteSource = async (request: express.Request, response: express.Response) => {
        const result = await this.sourceRepository.deleteSource(request)
        response.send(result);
    }

}

export default SourceController;