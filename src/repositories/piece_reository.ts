
import { PrismaClient } from '@prisma/client'
import { connect } from 'http2';

const prisma = new PrismaClient()

export class PieceRepository {
	async post(req: any) {
		try {
			  
			const result = await prisma.piece.create({
				data: {
					title:req.body.title,
					status:req.body.status
				},
			})
			var videoinfo:any[];
			videoinfo = req.body.videoInfo;
			for(var i =0; i< videoinfo.length; i++){
				const result1 = await prisma.video_info.create({
					data: {
						video_url:videoinfo[i],
						sentence:{
							create:videoinfo[i].sentences
						},
						
						
					},
				})
			}
			
			return result	
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
							sentence:{
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
}