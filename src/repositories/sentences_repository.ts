
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class SentencesRepository {
	result: any;
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
    async Sentences(req: any) {	
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

}