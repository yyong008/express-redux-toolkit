import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
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
  endpoints: () => ({}),
  tagTypes: ["NoStore", "Todo"],
});
