import {NextFunction, Request, Response} from "express";

abstract class BaseAPICrudController {
  public static async createOne(req: Request, res: Response, next: NextFunction) {}
  public static async deleteOne(req: Request, res: Response, next: NextFunction) {}
  public static async getAll(req: Request, res: Response, next: NextFunction) {}
  public static async getOne(req: Request, res: Response, next: NextFunction){}
  public static async updateOne(req: Request, res: Response, next: NextFunction) {}
}
export default BaseAPICrudController;
