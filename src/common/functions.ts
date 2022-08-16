import {Response} from "express";
import { ValidationError, ValidationErrorItem } from 'joi'

export const formatValidationErrors = (error: ValidationError): string[] => {
  return error?.details
    ? error.details.map((e: ValidationErrorItem) => e.message)
    : [error.message]
}

export const sendSuccessResponse = (res: Response, data: any) => {
  const response = {
    success: true,
    data
  }
  res.status(200).send(response);
}
export const sendErrorResponse = (res: Response, errors: string[]) => {
  const response = {
    success: false,
    errors
  }
  res.status(400).send(response);
}
