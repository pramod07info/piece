import express from 'express';

import { IVideoInfo } from '../model/index'
import { VideoInfoRepository } from '../repositories/index'
class VideoInfoController {
    private videoInfoRepository = new VideoInfoRepository();
    public path = '/videoInfo';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.createVideoInfo);
        this.router.get(this.path, this.getAllVideoInfo);
    }

    createVideoInfo = async (request: express.Request, response: express.Response) => {
        const result = await this.videoInfoRepository.post(request)
        // var viddeoInfo: IVideoInfo = {
        //     id: String(result.id),
        //     pieceId: result.piece_id,
        //     videoId: result.video_id,
        //     videoUrl:result.video_url,
        //     status:result.status,
            
        // }
        response.send("viddeoInfo")
    }

    getAllVideoInfo = async (request: express.Request, response: express.Response) => {
        const result = await this.videoInfoRepository.get()
        let videoInfos: IVideoInfo[] = [];
        result.forEach(function(data){
            // var videoInfo: IVideoInfo = {
            //     id: String(data.id),
            //     pieceId: data.piece_id,
            //     videoId: data.video_id,
            //     videoUrl:data.video_url,
            //     status: data.status
            // }
            // videoInfos.push(videoInfo);
        });
        response.send(videoInfos)
    }
}

export default VideoInfoController;