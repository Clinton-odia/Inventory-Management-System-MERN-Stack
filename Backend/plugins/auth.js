import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(async (fastify, opts) => {
    await fastify.register(fastifyJwt, {
        secret: fastify.config.SECRET_KEY || process.env.SECRET_KEY
    });

    fastify.decorate("authenticate", async (request, reply) => {
        try {
            // Validates the Authorization header and decodes the token.
            // The decoded payload { id, role, companyId } is attached to request.user
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send(err);
        }
    });

    // // RBAC decorator: checks if request.user has the required role
    // fastify.decorate("authorize", (allowedRoles = []) => {
    //     const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    //     return async (request, reply) => {
    //         if (!request.user) {
    //             return reply.code(401).send({ message: "Unauthorized" });
    //         }
    //         if (roles.length > 0 && !roles.includes(request.user.role)) {
    //             return reply.code(403).send({ message: "Forbidden: Insufficient role permissions" });
    //         }
    //     };
    // });
});