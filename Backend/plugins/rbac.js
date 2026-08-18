import fp from "fastify-plugin";

/**
 * RBAC and Multi-Tenant Scoping Plugin
 *
 * Provides:
 * 1. fastify.requireRole(...roles): Pre-handler hook to enforce role permissions
 * 2. fastify.scopeToCompany(request, filter): Merges tenant organization ID into Mongoose query filters
 * 3. fastify.scopeToUser(request, filter): Merges tenant organization ID + user ID for user-specific views
 */
export default fp(async (fastify, opts) => {
    /**
     * Role-Based Access Control (RBAC) Pre-Handler Guard
     *
     * Usage in route definition:
     * preHandler: [fastify.authenticate, fastify.requireRole("admin")]
     * or multiple roles:
     * preHandler: [fastify.authenticate, fastify.requireRole(["admin", "manager"])]
     */
    fastify.decorate("requireRole", (allowedRoles) => {
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        return async (request, reply) => {
            if (!request.user) {
                return reply.code(401).send({
                    success: false,
                    message: "Authentication required",
                });
            }

            if (roles.length > 0 && !roles.includes(request.user.role)) {
                return reply.code(403).send({
                    success: false,
                    message: `Forbidden: Requires role [${roles.join(", ")}]. Current role: '${request.user.role}'`,
                });
            }
        };
    });

    /**
     * Multi-Tenant Scope Helper
     *
     * Injects the tenant organization ID from request.user into the Mongoose query filter.
     * Prevents cross-company data leakage across all controllers.
     *
     * Usage in controllers:
     * const filter = fastify.scopeToCompany(request, { status: "in use" });
     * const products = await ProductModel.find(filter);
     */
    fastify.decorate("scopeToCompany", (request, filter = {}) => {
        if (!request.user || !request.user.companyId) {
            throw new Error("Cannot scope to company: request.user.companyId is missing. Ensure fastify.authenticate was run.");
        }

        return {
            ...filter,
            organization: request.user.companyId,
        };
    });

    /**
     * User-Scoped Filter Helper (User View)
     *
     * Injects both the organization ID AND the user ID (createdBy / changedBy)
     * for strict user-level view separation.
     *
     * Usage:
     * const filter = fastify.scopeToUser(request, { status: "in use" });
     */
    fastify.decorate("scopeToUser", (request, filter = {}, userField = "createdBy") => {
        if (!request.user || !request.user.id || !request.user.companyId) {
            throw new Error("Cannot scope to user: request.user is missing id or companyId.");
        }

        return {
            ...filter,
            organization: request.user.companyId,
            [userField]: request.user.id,
        };
    });
});
