import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from '../prisma/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './product-images';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    return this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getProducts() {
    const products = await this.prismaService.product.findMany();
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  async getProduct(productId: number) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: { id: productId },
      });

      return { ...product, imageExists: await this.imageExists(productId) };
    } catch {
      throw new NotFoundException('Product not found with id ' + productId);
    }
  }

  async update(productId: number, data: Prisma.ProductUpdateInput) {
    await this.prismaService.product.update({
      where: { id: productId },
      data,
    });
  }

  private async imageExists(productId: number) {
    try {
      // it throws an error when file does not exist in the directory
      await fs.access(`${PRODUCT_IMAGES}/${productId}.jpeg`, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }
}
