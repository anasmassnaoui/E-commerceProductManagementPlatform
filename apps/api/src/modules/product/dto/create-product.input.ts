import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsUrl, Length, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @Length(3, 100)
  name: string;

  @Field()
  @Min(1)
  price: number;

  @Field()
  @Length(3, 255)
  description: string;

  @Field()
  @IsUrl()
  image: string;
}
