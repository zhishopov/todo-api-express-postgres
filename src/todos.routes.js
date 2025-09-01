import { Router } from "express";
import { pool } from "./database.js";

const router = Router();

// Create todo
router.post("/", async (req, res) => {
  try {
    const { task } = req.body;

    if (task.length === 0) {
      return res.status(400).json({ error: "Task is required!" });
    }

    const result = await pool.query(
      "INSERT INTO todos (task) VALUES ($1) RETURNING *;",
      [task]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos;");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get One
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const result = await pool.query("SELECT * FROM todos WHERE id = $1;", [id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update todo
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { task, completed } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    if (task.length === 0 || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Task and completed are required" });
    }

    const result = await pool.query(
      "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *;",
      [task, completed, id]
    );

    res.json(res.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING id;",
      [id]
    );

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
