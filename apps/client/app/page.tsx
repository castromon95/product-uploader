"use client";

import { FunctionComponent } from "react";
import { SWRProvider } from "./lib/providers/swr.provider";
import { Products } from "./ui/modules/products";

const ProductsPage: FunctionComponent = () => {
  return (
    <SWRProvider>
      <Products />
    </SWRProvider>
  );
};

export default ProductsPage;
