import express from 'express';
import { IPiece } from '../model/index'
import { PieceRepository } from '../repositories/index'
class PieceController {
    private pieceRepository = new PieceRepository();
    public path = '/piece';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.createPiece);
        this.router.get(this.path, this.getAllPiece);
    }

    createPiece = async (request: express.Request, response: express.Response) => {
       
    //     console.dir(request.body.videoInfo[0].sentences[0])
    //     var  video_info:any[];
    //     var  sentence1:any[];
    //     video_info = request.body.videoInfo;
    //    // console.dir(video_info)
    //    var str:string;
    //     for(var  i =0; i < video_info.length; i++){
    //        console.dir(video_info[i].sentences);
    //         str = "" 
    //     }
        const result = await this.pieceRepository.post(request)
        response.send("result")
    }

    getAllPiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.get(request)
        response.send(result)
    }
    updatePiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.post(request)
        // var piece: IPiece = {
        //     id: String(result.id),
        //     pieceId: result.piece_id,
        //     status:result.status,
        //     title: result.title
        // }
        response.send("piece")
    }
    deletePiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.post(request)
        // var piece: IPiece = {
        //     id: String(result.id),
        //     pieceId: result.piece_id,
        //     status:result.status,
        //     title: result.title
        // }
        // response.send(piece)
    }
}

export default PieceController;