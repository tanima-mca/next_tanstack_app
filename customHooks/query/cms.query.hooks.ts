import { allBlogsAPICall } from "@/api/funcTions/list.api";
import { IallListProps } from "@/typeScript/cms.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const allBlogsQuery = (): UseQueryResult<IallListProps, unknown> => {
    return useQuery({
      queryKey: ["BLOGS"],
      queryFn: allBlogsAPICall,
    });
  };
  