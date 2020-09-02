import express from 'express';
import { PieceRepository, SentencesRepository } from '../repositories/index'

class SentencesController {
    private sentancesRepository = new SentencesRepository();
    public path = '/sentences';
    public router = express.Router();
    public app = express();    

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        
        this.router.post(this.path, this.createSentences);
        this.router.get(this.path, this.getAllPiece);
    }
    
    createSentences = async (request: express.Request, response: express.Response) => {
        const result = await this.sentancesRepository.createSentences(request)
        response.send(result);
    }
    updateSentences = async (request: express.Request, response: express.Response) => {
        const result = await this.sentancesRepository.createSentences(request)
        response.send(result);
    }
    getAllPiece = async (request: express.Request, response: express.Response) => {
        const result = await this.sentancesRepository.get(request)
        response.send(result)
    }
}

export default SentencesController;