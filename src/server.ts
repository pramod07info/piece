import App from './app';
import PieceController from './controller/piece_controller';
import VideoInfoController from './controller/video_info_controller';
import SentencesController from './controller/sentences-controller';
import SourceController from './controller/source_controller';


 
const app = new App(
  [
    new PieceController(),
    new VideoInfoController(),
    new SentencesController(),
    new SourceController()
  ],
  4000,
);
 
app.listen();

