
import { PrismaClient } from '@prisma/client'
import {IResponse} from '../model/index';
//const prisma = new PrismaClient()
const prisma = new PrismaClient({
	errorFormat: 'minimal',
  })

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
			
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Data created successfully",
				data:this.result,
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
			async () => await prisma.$disconnect()
		}
		
    }
    async updateSentances(req: any) {	
		try {
			this.result = await prisma.sentences.update({
				where: { id: req.body.id },
				data: {
					sentence:req.body.sentence,
					video_info: {
					  connect: { id: req.body.video_id },
					},
				},
			})			
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Data updated successfully",
				data:this.result,
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
			async () => await prisma.$disconnect()
		}
		
	}
	async deleteSentances(req: any) {	
		try {
			this.result = await prisma.sentences.delete({
				where: { id: parseInt(req.params.id) }
			})
			
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Data deleted successfully",
				data:this.result,
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
			async () => await prisma.$disconnect()
		}	
	}
	

}