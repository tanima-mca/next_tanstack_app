import { allBlogsQuery } from "@/customHooks/query/cms.query.hooks";
import React from "react";

export default function List() {
  const {
    data: list,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = allBlogsQuery();
  console.log(list);
  return <></>;
}
