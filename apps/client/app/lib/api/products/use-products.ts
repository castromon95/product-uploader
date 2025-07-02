"use client";

import { fetcher } from "@/app/lib/utilities/fetcher";
import useSWR from "swr";
import { Product } from "../../types/products";
import { UseHook } from "../../types/common";

interface UseResources extends UseHook {
  products: Product[];
  total: number;
  mutate: KeyedMutator<ProductssResponse>;
}

type ProductssResponse = { data: Product[]; total: number };

const productsFetcher = fetcher<ProductssResponse>();

const productsKey = (page: number, search: string, sort: string): string =>
  `/products?${new URLSearchParams({
    page: String(page),
    search,
    sort,
  }).toString()}`;

const useProducts = (
  page: number,
  search: string,
  sort: string
): UseResources => {
  const { data, error, isLoading, mutate } = useSWR<ProductssResponse>(
    productsKey(page, search, sort),
    productsFetcher
  );

  return {
    products: data?.data || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    mutate,
  };
};

export { useProducts };
