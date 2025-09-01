import express from "express";
import router from "./todos.routes.js";

const app = express();

app.use(express.json());
app.use("/todos", router);

app.listen(5001, () =>
  console.log("Server is listening on http://localhost:5001...")
);
