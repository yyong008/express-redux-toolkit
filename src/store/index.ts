import type { PreloadedState } from "@reduxjs/toolkit";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "@/apis/api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (gDM) => {
      return gDM().concat(api.middleware);
    },
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
