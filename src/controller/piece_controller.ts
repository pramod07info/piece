import express from 'express';
import { IPiece } from '../model/index'
import { PieceRepository } from '../repositories/index'
import { isArray } from 'util';
class PieceController {
    private pieceRepository = new PieceRepository();
    public path = '/piece';
    public pathPiece = '/piece/:id/:status'
    public pathPieceUserId = '/piece/getPieceByUserId'
    public router = express.Router();
    public app = express();    

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.createPiece);
        this.router.get(this.pathPiece, this.getSinglePiece);
        this.router.get(this.path, this.getAllPiece);
        this.router.post(this.pathPieceUserId, this.getPieceByUserId);
    }
    formatDataCreatePieceAndUpdatePiece(requestData:any){
        let  actualData = {      
             title:"",
             user_id: "",
             status:"",
             video_info:{
                 create:  [] as  any
             }
           };
        actualData.title =requestData.title;
        actualData.status =requestData.status; 
        requestData.videoInfo.forEach(function (value :any) {     
            let video_info ={
                video_url:"",
                status:"",
                sentences:{
                    create: ''
                }
            };
            video_info.video_url = value.video_url;
            video_info.sentences.create = value.sentences;
            actualData.video_info.create.push(video_info);
              
        });
        return actualData;
    }
    
    formdataSentences(data:any){
        let sentences_object = {
            create: { sentence: '' },
            update: { sentence: '' },
            where: { id: 32},
        };
        let datainfo = {
            where : {id : data.id || 0 },
            data : {
                sentences: {
                   upsert:[] as  any
                 },
            },
        };

        data.videoInfo.sentences.forEach(function (value :any) {  
            sentences_object.create.sentence =   value.video_url;
            sentences_object.update.sentence =   value.video_url;
            sentences_object.where.id = value.id || 0 ;    
            datainfo.data.sentences.upsert.push(sentences_object);     
        });
        console.log(datainfo,"datainfo");
        return datainfo;
    }

    createPiece = async (request: express.Request, response: express.Response) => {
       
        let req_data = this.formatDataCreatePieceAndUpdatePiece(request.body);
        let pieceData = {
            id:request.body.id,
            data:req_data
         }
        const result = await this.pieceRepository.createPieceAndVideo(pieceData)
        response.send(result);
    }
   
    getSinglePiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.getPieceById(request)
        response.send(result)
    }
    getAllPiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.get(request)
        response.send(result)
    }
    getPieceByUserId = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.getPieceByUserId(request)
        response.send(result)
    }
    

    
}

export default PieceController;