import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from 'src/modules/products/schemas/product.schema';
import { ReadCSVService } from '../../../common/services/csv/read-csv.service';
import { FetchCurrenciesService } from 'src/modules/common/services/currencies/fetch-currencies.service';
import { Currency } from 'src/common/enums/currencies';
import { Currencies } from 'src/common/types/currencies';
import { DateUtils } from 'src/common/utils/date-utils';

class CSVProduct {
  name?: string;
  price: string;
  expiration?: string;
}

@Injectable()
export class CreateProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly readCSVService: ReadCSVService,
    private readonly fetchCurrenciesService: FetchCurrenciesService,
  ) {}

  public async createBatch(csvPath: string): Promise<void> {
    const [currencies, chunks] = await Promise.all([
      this.fetchCurrenciesService.fetch(Currency.USD),
      this.readCSVService.chunk<CSVProduct>(
        csvPath,
        CSVProduct,
        Number(process.env.CHUNK_SIZE || 50000),
      ),
    ]);

    await Promise.all(chunks.map((chunk) => this.bulkSave(chunk, currencies)));
  }

  private async bulkSave(
    csvProducts: CSVProduct[],
    currencies: Currencies,
  ): Promise<void> {
    await this.productModel.bulkSave(
      csvProducts.reduce((acc: ProductDocument[], csvProduct) => {
        const product = this.csvToDocument(csvProduct, currencies);

        if (product) {
          acc.push(product);
        }

        return acc;
      }, []),
    );
  }

  private csvToDocument(
    csvProduct: CSVProduct,
    currencies: Currencies,
  ): ProductDocument | null {
    const { price: csvPrice, expiration, name } = csvProduct;
    const price = Number(csvPrice.substring(1)) || 0;

    if (!expiration || !DateUtils.isValid(expiration) || !name) {
      return null;
    }

    return new this.productModel({
      name,
      price,
      expiration: expiration,
      [Currency.AUD]: currencies[Currency.AUD] * price,
      [Currency.COP]: currencies[Currency.COP] * price,
      [Currency.CAD]: currencies[Currency.CAD] * price,
      [Currency.EUR]: currencies[Currency.EUR] * price,
      [Currency.KRW]: currencies[Currency.KRW] * price,
    });
  }
}
