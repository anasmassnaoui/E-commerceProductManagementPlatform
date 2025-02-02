import { Transform } from "class-transformer";
import { IsOptional, IsUrl, Length, Min } from "class-validator";

export class UpdateProductDto {
    @Length(3, 100)
    @IsOptional()
    name?: string;

    @Min(1)
    @Transform(({ value }) => Number(value), {})
    @IsOptional()
    price?: number;

    @Length(3, 255)
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    image?: string;
}
