import App from './app';
import PieceController from './controller/piece_controller';
import VideoInfoController from './controller/video_info_controller';



 
const app = new App(
  [
    new PieceController(),
    new VideoInfoController()
  ],
  4000,
);
 
app.listen();

