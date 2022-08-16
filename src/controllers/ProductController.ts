import APICrudControllerAbstract from "../interfaces/APICrudControllerAbstract";
import {NextFunction, Response} from 'express';
import CRUDService from "../services/CRUDService";
import {Product} from "../entities/Product.entity";
import {formatValidationErrors, sendErrorResponse, sendSuccessResponse} from "../common/functions";
import {productValidation, updateProductValidation} from "../validations/product.validation";
import {existsSync, unlinkSync} from "fs";
import {InjectedRequest} from "../types/injectedRequest";

class ProductController extends APICrudControllerAbstract {
  public static async createOne(req: InjectedRequest, res: Response, next: NextFunction) {
    try {
      const requestBody = req.body;
      try {
        const validated = await productValidation.validateAsync(requestBody)
        validated.image = ProductController.formatImagePath(req.file);
        validated.userId = req.userId;
        const product = await CRUDService.createOne<Product>(validated, Product);
        sendSuccessResponse(res, product)
      } catch (e) {
        sendErrorResponse(res, formatValidationErrors(e))
      }
    } catch (e) {
      next(e)
    }
  }

  public static async updateOne(req: InjectedRequest, res: Response, next: NextFunction) {
    try {
      const productId = +req.params.productId;
      const requestBody = req.body;
      try {
        const validated = await updateProductValidation.validateAsync(requestBody)
        if (req.file) {
          const product = await CRUDService.getOne<Product>({where: {id: productId}}, Product);
          if (existsSync(`uploads/${product.image}`)) {
            await unlinkSync(`uploads/${product.image}`)
          }
          validated.image = ProductController.formatImagePath(req.file);
        }
        const product = await CRUDService.updateOne<Product>(productId, validated, Product);
        sendSuccessResponse(res, product)
      } catch (e) {
        sendErrorResponse(res, formatValidationErrors(e))
      }
    } catch (e) {
      next(e)
    }
  }

  public static async deleteOne(req: InjectedRequest, res: Response, next: NextFunction) {
    try {
      const productId = +req.params.productId;
      const product = await CRUDService.getOne<Product>({where: {id: productId}}, Product);
      if (existsSync(`uploads/${product.image}`)) {
        await unlinkSync(`uploads/${product.image}`)
      }
      await CRUDService.deleteOne<Product>(productId, Product);
      sendSuccessResponse(res, productId);
    } catch (e) {
      next(e)
    }
  }

  public static async getOne(req: InjectedRequest, res: Response, next: NextFunction) {
    try {
      const id = +req.params.productId;
      const product = await CRUDService.getOne<Product>({where: {id, userId: req.userId}}, Product);
      sendSuccessResponse(res, product);
    } catch (e) {
      next(e)
    }
  }

  public static async getAll(req: InjectedRequest, res: Response, next: NextFunction) {
    try {
      const products = await CRUDService.getAll<Product>({userId: req.userId}, Product);
      sendSuccessResponse(res, products);
    } catch (e) {
      next(e)
    }
  }

  private static formatImagePath(file: Express.Multer.File) {
    return `${file.destination}${file.filename}`.replace(
      'uploads',
      ''
    )
  }
}

export default ProductController
