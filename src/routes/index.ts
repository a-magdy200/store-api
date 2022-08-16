import {Router} from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";
const routes = Router()
routes.use('/', authRoutes)
routes.use('/users', isAuthenticated, isAdmin, userRoutes)
routes.use('/products', isAuthenticated, productRoutes)
export default routes
