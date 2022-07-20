import qs from "qs";
import { api } from "./api";

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query({
      query: (id) => `/todo/${id}`,
      transformResponse: (response: any) => response.data,
    }),
    getTodos: build.query({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    addTodo: build.mutation({
      query(todo) {
        return {
          url: "/todo",
          method: "POST",
          body: qs.stringify(todo),
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { undo } = dispatch(
          todoApi.util.updateQueryData("getTodos", "", (draft) => {
            draft.push(arg);
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          undo();
        }
      },
      invalidatesTags: ["Todo"],
    }),
    delTodo: build.mutation({
      query(todo: any) {
        return {
          url: `/todo/${todo.id}`,
          method: "DELETE",
          body: qs.stringify(todo),
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { undo } = dispatch(
          todoApi.util.updateQueryData("getTodos", "", (draft) => {
            let index = 0;

            draft.forEach((item: any, i: number) => {
              if (item.id === arg.id) {
                index = i;
              }
            });
            draft.splice(index, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          undo();
        }
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation({
      query(todo) {
        return {
          url: `/todo/${todo.id}`,
          method: "PUT",
          body: qs.stringify(todo),
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { undo } = dispatch(
          todoApi.util.updateQueryData("getTodos", "", (draft) => {
            draft.forEach((i: any, ii: number) => {
              if (i.id === arg.id) {
                draft[ii] = arg;
              }
            });
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          undo();
        }
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetTodosQuery,
  useAddTodoMutation,
  useDelTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
