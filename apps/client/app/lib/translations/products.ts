import { ProductSort } from "../enums/products";

const ProductSortTranslations: Record<string, string> = {
  [ProductSort.NAME]: "Name",
  [ProductSort.PRICE]: "Price",
  [ProductSort.EXPIRATION]: "Expiration",
};

export { ProductSortTranslations };
