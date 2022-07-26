import ReactDOM from "react-dom/client";

// components
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

// utils
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { setupStore } from "./store";

// styles
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const store = setupStore();
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
