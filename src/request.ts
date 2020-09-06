Piece Create Request:-------
URL:http://localhost:3000/piece
Method: POST
Request:--
{
	"title": "Yamamoto ekvfen Pomodoro method 4 data insert",
    "user_id":"12334sani",
	"status": "DRAFT",
	"videoInfo": [{	
			"video_url": "https://so-fa-dog-ou-res.cloudinary.com/video/upload/v1595848639/20200727_RIP.Yamamoto_ekvfen.mp4",
            "status":"DRAFT",
			"sentences": [
                {
					"sentence": "Pomodoro method1 dfgfdg"
                },
                {
					"sentence": "Pomodoro method1 fddfgdfsdfsd" 
                }
            ]
		},
		{
			"video_url": "https://so-fa-dog-ou-res.cloudinary.com/video/upload/v1593099640/samples/20200625_Pomodoro.Method_Re_xvhnk3.mp4",
            "status":"DRAFT",
			"sentences": [{	
					"sentence": "Yamamoto_ekvfen1"
				},
				{			
					"sentence": "Yamamoto_ekvfen2"
				}
			]
		}
    ]   
}

Piece Response:---------

{
    "statusCode": "200",
    "message": "Data created successfully",
    "data": {
        "id": 28,
        "user_id": "",
        "title": "Yamamoto ekvfen Pomodoro method 4 data insert",
        "status": "DRAFT",
        "created": null,
        "updated": null
    },
    "error": ""
}
API:--Update Piece
URL:http://localhost:3000/piece
Method: put
Request:--
{
    "id":27,
    "title":"cdsdas daskjdhkasjd askjdsad asdkjasd askjd",
    "status":"DELETE"
}

Response:---
{
    "statusCode": "200",
    "message": "Data updated successfully",
    "data": {
        "id": 27,
        "user_id": "1234",
        "title": "cdsdas daskjdhkasjd askjdsad asdkjasd askjd",
        "status": "DELETE",
        "created": null,
        "updated": null
    },
    "error": ""
}

Get piece data:-----------------
Request:-----

{
    "skip":0,
    "take":3,
    "status":"DRAFT"
}


Response:--
{
    "statusCode": "200",
    "message": "Fetch all data successfully",
    "data": [
        {
            "id": 27,
            "user_id": "1234",
            "status": "DRAFT",
            "title": "Yamamoto ekvfen Pomodoro method 4 data insert",
            "video_info": [
                {
                    "id": 104,
                    "video_url": "https://so-fa-dog-ou-res.cloudinary.com/video/upload/v1593099640/samples/20200625_Pomodoro.Method_Re_xvhnk3.mp4",
                    "video_id": null,
                    "status": "DRAFT",
                    "sentences": [
                        {
                            "sentence": "Yamamoto_ekvfen1"
                        },
                        {
                            "sentence": "Yamamoto_ekvfen2"
                        }
                    ]
                }
            ]
        },
        {
            "id": 28,
            "user_id": "",
            "status": "DRAFT",
            "title": "Yamamoto ekvfen Pomodoro method 4 data insert",
            "video_info": []
        }
    ],
    "error": ""
}


Get Piece By Id:---------------
Request:- Url:---------------http://localhost:3000/piece/27/DRAFT
Response:---
{
    "statusCode": "200",
    "message": "Fetch single data successfully",
    "data": [
        {
            "id": 27,
            "user_id": "1234",
            "status": "DRAFT",
            "title": "Yamamoto ekvfen Pomodoro method 4 data insert",
            "video_info": [
                {
                    "id":123
                    "video_url": "https://so-fa-dog-ou-res.cloudinary.com/video/upload/v1593099640/samples/20200625_Pomodoro.Method_Re_xvhnk3.mp4",
                    "video_id": null,
                    "status": "DRAFT",
                    "sentences": [
                        {
                            "sentence": "Yamamoto_ekvfen1"
                        },
                        {
                            "sentence": "Yamamoto_ekvfen2"
                        }
                    ]
                }
            ]
        }
    ],
    "error": ""
}



Get Piece By UserId and Status:-------------
Url:-http://localhost:3000/piece/getPieceByUserId
Request: ------ Methost :---- Post
{
    "user_id":"1234",
    "status":"DRAFT"
}
Response:--
{
    "statusCode": "200",
    "message": "Fetch user data successfully",
    "data": [
        {
            "id": 27,
            "user_id": "1234",
            "status": "DRAFT",
            "title": "Yamamoto ekvfen Pomodoro method 4 data insert",
            "video_info": [
                {
                    "id": 104,
                    "video_url": "https://so-fa-dog-ou-res.cloudinary.com/video/upload/v1593099640/samples/20200625_Pomodoro.Method_Re_xvhnk3.mp4",
                    "video_id": null,
                    "status": "DRAFT",
                    "sentences": [
                        {
                            "sentence": "Yamamoto_ekvfen1"
                        },
                        {
                            "sentence": "Yamamoto_ekvfen2"
                        }
                    ]
                }
            ]
        }
    ],
    "error": ""
}

Delete Piece:--------
Url:http://localhost:3000/piece/27
Method:DELETE
Response:--------
{
    "statusCode": "200",
    "message": "Data deleted successfully",
    "data": {
        "id": 27,
        "user_id": "1234",
        "title": "cdsdas daskjdhkasjd askjdsad asdkjasd askjd",
        "status": "DELETE",
        "created": null,
        "updated": null
    },
    "error": ""
}


Create Sentences:--------
Url:-http://localhost:3000/sentences
Request: ------ Methost :---- Post

{
    "video_id":76,
	"sentence":"Pomodoro method1 dfgfdgsdsd"
}

Response:--

{
    "statusCode": "200",
    "message": "Data created successfully",
    "data": {
        "sentence": "Pomodoro method1 dfgfdgsdsd",
        "video_id": 106,
        "created": null,
        "updated": null,
        "id": 222
    },
    "error": ""
}

Update Sentences:--
Url:-http://localhost:3000/sentences
Request: ------ Methost :---- PUT

{
    "id":222,
    "video_id":106,
	"sentence":"Pomodoro method1 update sentence 222xsd"
}
Response:----
{
    "statusCode": "200",
    "message": "Data updated successfully",
    "data": {
        "sentence": "Pomodoro method1 update sentence 222xsd",
        "video_id": 106,
        "created": null,
        "updated": null,
        "id": 222
    },
    "error": ""
}

Delete Sentences:----
Url:---- http://localhost:3000/sentences/129
Method:-- Delete
Response:----
{
    "statusCode": "200",
    "message": "Data deleted successfully",
    "data": {
        "sentence": "Pomodoro method1 update sentence 222xsd",
        "video_id": 106,
        "created": null,
        "updated": null,
        "id": 222
    },
    "error": ""
}

Create Video Info:----------
URL:--
Method:---POST
Request:--
{
    "piece_id":27,
    "video_url":"dslkmlsd lsadlkasdlka dlaskdlksad asdklsada"
}
Response:----
{
    "statusCode": "200",
    "message": "Data created successfully",
    "data": {
        "id": 111,
        "piece_id": 27,
        "video_id": null,
        "video_url": "dslkmlsd lsadlkasdlka dlaskdlksad asdklsada",
        "created": null,
        "updated": null,
        "status": "DRAFT"
    },
    "error": ""
}

Delete Video Info:----------------
Url:-- http://localhost:3000/videoInfo/103
Method:-- DELETE
Response:--
{
    "statusCode": "200",
    "message": "Data deleted successfully",
    "data": {
        "id": 106,
        "piece_id": 28,
        "video_id": null,
        "video_url": "https://so-fa-dog-ou-res.cloudinary.com/video/upload/v1593099640/samples/20200625_Pomodoro.Method_Re_xvhnk3.mp4",
        "created": null,
        "updated": null,
        "status": "DELETE"
    },
    "error": ""
}


