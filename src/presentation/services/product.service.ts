import { ProductModel } from '../../data';
import { CreateProductDto, PaginationDto } from '../../domain';
import { CustomError } from '../../domain/errors/custom.error';
export class ProductSevice {
    constructor() {}
    async createProduct(createProductDto: CreateProductDto) {
        const ProductExists = await ProductModel.findOne({
            name: createProductDto.name,
        });
        if (ProductExists)
            throw CustomError.badRequest('Product already exists');
        try {
            const product = new ProductModel(createProductDto);
            await product.save();
            return product;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    async getProducts(paginationDto: PaginationDto) {
        //[{},{},{},{}]
        const { page, limit } = paginationDto;
        try {
            const products = await ProductModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('user')
                .populate('category');
            return products;
        } catch (error) {
            return CustomError.internalServer(`${error}`);
        }
    }
}
