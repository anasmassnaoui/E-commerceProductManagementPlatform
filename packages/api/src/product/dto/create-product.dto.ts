import { Transform } from "class-transformer";
import { IsUrl, Length, Min } from "class-validator";

export class CreateProductDto {
    @Length(3, 100)
    name: string;

    @Min(1)
    @Transform(({ value }) => Number(value))
    price: number;

    @Length(3, 255)
    description: string;

    @IsUrl()
    image: string;
}
