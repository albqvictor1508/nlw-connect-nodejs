import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { env } from "./utils/env";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite.clicks-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "nlw connect",
			version: "0.0.1",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);

app.listen({ port: env.API_PORT }).then(() => {
	console.log("HTTP Server running!");
});

//criar Glob de rotas pro fastify
