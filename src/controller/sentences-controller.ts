import express from 'express';
import { SentencesRepository } from '../repositories/index'

class SentencesController {
    private sentancesRepository = new SentencesRepository();
    public path = '/sentences';
    public pathDelete = '/sentences/:id';
    public router = express.Router();
    public app = express();    

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.createSentences);
        this.router.put(this.path, this.updateSentences);
        this.router.delete(this.pathDelete, this.deleteSentences);
        
    }
    
    createSentences = async (request: express.Request, response: express.Response) => {
        const result = await this.sentancesRepository.createSentences(request)
        response.send(result);
    }
    updateSentences = async (request: express.Request, response: express.Response) => {
        const result = await this.sentancesRepository.updateSentances(request)
        response.send(result);
    }
    deleteSentences = async (request: express.Request, response: express.Response) => {
        const result = await this.sentancesRepository.deleteSentances(request)
        response.send(result);
    }
    
}

export default SentencesController;