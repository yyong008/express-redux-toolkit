import { BrowserRouter, Outlet } from "react-router-dom";

import Router from "./router";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <Outlet />
    </BrowserRouter>
  );
};

export default App;
