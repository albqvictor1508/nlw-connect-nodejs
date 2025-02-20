import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../utils/env";
import { acessInviteLink } from "../functions/access-invite-link";
import { redis } from "../redis/client";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/api/invites/:subscriberId",
		{
			schema: {
				summary: "Invite someone to the event",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					201: z.object({
						subscriberId: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { subscriberId } = request.params;

			await acessInviteLink({ subscriberId });
			console.log(await redis.hgetall("referral:access-count"));

			const redirectUrl = new URL(env.WEB_URL);

			redirectUrl.searchParams.set("referrer", subscriberId);

			//301: redirect permanente, se é permanente, o navegador faz cache, oque em casos especificos n é legal
			//302: redirect temporário, não vai cachear, vai sempre verificar no backend se é válido

			return reply.redirect(redirectUrl.toString(), 302);
		},
	);
};
