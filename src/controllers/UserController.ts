import APICrudControllerAbstract from "../interfaces/APICrudControllerAbstract";
import {Request, Response, NextFunction} from 'express';
import CRUDService from "../services/CRUDService";
import {User} from "../entities/User.entity";
import {formatValidationErrors, sendErrorResponse, sendSuccessResponse} from "../common/functions";
import {updateUserValidation, userValidation} from "../validations/user.validation";
import bcrypt from 'bcrypt'
import config from "../common/config";

class UserController extends APICrudControllerAbstract{
  public static async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody = req.body;
      try {
        const validated = await userValidation.validateAsync(requestBody)
        validated.password = await bcrypt.hash(validated.password, config.saltRounds)
        const user = await CRUDService.createOne<User>(validated, User);
        sendSuccessResponse(res, user)
      } catch (e) {
        sendErrorResponse(res, formatValidationErrors(e))
      }
    } catch (e) {
      next(e)
    }
  }
  public static async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = +req.params.userId;
      const requestBody = req.body;
      try {
        const validated = await updateUserValidation.validateAsync(requestBody)
        if (validated?.password?.length) {
          validated.password = await bcrypt.hash(validated.password, config.saltRounds)
        }
        const user = await CRUDService.updateOne<User>(userId, validated, User);
        sendSuccessResponse(res, user)
      } catch (e) {
        sendErrorResponse(res, formatValidationErrors(e))
      }
    } catch (e) {
      next(e)
    }
  }
  public static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = +req.params.userId;
      await CRUDService.deleteOne<User>(userId, User);
      sendSuccessResponse(res, userId);
    } catch (e) {
      next(e)
    }
  }
  public static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.userId;
      const user = await CRUDService.getOne<User>({where:{id}}, User);
      sendSuccessResponse(res, user);
    } catch (e) {
      next(e)
    }
  }
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await CRUDService.getAll<User>({}, User);
      sendSuccessResponse(res, user);
    } catch (e) {
      next(e)
    }
  }
}

export default UserController
