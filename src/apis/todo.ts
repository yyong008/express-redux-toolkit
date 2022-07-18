import { api } from ".";
import qs from "qs";

const noStoreApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query({
      query: (id) => `/todo/${id}`,
      transformResponse: (response: { data }) => response.data,
    }),
    getTodos: build.query({
      query: () => "/todos",
      // transformResponse: (response: { data }) => response.data,
    }),
    addTodo: build.mutation({
      query(todo) {
        return {
          url: "/todo",
          method: "POST",
          body: qs.stringify(todo),
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { undo } = dispatch(
          api.util.updateQueryData("getTodos", "", (draft) => {
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
    }),
    delTodo: build.mutation({
      query(todo) {
        return {
          url: `/todo/${todo.id}`,
          method: "DELETE",
          body: qs.stringify(todo),
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { undo } = dispatch(
          api.util.updateQueryData("getTodos", "", (draft) => {

            let index = 0

            draft.forEach((item, i) => { 
              if (item.id === arg.id) {
                index = i
            }

          });
          draft.splice(index, 1);
        }
        ))

        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          undo();
        }
      },
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
          api.util.updateQueryData("getTodos", "", (draft) => {
            draft.forEach((i, ii) => {
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
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetTodosQuery,
  useAddTodoMutation,
  useDelTodoMutation,
  useUpdateTodoMutation,
} = noStoreApi;
