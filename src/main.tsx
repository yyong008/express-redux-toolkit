import ReactDOM from "react-dom/client";

// components
import App from "./App";

// utils
import { Provider } from "react-redux"
import { setupStore } from './store'

// styles
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!)
const store = setupStore()

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
