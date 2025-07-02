"use client";

import { FunctionComponent, useState } from "react";
import { ProductsTableSearch } from "./products-table-search";
import { ProductsTable } from "./products-table";
import { useProducts } from "@/app/lib/api/products/use-products";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import clsx from "clsx";
import { DEFAULT_PAGE_SIZE } from "@/app/lib/constants/common";

const Products: FunctionComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const { products, total } = useProducts(page, search, sort);

  const onSort = (sort: string) => {
    setPage(1);
    setSort((prev) => (sort === prev ? "" : sort));
  };

  const onSearch = (search: string) => {
    setPage(1);
    setSearch(search);
  };

  const onPageChange = (multiplier: number) => () => {
    setPage((prev) => prev + 1 * multiplier);
  };

  return (
    <div className="w-full h-full p-3 bg-white rounded-md shadow-lg flex">
      <div className="flex flex-col w-full h-full overflow-x-hidden p-3">
        <ProductsTableSearch
          search={search}
          sort={sort}
          onSearch={onSearch}
          onSort={onSort}
        />
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
          <ProductsTable
            onNext={onPageChange(1)}
            onPrev={onPageChange(-1)}
            products={products}
          />
          <div className="flex gap-3 justify-end">
            <button
              className={clsx(
                "text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                { "opacity-50 cursor-not-allowed": page === 1 }
              )}
              onClick={onPageChange(-1)}
              disabled={page === 1}
            >
              <span className="flex items-center">
                <ArrowLeftIcon className="mr-2 size-4" />
                Prev
              </span>
            </button>
            <button
              className={clsx(
                "text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                {
                  "opacity-50 cursor-not-allowed":
                    page >= total / DEFAULT_PAGE_SIZE,
                }
              )}
              onClick={onPageChange(1)}
              disabled={page >= total / DEFAULT_PAGE_SIZE}
            >
              <span className="flex items-center">
                Next
                <ArrowRightIcon className="mr-2 size-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Products };
