import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency } from 'src/common/enums/currencies';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  expiration: Date;

  @Prop({ required: true })
  [Currency.AUD]: number;

  @Prop({ required: true })
  [Currency.COP]: number;

  @Prop({ required: true })
  [Currency.CAD]: number;

  @Prop({ required: true })
  [Currency.EUR]: number;

  @Prop({ required: true })
  [Currency.KRW]: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
