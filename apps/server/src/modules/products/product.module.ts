import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { CreateProductService } from './services/products/create-product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { GetProductService } from './services/products/get-product.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CommonModule,
  ],
  controllers: [ProductsController],
  providers: [CreateProductService, GetProductService],
})
export class ProductModule {}
