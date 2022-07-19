import qs from "qs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noStoreApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9899",
    prepareHeaders: (headers) => {
      headers.set(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      );
      return headers;
    },
  }),
  tagTypes: ['NoStore'],
  endpoints: (build) => ({
    getNoStore: build.query({
      query: () => "query-nostore",
      transformResponse: (response: any) => response.data,
      providesTags: ['NoStore']
    }),
    setNoStore: build.mutation({
      query(amount) {
        return {
          url: "set-nostore",
          method: "POST",
          body: qs.stringify(amount),
        };
      },
      invalidatesTags: ['NoStore']
    }),
  }),
});

export const { useGetNoStoreQuery, useSetNoStoreMutation } = noStoreApi;
