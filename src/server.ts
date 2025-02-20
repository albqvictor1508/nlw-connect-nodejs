import {fastify} from "fastify"
import {fastifyCors} from "@fastify/cors"
import {validatorCompiler, serializerCompiler, ZodTypeProvider} from "fastify-type-provider-zod"
import z from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

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

app.listen({port: 3333}).then(() => {
    console.log("HTTP Server running!");
})

//criar Glob de rotas pro fastify