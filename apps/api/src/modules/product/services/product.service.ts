import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({ order: { createdAt: 'ASC'} });
    if (!products) {
      throw new InternalServerErrorException();
    }
    return products;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create({
      ...input,
      createdAt: new Date().toISOString(),
    });
    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, input: UpdateProductInput): Promise<void> {
    const updateResult = await this.productRepository.update({ id }, input);
    if (updateResult.affected && updateResult.affected <= 0) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.productRepository.delete({ id });
    if (deleteResult.affected && deleteResult.affected <= 0) {
      throw new InternalServerErrorException();
    }
  }
}
