import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    app.post("/api/subscriptions", {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
            response: {
                201: z.object({
                    msg: z.string()
                })
            }
        }
    }, (request, reply) => {
        reply.status(201).send({msg: "user created!"});
    })
}