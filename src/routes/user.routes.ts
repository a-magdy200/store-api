import {Router} from "express";
import UserController from "../controllers/UserController";
const userRoutes = Router()
userRoutes.get('/', UserController.getAll)
userRoutes.post('/', UserController.createOne)
userRoutes.get('/:userId', UserController.getOne)
userRoutes.patch('/:userId', UserController.updateOne)
userRoutes.delete('/:userId', UserController.deleteOne)
export default userRoutes
