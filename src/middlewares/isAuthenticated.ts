import {sendErrorResponse} from "../common/functions";
import {Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import config from "../common/config";
import {InjectedRequest} from "../types/injectedRequest";

const isAuthenticated = async (req: InjectedRequest, res: Response, next: NextFunction) => {
  try {
    const {headers} = req;
    const token = headers.authorization;
    if (token) {
      try {
        const decoded = await jwt.verify(token.replace("Bearer ", ""), config.secret)
        req.userId = decoded.id
        req.userType = decoded.type
        next()
      } catch (e) {
        sendErrorResponse(res, ['Not Authorized'])
      }
    } else {
      sendErrorResponse(res, ['Not Authorized'])
    }
  } catch (e) {
    sendErrorResponse(res, ['An error has occurred'])
  }
}

export default isAuthenticated
