export class PaginationDto {
    private constructor(
        public readonly page: number,
        public readonly limit: number
    ) {}
    static create(
        page: number = 1,
        limit: number = 10
    ): [string?, PaginationDto?] {
        if (isNaN(page) || isNaN(limit)) {
            return ['Invalid pagination params'];
        }
        if (page <= 0 || limit <= 0) {
            return ['Invalid pagination params'];
        }
        return [undefined, new PaginationDto(page, limit)];
    }
}
