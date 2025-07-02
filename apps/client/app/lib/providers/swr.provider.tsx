"use client";
import React from "react";
import { SWRConfig } from "swr";

type SWRProviderProps = {
  children: React.ReactNode;
};

export const SWRProvider: React.FunctionComponent<SWRProviderProps> = ({
  children,
}) => {
  return <SWRConfig>{children}</SWRConfig>;
};
