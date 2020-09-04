
import { PrismaClient } from '@prisma/client'
import {IResponse} from '../model/index';
//const prisma = new PrismaClient()
const prisma = new PrismaClient({
	errorFormat: 'minimal',
	log: [
		{
		  emit: 'event',
		  level: 'query',
		},
	  ],
  })
  prisma.$on('query', e => {
	e.query, console.log(e)
  })

export class PieceRepository {
	
	result:any;
	async post(req: any) {	
		console.log(req,"kkkkkkkkk");
		//console.dir(req.video_info.sentences);	
		try {
			// const result = null;
			// if(req.id == null){
			// 	this.result = await prisma.piece.create({
			// 		data: req.data
			// 	})
			// }else{
			// 	this.result = await prisma.piece.upsert({
			// 		where: { id: req.id },
			// 		update: req.data,
			// 		create: req.data,
			// 	})	
			// }			  
			// this.result = await prisma.piece.upsert({
			// 	where: { id: req.id },
			// 	update: {
				
			// 		video_info:{
						
			// 			update:req.data.video_info	
			// 		},
			// 	},
			// 	create: req.data,
			// })
			// return result	

			// const user = await prisma.piece.create({
			// 	data:req
			//   });
			  const sentence = await prisma.video_info.update(req);
		} catch (error) {
			console.error(error);
			return error;
		}finally{
			async () => await prisma.$disconnect()
		}
		
	}

	async createPieceAndVideo(req: any) {	
		
		try {			
			// if(req.id == null){
				const result = await prisma.piece.create({
					data: req.data
				})
				const iResponse: IResponse = {
					statusCode:"200",
					message:"Data created successfully",
					data: result,
					error:""
				}
				return iResponse;
			// }else{
			// 	const result = await prisma.piece.upsert({
			// 		where: { id: req.id },
			// 		update: req.data,
			// 		create: req.data,
			// 	})
			// 	const iResponse: IResponse = {
			// 		statusCode:"200",
			// 		message:"Data created or updated successfully",
			// 		data: result,
			// 		error:""
			// 	}
			// 	return iResponse;
			//}
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error
			}
			return iResponse;
		}finally{
			async () => await prisma.$disconnect()
		}
		
	}
	
	async get(req: any) {
		try {
			const result = await prisma.piece.findMany({
				skip:req.body.skip,
				take:req.body.take,
				where: {
					status: req.body.status,
					
				},
				select: {
					id: true,
					user_id: true,
					status: true,
					title:true,
					video_info:{
						where:{
							status:req.body.status
						},
						select:{
							id:true,
							video_url:true,
							video_id:true,
							status:true,
							sentences:{
								select:{
									sentence:true
								}
							}
						}
					}
				},
				orderBy: {
					created: 'asc'
				}
			})
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Fetch all data successfully",
				data:result,
				error:""
			}
			return iResponse;	
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error
			}
			return iResponse;
		}finally{
			async () => await prisma.disconnect()
		}	
	}
	async getPieceById(req: any) {
		try {
			const result = await prisma.piece.findMany({				
				where: {
					id: parseInt(req.params.id),
					AND:[
						{
							status:req.params.status
						}
					]
				},
				select: {
					id: true,
					user_id: true,
					status: true,
					title:true,
					video_info:{
						where:{
							status:req.params.status
						},
						select:{
							id:true,
							video_url:true,
							video_id:true,
							status:true,
							sentences:{
								select:{
									sentence:true
								}
							}
						}
					}
				},
				orderBy: {
					created: 'asc'
				}
			})
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Fetch single data successfully",
				data:result,
				error:""
			}
			return iResponse;	
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error
			}
			return iResponse;
		}finally{
			async () => await prisma.disconnect()
		}	
	}
	async getPieceByUserId(req: any) {
		try {
			const result = await prisma.piece.findMany({				
				where: {
					user_id: req.body.user_id,
					AND:[
						{
							status:req.body.status
						}
					]
				},
				select: {
					id: true,
					user_id: true,
					status: true,
					title:true,
					video_info:{
						where:{
							status:req.body.status
						},
						select:{
							id:true,
							video_url:true,
							video_id:true,
							status:true,
							sentences:{
								select:{
									sentence:true
								}
							}
						}
					}
				},
				orderBy: {
					created: 'asc'
				}
			})
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Fetch user data successfully",
				data:result,
				error:""
			}
			return iResponse;	
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error
			}
			return iResponse;
		}finally{
			async () => await prisma.disconnect()
		}	
	}
}