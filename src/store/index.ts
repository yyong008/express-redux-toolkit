import type { PreloadedState } from "@reduxjs/toolkit/src/index";

import { configureStore, combineReducers } from "@reduxjs/toolkit/src/index";
import { genSerializableCheck, genPersistedReducer } from "./persist";

// apis
import { api } from "@/apis/api";
import { tSlice } from "@/apis/thunk";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [tSlice.name]: tSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: genPersistedReducer(rootReducer) as any,
    middleware: (gDM) => {
      return gDM({
        serializableCheck: genSerializableCheck.serializableCheck,
      }).concat(api.middleware);
    },
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
