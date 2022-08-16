import {sendErrorResponse} from "../common/functions";
import {NextFunction, Response} from 'express';
import {UserTypeEnum} from "../enums/userType.enum";
import {InjectedRequest} from "../types/injectedRequest";

const isAdmin = async (req: InjectedRequest, res: Response, next: NextFunction) => {
  try {
    const {userType} = req;
    if (userType === UserTypeEnum.ADMIN) {
      next()
    } else {
      sendErrorResponse(res, ['Not Authorized'])
    }
  } catch (e) {
    sendErrorResponse(res, ['An error has occurred'])
  }
}

export default isAdmin
