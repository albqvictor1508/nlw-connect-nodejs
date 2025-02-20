import {fastify} from "fastify"
import {fastifyCors} from "@fastify/cors"
import {validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform} from "fastify-type-provider-zod"
import z from "zod";
import {fastifySwagger} from "@fastify/swagger"
import {fastifySwaggerUi} from "@fastify/swagger-ui"
import { subscribeToEventRoute } from "./routes/subscribe-to-event";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "nlw connect",
            version: "0.0.1"
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
})

app.register(subscribeToEventRoute)

app.listen({port: 3333}).then(() => {
    console.log("HTTP Server running!");
})

//criar Glob de rotas pro fastify