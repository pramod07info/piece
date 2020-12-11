
import { PrismaClient } from '@prisma/client'
import {IResponse} from '../model/index';
//const prisma = new PrismaClient()
const prisma = new PrismaClient({
	errorFormat: 'minimal',
  })

export class SourceRepository {
	result: any;

	async createSources(req: any) {	
		try {
			this.result = await prisma.source_piece.create({
				data:{
                    url:req.body.url,
                    name:req.body.name,
					piece: {
					  connect: { id: req.body.piece_id }
					}
				}
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
			async () => await prisma.$disconnect();
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error
			}
			return iResponse;
		}		
    }
    async updateSource(req: any) {	
		try {
			this.result = await prisma.source_piece.update({
				where: { id: req.body.id },
				data: {
                    url:req.body.url,
                    name:req.body.name,
					piece: {
					  connect: { id: req.body.piece_id },
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
			async () => await prisma.$disconnect()
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error
			}
			return iResponse;
		}
		
	}
	async deleteSource(req: any) {	
		try {
			this.result = await prisma.source_piece.delete({
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