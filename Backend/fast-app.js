import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import authPlugin from "./plugins/auth.js";

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
await app.register(authPlugin)

// // Test Login Route - Returns the JWT
// app.post("/login", async (request, reply) => {
//     // In a real app, you would check req.body.email and req.body.password against a DB
//     const token = app.jwt.sign({
//         id: "usr_123",
//         role: "admin",
//         companyId: "comp_456"
//     });
//     return { token };
// });

// // Test Protected Route - Requires the JWT
// app.get("/dashboard", { preHandler: [app.authenticate] }, async (request, reply) => {
//     // If the token is valid, request.user contains the decoded payload
//     return {
//         message: "You have access!",
//         user: request.user
//     };
// });


app.listen({ port: app.config.PORT }, () => {
    console.log(`server is working at port: ${app.config.PORT}`)
})