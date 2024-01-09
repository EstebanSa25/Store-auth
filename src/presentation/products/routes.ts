import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './controller';
import { ProductSevice } from '../services/product.service';

export class ProductRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        const productService = new ProductSevice();
        const controller = new ProductController(productService);
        router.get('/', controller.getProducts);
        router.post(
            '/',
            [AuthMiddleware.validateJWT],
            controller.createProducts
        );

        return router;
    }
}
