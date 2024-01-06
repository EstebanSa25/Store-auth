import { CategoryModel } from '../../data';
import { PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { CustomError } from '../../domain/errors/custom.error';
export class CategorySevice {
    constructor() {}
    async createCategory(
        createCategoryDto: CreateCategoryDto,
        user: UserEntity
    ) {
        const categoryExists = await CategoryModel.findOne({
            name: createCategoryDto.name,
        });
        if (categoryExists)
            throw CustomError.badRequest('Category already exists');
        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            });
            await category.save();
            return {
                id: category.id,
                name: category.name,
                available: category.available,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    async getCategories(paginationDto: PaginationDto) {
        //[{},{},{},{}]
        const { page, limit } = paginationDto;
        try {
            const categories = (
                await CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ).map((category) => ({
                id: category.id,
                name: category.name,
                available: category.available,
            }));
            return categories;
        } catch (error) {
            return CustomError.internalServer(`${error}`);
        }
    }
}
