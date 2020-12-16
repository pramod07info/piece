
import { PrismaClient } from '@prisma/client'
import {IResponse} from '../model/index';

//const prisma = new PrismaClient()
const prisma = new PrismaClient({
	errorFormat: 'minimal',
  })

export class VideoInfoRepository {
	result:any;
	async createVideo(req: any) {	
		
		try {			
			const result = await prisma.video_info.create({
				data:{
					video_url:req.body.video_url,
					status:"DRAFT",
					piece:{
						connect:{
							id:req.body.piece_id
						}
					}
				}
			})
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Data created successfully",
				data: result,
				error:""
			}
			return iResponse;
			
		} catch (error) {
			console.error(error.message);
			const iResponse: IResponse = {
				statusCode:"200",
				message:"Something went worng",
				data:"",
				error:error.message
			}
			return iResponse;
		}finally{
			async () => await prisma.$disconnect()
		}
		
	}

	async deleteVideo(req: any) {	
		try {
			this.result = await prisma.video_info.delete({
				where: { id: parseInt(req.params.id) },
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
				error:error.message
			}
			return iResponse;
		}finally{
			async () => await prisma.$disconnect()
		}	
	}
	async get() {
		const result = await prisma.video_info.findMany({
			where: {
				status: "PUBLISH"
			},
			select: {
				id: true,
                piece_id: true,
                video_id:true,
                video_url:true,
                status: true
                
			},
			orderBy: {
				created: 'asc'
			}
		})
		return result
	}
}