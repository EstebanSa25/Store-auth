import { Request, Response } from 'express';
import { CustomError, RegisterUserDto, LoginUserDto } from '../../domain';
import { AuthService } from '../services/auth.services';

export class AuthController {
    constructor(public readonly authService: AuthService) {}
    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
    registerUser = async (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        this.authService
            .registerUser(registerDto!)
            .then((user) => res.json({ user }))
            .catch((error) => this.handleError(error, res));
    };
    loginUser = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        this.authService
            .loginUser(loginUserDto!)
            .then((user) => res.json({ user }))
            .catch((error) => this.handleError(error, res));
    };
    validateEmail = async (req: Request, res: Response) => {
        res.json({ message: 'RegisterUser' });
    };
}