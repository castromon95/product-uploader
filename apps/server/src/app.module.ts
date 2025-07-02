import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
