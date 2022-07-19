import type { PreloadedState } from "@reduxjs/toolkit";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { noStoreApi } from "@/apis/nostore";
import { todoApi } from '@/apis/todo';

const rootReducer = combineReducers({
  [noStoreApi.reducerPath]: noStoreApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(noStoreApi.middleware, todoApi.middleware);
    },
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
