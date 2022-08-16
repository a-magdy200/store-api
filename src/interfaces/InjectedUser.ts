import {UserTypeEnum} from "../enums/userType.enum";

export interface InjectedUser {
  userId: number;
  userType: UserTypeEnum
}
