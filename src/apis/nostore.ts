import { api } from ".";
import qs from "qs";

const noStoreApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNoStore: build.query({
      query: () => "query-nostore",
      transformResponse: (response: { data }) => response.data,
    }),
    setNoStore: build.mutation({
      query(amount) {
        return {
          url: "set-nostore",
          method: "POST",
          body: qs.stringify(amount),
        };
      },
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled }
      ) {
        const { undo } = dispatch(
          api.util.updateQueryData("getNoStore", undefined, (draft) => {
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
