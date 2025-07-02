import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';
import { DateUtils } from 'src/common/utils/date-utils';
import { DEFAULT_PAGE_SIZE } from 'src/common/constants/common';
import { PaginatedResponse } from 'src/common/types/common';

@Injectable()
export class GetProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async list(
    page: number,
    search?: string,
    sort?: string,
  ): Promise<PaginatedResponse<Product>> {
    const filters: RootFilterQuery<Product> = {};

    if (search) {
      if (DateUtils.isValid(search)) {
        filters.expiration = { $eq: search };
      } else if (Number(search)) {
        filters.price = { $eq: Number(search) };
      } else {
        filters.name = { $regex: `.*${search}.*`, $options: 'isu' };
      }
    }

    const [data, total] = await Promise.all([
      this.productModel
        .find(filters)
        .sort(sort ? { [sort]: 1 } : {})
        .skip(DEFAULT_PAGE_SIZE * (page - 1))
        .limit(DEFAULT_PAGE_SIZE)
        .exec(),
      this.productModel.countDocuments(filters),
    ]);

    return { data, total };
  }
}
