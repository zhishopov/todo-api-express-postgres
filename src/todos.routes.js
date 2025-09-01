import { Router } from "express";
import { pool } from "./database.js";

const router = Router();

// Create todo
router.post('/', (req, res) => {
    try {
        const {task} = req.body;
        
        if(task.length === 0) {
            return res.status(400).json({error: "Task is required!"});
        }

        const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *;', [task]);

    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

