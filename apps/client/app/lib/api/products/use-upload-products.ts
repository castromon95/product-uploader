"use client";

import { HTTPMethod } from "@/app/lib/enums/common";
import { UseHook } from "@/app/lib/types/common";
import { fetcher } from "@/app/lib/utilities/fetcher";
import { mutate } from "swr";
import useSWRMutation, { MutationFetcher, TriggerWithArgs } from "swr/mutation";

type UploadProductsArgs = {
  file: File;
};

interface UseUploadProducts extends UseHook {
  trigger: TriggerWithArgs<void, Error, string, UploadProductsArgs>;
}

const uploadProducts: MutationFetcher<
  void,
  string,
  UploadProductsArgs
> = async (path, { arg: { file } }): Promise<void> => {
  const formData = new FormData();
  formData.set("products", file);

  await fetcher<{ knowledge_base_id: string }, FormData>({
    method: HTTPMethod.POST,
    body: formData,
    formData: true,
  })(path);
};

const useUploadProducts = (): UseUploadProducts => {
  const { isMutating, trigger, error } = useSWRMutation<
    void,
    Error,
    string,
    UploadProductsArgs
  >("/products", uploadProducts, {
    onSuccess: () => {
      mutate((k?: string) => k?.startsWith("/products"), {
        revalidate: true,
      });
    },
  });

  return { trigger, isLoading: isMutating, isError: Boolean(error) };
};

export { useUploadProducts };
