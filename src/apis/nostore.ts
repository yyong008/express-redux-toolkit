import qs from "qs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const noStoreApi = createApi({
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
  endpoints: (build) => ({
    getNoStore: build.query({
      query: () => "query-nostore",
      transformResponse: (response: any) => response.data,
    }),
    setNoStore: build.mutation({
      query(amount) {
        return {
          url: "set-nostore",
          method: "POST",
          body: qs.stringify(amount),
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { undo } = dispatch(
          noStoreApi.util.updateQueryData("getNoStore", undefined, (draft) => {
            Object.assign(draft, arg);
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          undo();
        }
      },
    }),
  }),
});

export const { useGetNoStoreQuery, useSetNoStoreMutation } = noStoreApi;
