
import { PrismaClient } from '@prisma/client'
import { connect } from 'http2';

const prisma = new PrismaClient()

export class PieceRepository {
	result: any;
	
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
				this.result = await prisma.piece.create({
					data: req.data
				})
			}else{
				this.result = await prisma.piece.upsert({
					where: { id: req.id },
					update: req.data,
					create: req.data,
				})	
			}
			return this.result;	

		} catch (error) {
			console.error(error);
			return error;
		}finally{
			async () => await prisma.$disconnect()
		}
		
	}
	async createSentences(req: any) {	
		
		try {
			this.result = await prisma.sentences.create({
				data: {
					sentence: req.body.sentence,
					video_info: {
					  connect: { id: req.body.video_id },
					},
				  },
			})
			return this.result;	
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

	// async update(req: any) {
	// 	try {
	// 		const result = await prisma.piece.update({
	// 			//skip:req.body.skip,
	// 			//take:req.body.take,
	// 			where: {
	// 				id: req.id,
	// 			},
				
	// 		})
	// 		return result	
	// 	} catch (error) {
	// 		console.error(error);
	// 		return error;
	// 	}finally{
	// 		async () => await prisma.disconnect()
	// 	}	
	// }

}