import { Router } from 'express';
import { CateogryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategorySevice } from '../services/category.service';

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        const service = new CategorySevice();
        const controller = new CateogryController(service);
        router.get('/', controller.getCategories);
        router.post(
            '/',
            [AuthMiddleware.validateJWT],
            controller.createCategory
        );

        return router;
    }
}
