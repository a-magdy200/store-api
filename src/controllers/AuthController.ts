import {NextFunction, Request, Response} from "express";
import {userValidation} from "../validations/user.validation";
import config from "../common/config";
import CRUDService from "../services/CRUDService";
import {User} from "../entities/User.entity";
import {formatValidationErrors, sendErrorResponse, sendSuccessResponse} from "../common/functions";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody = req.body;
      try {
        const validated = await userValidation.validateAsync(requestBody)
        const existingUser = await CRUDService.getOne({where: {email: validated.email}}, User);
        if (existingUser) {
          const existingUser = await CRUDService.getOne({where: {email: validated.email}, select: {
            password: true,
            name: true,
            id: true,
            type: true,
          }}, User);
          const isPasswordMatches = await bcrypt.compare(validated.password, existingUser.password)
          if (isPasswordMatches) {
            const response = await AuthController.generateAuthResponse(existingUser)
            sendSuccessResponse(res, response)
          } else {
            sendErrorResponse(res, ["Invalid credentials"])
          }
        } else {
          sendErrorResponse(res, ["Invalid credentials"])
        }
      } catch (e) {
        sendErrorResponse(res, formatValidationErrors(e))
      }
    } catch (e) {
      next(e)
    }
  }
  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody = req.body;
      try {
        const validated = await userValidation.validateAsync(requestBody)
        const existingUser = await CRUDService.getOne({where: {email: validated.email}}, User);
        if (existingUser) {
          sendErrorResponse(res, ["Email already exists"])
        } else {
          validated.password = await bcrypt.hash(validated.password, config.saltRounds)
          const user = await CRUDService.createOne<User>(validated, User);
          const response = await AuthController.generateAuthResponse(user);
          sendSuccessResponse(res, response)
        }
      } catch (e) {
        sendErrorResponse(res, formatValidationErrors(e))
      }
    } catch (e) {
      next(e)
    }
  }
  private static async generateAuthResponse(user: User) {
    const {id, name, type} = user;
    const userData = {
      id, name, type
    }
    const accessToken = await jwt.sign(userData, config.secret);
    return {
      userData,
      accessToken
    }
  }
}
