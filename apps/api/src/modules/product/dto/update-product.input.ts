import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsUrl, Length, Min } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @Length(3, 100)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @Min(1)
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @Length(3, 255)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  image?: string;
}
