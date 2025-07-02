"use client";

import { FunctionComponent, useMemo } from "react";
import { ProductSortTranslations } from "@/app/lib/translations/products";
import { Currency, ProductSort } from "@/app/lib/enums/products";
import { Product } from "@/app/lib/types/products";

type ProductsTableProps = {
  products: Product[];
  onPrev: () => void;
  onNext: () => void;
};

const ProductsTable: FunctionComponent<ProductsTableProps> = ({ products }) => {
  const formatter = useMemo<Record<string, Intl.NumberFormat>>(
    () =>
      Object.values(Currency).reduce(
        (acc: Record<string, Intl.NumberFormat>, currency) => {
          acc[currency] = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
          });
          return acc;
        },
        {}
      ),
    []
  );

  return (
    <div className="flex">
      <table className="table-auto w-full rounded-xl text-sm">
        <thead>
          <tr className="text-left bg-gray-50 font-semibold text-gray-900">
            <th className="p-3">{ProductSortTranslations[ProductSort.NAME]}</th>
            <th className="p-3">
              {ProductSortTranslations[ProductSort.EXPIRATION]}
            </th>
            <th className="p-3">
              {ProductSortTranslations[ProductSort.PRICE]}
            </th>
            <th className="p-3">{Currency.AUD.toUpperCase()}</th>
            <th className="p-3">{Currency.COP.toUpperCase()}</th>
            <th className="p-3">{Currency.CAD.toUpperCase()}</th>
            <th className="p-3">{Currency.EUR.toUpperCase()}</th>
            <th className="p-3">{Currency.KRW.toUpperCase()}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {product.name}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {new Date(product.expiration).toDateString()}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatter[Currency.USD].format(product.price)}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatter[Currency.AUD].format(product[Currency.AUD])}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatter[Currency.COP].format(product[Currency.COP])}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatter[Currency.CAD].format(product[Currency.CAD])}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatter[Currency.EUR].format(product[Currency.EUR])}
              </td>
              <td className="p-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatter[Currency.KRW].format(product[Currency.KRW])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ProductsTable };
