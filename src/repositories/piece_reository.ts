
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class PieceRepository {
	
	
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
			if(req.id == null){
				const result = await prisma.piece.create({
					data: req.data
				})
				return result;
			}else{
				const result = await prisma.piece.upsert({
					where: { id: req.id },
					update: req.data,
					create: req.data,
				})
				return result;	
			}
		} catch (error) {
			console.error(error);
			return error;
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
					status: "PUBLISHED"
				},
				select: {
					id: true,
					piece_id: true,
					status: true,
					title:true,
					video_info:{
						select:{
							video_url:true,
							video_id:true,
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
			return result	
		} catch (error) {
			console.error(error);
			return error;
		}finally{
			async () => await prisma.disconnect()
		}	
	}
	async getPieceById(req: any) {
		try {
			const result = await prisma.piece.findOne({				
				where: {
					id: parseInt(req.params.id),
				},
				select: {
					id: true,
					piece_id: true,
					status: true,
					title:true,
					video_info:{
						select:{
							video_url:true,
							video_id:true,
							sentences:{
								select:{
									sentence:true
								}
							}
						}
					}
				}
			})
			return result	
		} catch (error) {
			console.error(error);
			return error;
		}finally{
			async () => await prisma.disconnect()
		}	
	}

}