import qs from "qs";
import { api } from "./api";

export const noStoreApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNoStore: build.query({
      query: () => "query-nostore",
      transformResponse: (response: any) => response.data,
      providesTags: ["NoStore"],
    }),
    setNoStore: build.mutation({
      query(amount) {
        return {
          url: "set-nostore",
          method: "POST",
          body: qs.stringify(amount),
        };
      },
      invalidatesTags: ["NoStore"],
    }),
  }),
});

export const { useGetNoStoreQuery, useSetNoStoreMutation } = noStoreApi;
