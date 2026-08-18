import mongoose from "mongoose";
import fp from "fastify-plugin";
// import UserModel from "../models/User.js";
// import OrganizationModel from "../models/Organization.js";
// import BranchModel from "../models/Branch.js";
// import ProductModel from "../models/Product.js";
// import StockMovementModel from "../models/StockMovement.js";


export default fp(async (fastify, options) => {

  fastify.decorate("db",)
  try {
    const database = await mongoose
      .connect(fastify.config.MONGODB_URI, { dbName: "ims" })
    fastify.log.info(`database connected with ${database.connection.host}`);
    // used for creating collections on atlas
    // await Promise.all([
    //   OrganizationModel.createCollection(),
    //   UserModel.createCollection(),
    //   BranchModel.createCollection(),
    //   ProductModel.createCollection(),
    //   StockMovementModel.createCollection(),
    // ]);
    // fastify.log.info("MongoDB collections initialized on Atlas");

    fastify.addHook('onClose', async () => {
      await mongoose.disconnect();
      fastify.log.info('database disconnected');
    })
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
});

