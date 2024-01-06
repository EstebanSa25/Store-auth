export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, CreateCategoryDto?] {
        const { name, available = false } = object;
        let availableBoolean = available;
        if (!name) {
            return ['name is required'];
        }
        if (typeof available !== 'boolean') {
            switch (available.toLowerCase()) {
                case 'true':
                    availableBoolean = true;
                    break;
                case 'false':
                    availableBoolean = false;
                    break;
                default:
                    return ['available must be a boolean'];
            }
        }
        return [undefined, new CreateCategoryDto(name, availableBoolean)];
    }
}
