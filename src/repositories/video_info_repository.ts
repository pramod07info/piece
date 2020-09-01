
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class VideoInfoRepository {
	async post(req: any) {
		const result = await prisma.piece.create({
            data: {
				...req.body,
			},
		})
		return result
	}

	async get() {
		const result = await prisma.video_info.findMany({
			where: {
				status: true
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