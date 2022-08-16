import {Request} from "express";
import {InjectedUser} from "../interfaces/InjectedUser";

export type InjectedRequest = Request & InjectedUser
