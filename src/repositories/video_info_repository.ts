
import { PrismaClient } from '@prisma/client'
import {IResponse} from '../model/index';

//const prisma = new PrismaClient()
const prisma = new PrismaClient({
	errorFormat: 'minimal',
  })

export class VideoInfoRepository {
	result:any;
	async deleteVideo(req: any) {	
		try {
			this.result = await prisma.video_info.update({
				where: { id: parseInt(req.params.id) },
				data:{
					status:"DELETE"
				}

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