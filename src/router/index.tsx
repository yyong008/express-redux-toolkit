import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import About from "../pages/about";
import Total from "../pages/home";
import TodoList from "../pages/todolist";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/total" element={<Total />}></Route>
            <Route path="/todolist" element={<TodoList />}></Route>
        </Routes>
    );
};

export default Router;
