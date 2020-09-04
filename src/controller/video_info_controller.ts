import express from 'express';

import { IVideoInfo } from '../model/index'
import { VideoInfoRepository } from '../repositories/index'
class VideoInfoController {
    private videoInfoRepository = new VideoInfoRepository();
    public path = '/videoInfo';
    public pathDelete = '/videoInfo/:id';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
//        this.router.post(this.path, this.createVideoInfo);
        this.router.delete(this.pathDelete, this.deleteVideoInfo);
    }
    deleteVideoInfo = async (request: express.Request, response: express.Response) => {
        const result = await this.videoInfoRepository.deleteVideo(request)
        response.send(result)
    }
}

export default VideoInfoController;