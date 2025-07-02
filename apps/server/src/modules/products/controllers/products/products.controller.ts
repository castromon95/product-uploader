import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductService } from '../../services/products/create-product.service';
import { GetProductService } from '../../services/products/get-product.service';
import { Product } from '../../schemas/product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PaginatedResponse } from 'src/common/types/common';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getProductService: GetProductService,
  ) {}

  @Get()
  public async getProducts(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ): Promise<PaginatedResponse<Product>> {
    return this.getProductService.list(page || 1, search, sort);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('products', {
      storage: diskStorage({ destination: '/tmp' }),
    }),
  )
  public async batchCreate(
    @UploadedFile() products: Express.Multer.File,
  ): Promise<void> {
    await this.createProductService.createBatch(products.path);
  }
}
