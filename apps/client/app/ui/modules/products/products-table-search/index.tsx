"use client";

import { ArrowUpDownIcon, LoaderIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../components/forms/dropdown-menu";
import { Input } from "../../../components/forms/input";
import clsx from "clsx";
import { ProductSort } from "@/app/lib/enums/products";
import { ProductSortTranslations } from "@/app/lib/translations/products";
import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUploadProducts } from "@/app/lib/api/products/use-upload-products";
import { ProgressBar } from "@/app/ui/components/progress-bar";

type ProductsTableSearchProps = {
  sort: string;
  search: string;
  onSearch: (search: string) => void;
  onSort: (sort: string) => void;
};

export const ProductsTableSearch: FunctionComponent<
  ProductsTableSearchProps
> = ({ search, sort, onSearch, onSort }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const { trigger, isLoading } = useUploadProducts();

  const onUpload = () => {
    fileInput.current?.click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Increment progress, ensuring it doesn't exceed 100
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval); // Stop the interval when progress reaches 100
          return 100;
        }
      });
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [progress]);

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles?.length) {
      setProgress(1);
      trigger({ file: selectedFiles[0] });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Input
          className="w-40"
          value={search}
          placeholder="Search..."
          type="text"
          onChange={(e) => onSearch(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={clsx("flex items-center gap-2", {
                "text-blue-600": sort,
              })}
            >
              {ProductSortTranslations[sort || ""] || "Sort"}
              <ArrowUpDownIcon className="size-4" />{" "}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuRadioGroup value={sort} onValueChange={onSort}>
              <DropdownMenuRadioItem value={ProductSort.NAME}>
                Name
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={ProductSort.PRICE}>
                Price
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={ProductSort.EXPIRATION}>
                Expiration
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className="ml-auto flex gap-2 items-center cursor-pointer text-sm bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={onUpload}
          disabled={isLoading}
        >
          Upload
          <LoaderIcon
            className={clsx("size-4", {
              "cursor-not-allowed animate-spin": isLoading,
              hidden: !isLoading,
            })}
          />
        </button>
        <input
          ref={fileInput}
          type="file"
          className="hidden"
          onChange={upload}
        />
      </div>

      {isLoading && <ProgressBar />}
    </div>
  );
};
