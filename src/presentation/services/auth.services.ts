import { bcryptAdapter } from '../../config';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';
export class AuthService {
    constructor() {}
    public async registerUser(registerUserDto: RegisterUserDto) {
        const existsUser = await UserModel.findOne({
            email: registerUserDto.email,
        });
        if (existsUser) throw CustomError.badRequest('User already exists');
        try {
            const user = new UserModel(registerUserDto);
            //ENCRYPT PASSWORD
            user.password = bcryptAdapter.hash(registerUserDto.password);
            const newUser = await user.save();
            const userEntity = UserEntity.fromObject(newUser);
            const { password, ...rest } = userEntity;
            return { ...rest, token: 'ABC' };
        } catch (error) {
            throw CustomError.InternalServer(`${error}`);
        }
        return 'todo ok';
    }
    public async loginUser(loginUserDto: LoginUserDto) {
        //FindOne
        const existsUser = await UserModel.findOne({
            email: loginUserDto.email,
        });

        //isMatch... bcryp...compare(122344)
        if (!existsUser) throw CustomError.badRequest('User not exists');
        const isMatch = bcryptAdapter.compare(
            loginUserDto.password,
            existsUser.password
        );
        if (!isMatch)
            throw CustomError.badRequest('Password or user is incorrect');
        const userEntity = UserEntity.fromObject(existsUser);
        const { password, ...rest } = userEntity;
        const token = await JwtAdapter.generateToken({ id: userEntity.id });
        if (!token) throw CustomError.InternalServer('Error generating token');
        return { ...rest, token };
    }
}
