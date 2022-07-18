import path from "path";
import express from "express";
import cors from "cors";

import * as noStoreCtrs from "./controllers/nostore";
import * as todoCtrs from "./controllers/todo";

const app = express();

app.use(
  "/static",
  express.static(path.join(__dirname, "../static"), {
    index: false,
  })
);
                                                      
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.send({ code: 1, data: { app: "express server " } });
});

app.get("/query-nostore", noStoreCtrs.getNoStore);

app.post("/set-nostore", noStoreCtrs.setNoStore);

app.get("/todo/:id", todoCtrs.getTodo);
app.get("/todos", todoCtrs.getTodos);
app.post("/todo", todoCtrs.addTodo);
app.put("/todo/:id", todoCtrs.updateTodo);
app.delete("/todo/:id", todoCtrs.delTodo);

app.listen(9899, () => {
  console.info(`===> api server is running at http://localhost:9899`);
});
