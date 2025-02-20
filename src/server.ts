import {fastify} from "fastify"
import {fastifyCors} from "@fastify/cors"
import {validatorCompiler, serializerCompiler} from "fastify-type-provider-zod"

const app = fastify();

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.post("/api/subscriptions", {
    schema: {

    }
}, () => {
    return "Hello World"
})

app.listen({port: 3333}).then(() => {
    console.log("HTTP Server running!");
})

//criar Glob de rotas pro fastify