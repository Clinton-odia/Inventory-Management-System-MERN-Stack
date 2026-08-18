import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
const app = Fastify({
    logger: true
});

const Schema = {
    type: "object",
    required: ["PORT", "MONGODB_URI", "SECRET_KEY"],
    properties: {
        PORT: {
            type: "number",
            default: 3000
        },
        MONGODB_URI: {
            type: "string",

        },
        SECRET_KEY: {
            type: "string",
        }
    }

}
const options = {
    confKey: 'config',
    schema: Schema,
    dotenv: true,
    data: process.env
}

await app.register(fastifyEnv, options)

app.listen({ port: app.config.PORT }, () => {
    console.log(`server is working at port: ${app.config.PORT}`)
})