import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { subscribeToEvent } from "../functions/subscribe-to-event";
import { email } from "envalid";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/api/subscriptions",
		{
			schema: {
				summary: "subscribers someone to the event",
				tags: ["subscription"],
				description: "msr msr msr",
				body: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				response: {
					201: z.object({
						subscriberId: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, email } = request.body;

			const { subscriberId } = await subscribeToEvent({ name, email });

			if (!subscriberId) {
				throw new Error("Falha na criação do user no banco");
			}

			return reply.status(201).send({ subscriberId });
		},
	);
};
