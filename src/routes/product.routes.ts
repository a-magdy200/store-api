import {Router} from "express";
import ProductController from "../controllers/ProductController";
import multer, {diskStorage} from "multer";
const productRoutes = Router()
const upload = multer({ storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    },
  }) })

productRoutes.get('/', ProductController.getAll)
productRoutes.post('/', upload.single('product_image'), ProductController.createOne)
productRoutes.get('/:productId', ProductController.getOne)
productRoutes.patch('/:productId', upload.single('product_image'), ProductController.updateOne)
productRoutes.delete('/:productId', ProductController.deleteOne)
export default productRoutes
