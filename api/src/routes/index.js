const { Router } = require("express");
const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const salesRouter = require("./salesRouter");
const wishlistRouter = require("./wishlistRouter");
const saledetailsRouter = require("./saleDetailsRouter");
const categoriesRouter = require("./categoriesRouter");
const paymentsRouter = require("./paymentsRouter");
const transactionsRouter = require("./transactionsRouter");
const reviewsRouter = require("./reviewsRouter");
const authRouter = require("./authRouter");
const mercadopagoRouter = require("./mercadopagoRouter")
const nodemailerRouter = require("./nodemailerRouter")
// const { licenseRouter } = require("./licenseRouter");
// const { platformRouter } = require("./platformRouter");
const carritoRouter = require("./carritoRouter")


const mainRouter = Router();

mainRouter.use("/users", usersRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sales", salesRouter);
mainRouter.use("/wishlist", wishlistRouter);
mainRouter.use("/saledetails", saledetailsRouter);
mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/payments", paymentsRouter);
mainRouter.use("/transactions", transactionsRouter);
mainRouter.use("/reviews", reviewsRouter);
mainRouter.use("/auth", authRouter)
mainRouter.use("/mercadopago", mercadopagoRouter)

mainRouter.use("/nodemailer", nodemailerRouter)
mainRouter.use("/carrito", carritoRouter)


module.exports = mainRouter;
