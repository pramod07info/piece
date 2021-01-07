
import { PrismaClient } from '@prisma/client'
import { IResponse } from '../model/index';
import { group } from 'console';
import { mainModule } from 'process';
//const prisma = new PrismaClient()
import { Approval } from '../model/approval'; 

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
	mymap:Map<string, number> | undefined
	async post(req: any) {	
		//console.log(req,"kkkkkkkkk");
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
		} finally {
			async () => await prisma.$disconnect();
		}

	}

	async createPieceAndVideo(req: any) {

		try {
			const result = await prisma.piece.create({
				data: req.data
			})
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Data created successfully",
				data: result,
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect();
		}

	}
	async updatePiece(req: any) {
		try {
			const result = await prisma.piece.update({
				where: {
					id: req.body.id
				},
				data: {
					title: req.body.title,
					status: req.body.status
				}
			})
			
			if(req.body.status == 'PUBLISH'){
				Approval.approve(req.body.id);
			}
			
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Data updated successfully",
				data: result,
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect()
		}

	}

	async get(req: any) {
		try {
			const result = await prisma.piece.findMany({
				skip: req.body.skip,
				take: req.body.take,
				where: {
					OR: req.body.status
				},
				select: {
					id: true,
					user_id: true,
					status: true,
					title: true,
					video_info: {
						where: {
							OR: req.body.status
						},
						select: {
							id: true,
							video_url: true,
							video_id: true,
							status: true,
							sentences: {
								select: {
									id: true,
									sentence: true
								}
							}
						}
					}
				},
				orderBy: {
					id: 'desc'
				}
			})
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Fetch all data successfully",
				data: result,
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect();
		}
	}
	async getPieceById(req: any) {
		try {
			const result = await prisma.piece.findUnique({
				where: {
					id: parseInt(req.params.id)
				},
				select: {
					id: true,
					user_id: true,
					status: true,
					title: true,
					video_info: {
						where: {
							status: req.params.status
						},
						select: {
							id: true,
							video_url: true,
							video_id: true,
							status: true,
							sentences: {
								select: {
									id: true,
									sentence: true
								}
							}
						}
					},
					source_piece: {
						select: {
							id: true,
							name: true,
							url: true
						}
					}
				}
			})
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Fetch single data successfully",
				data: result,
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect();
		}
	}
	async getPieceByUserId(req: any) {
		try {
			const result = await prisma.piece.findMany({
				skip: req.body.skip,
				take: req.body.take,
				where: {
					OR: req.body.status,
					AND: {
						user_id: req.body.user_id,
					}
				},
				select: {
					id: true,
					user_id: true,
					status: true,
					title: true,
					video_info: {
						select: {
							id: true,
							video_url: true,
							video_id: true,
							status: true,
							sentences: {
								select: {
									id: true,
									sentence: true
								}
							}
						}
					}
				},
				orderBy: {
					id: 'desc'
				}
			})
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Fetch user data successfully",
				data: result,
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect()
		}
	}
	async deletePiece(req: any) {
		try {
			const result = await prisma.piece.update({
				where: {
					id: parseInt(req.params.id)
				},
				data: {
					status: "DELETE",
				}
			})
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Data deleted successfully",
				data: result,
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect()
		}
	}
	async getAllCount(req: any) {
		try {
			const Allresult = await prisma.piece.count()
			const draftResult = await prisma.piece.count({
				where: {
					status: "DRAFT"
				}
			})
			const publishedResult = await prisma.piece.count({
				where: {
					status: "PUBLISH"
				}
			})
			const deletedResult = await prisma.piece.count({
				where: {
					status: "DELETE"
				}
			})

			const iResponse: IResponse = {
				statusCode: "200",
				message: "Fetch count successfully",
				data: {
					"All": Allresult,
					"Draft": draftResult,
					"Published": publishedResult,
					"Deleted": deletedResult
				},
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect()
		}
	}
	async getCountByUserId(req: any) {
		try {
			console.log("user id: ",req.body.user_id);
			const Allresult = await prisma.piece.count({
				where: {
					user_id: req.body.user_id
				}
			})
			const draftResult = await prisma.piece.count({
				where: {
					status: "DRAFT",
					user_id: req.body.user_id
				}
			})
			const publishedResult = await prisma.piece.count({
				where: {
					status: "PUBLISH",
					user_id: req.body.user_id
				}
			})
			const deletedResult = await prisma.piece.count({
				where: {
					status: "DELETE",
					user_id: req.body.user_id
				}
			})

			const iResponse: IResponse = {
				statusCode: "200",
				message: "Fetch count successfully",
				data: {
					"All": Allresult,
					"Draft": draftResult,
					"Published": publishedResult,
					"Deleted": deletedResult
				},
				error: ""
			}
			return iResponse;
		} catch (error) {
			console.error(error);
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Something went worng",
				data: "",
				error: error
			}
			return iResponse;
		} finally {
			async () => await prisma.$disconnect()
		}
	}

	private callApproval(){

	}

	private callApproval(){

	}
}