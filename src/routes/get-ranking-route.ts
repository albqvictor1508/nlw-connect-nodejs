import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getRanking } from "../functions/get-ranking";

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/api/ranking",
		{
			schema: {
				summary: "Get ranking",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							name: z.string(),
							score: z.number()
						})
					)
				},
			},
		},
		async () => {
			const {ranking} = await getRanking();

			return ranking;
		},
	);
};
