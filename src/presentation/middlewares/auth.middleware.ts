import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if (!authorization)
            return res.status(401).json({ message: 'No token provided' });
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ message: 'Invalid Bearer token' });
        const token = authorization.split(' ').at(1) || '';
        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(
                token
            );
            if (!payload)
                return res.status(401).json({ message: 'Invalid token' });
            const user = await UserModel.findById(payload.id);
            if (!user)
                return res.status(401).json({ message: 'Invalid token -user' });
            //Validar si el usuario esta activo
            req.body.user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
