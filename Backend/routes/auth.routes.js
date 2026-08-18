import mongoose from "mongoose";
import UserModel from "../models/User.js";
import OrganizationModel from "../models/Organization.js";
import { hashPassword, comparePassword } from "../utils/hash.js";


const registerSchema = {
    body: {
        type: "object",
        required: ["name", "email", "password", "companyName"],
        properties: {
            name: { type: "string", minLength: 3 },
            // email: { type: "string", pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$" },
            email: { type: "string" },
            password: { type: "string", minLength: 6 },
            companyName: { type: "string", minLength: 3 },
            description: { type: "string", minLength: 3 }
        }
    },
    response: {
        201: {
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                token: { type: "string" },
                user: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" },
                        companyId: { type: "string" },
                    },
                    company: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            companyName: { type: "string" },
                        }
                    }
                }
            }
        }
    }
}


const loginSchema = {
    body: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                token: { type: "string" },
                user: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" },
                        companyId: { type: "string" },
                    },
                    company: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            companyName: { type: "string" },
                        }
                    }
                },
            },
        },
    },
};
const authRoutes = async (fastify, options) => {
    fastify.post("/register", { schema: registerSchema }, async (request, reply) => {
        try {
            const { name, email, password, companyName, description } = request.body

            if (!name || !email || !password || !companyName) {
                return reply.status(400).send({ message: "All fields are required" })

            }
            const existingUser = await UserModel.findOne({ email: email })
            if (existingUser) {
                return reply.status(400).send({ message: "User already exists with this email" })
            }
            const userId = new mongoose.Types.ObjectId()
            const organization = await OrganizationModel.create({
                name: companyName,
                description: description || "",
                createdBy: userId,


            })
            const hashedPassword = await hashPassword(password)
            const user = await UserModel.create({
                name: name,
                email: email,
                password: hashedPassword,
                role: "admin",
                organization: organization._id
            })
            // organization.createdBy = user._id
            // await organization.save()

            const token = fastify.jwt.sign({
                id: user._id.toString(),
                role: user.role,
                organization: organization._id.toString()
            })
            reply.header("Set-Cookie", `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`)
            return reply.status(200).send({
                message: "Organization and AdminUser account created successfully", token, user: {
                    name: user.name,
                    email: user.email,
                    id: user._id.toString(),
                    role: user.role,
                    organization: organization._id.toString(),
                }
            })

        } catch (error) {
            console.log(error)
            return reply.status(500).send({ message: "Internal server error" })

        }
    })

}

export default authRoutes
