
actualData = {  
  title:"",
  status:"",
  video_info:{
      create:[ ]
  }
};

function formatData(requestData){
  actualData.title =requestData.title;
  actualData.status =requestData.status;
  //console.log("formatData =====",requestData);
  datainfo = {};
  requestData.videoInfo.forEach(element => {

    video_info ={
      video_url:"",
      sentences:{
          create:[
             
          ]
      }
    };

    //console.log(element,"element");
    video_info.video_url = element.video_url;
    //if(!empty(element.sentences)){
      video_info.sentences.create.push(element.sentences);
   // }

    actualData.video_info.create.push(video_info);
       
     });
     return actualData;
}
