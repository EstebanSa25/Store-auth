import { Validators } from '../../../config/validators';

export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly avaible: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, CreateProductDto?] {
        const { name, avaible, price, description, user, category } = object;
        console.log(object);
        if (!name) return ['name is required'];
        if (!user) return ['user is required'];
        if (!category) return ['category is required'];
        if (!Validators.isMongoID(user)) return ['user is not valid'];
        if (!Validators.isMongoID(category)) return ['category is not valid'];
        return [
            undefined,
            new CreateProductDto(
                name,
                !!avaible,
                price,
                description,
                user,
                category
            ),
        ];
    }
}
