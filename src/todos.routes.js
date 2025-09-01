import { Router } from "express";
import { pool } from "./database.js";

const router = Router();

// Create todo
router.post('/', async (req, res) => {
    try {
        const {task} = req.body;
        
        if(task.length === 0) {
            return res.status(400).json({error: "Task is required!"});
        }

        const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *;', [task]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

// Get All
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos;');
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

// Get One
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400);
        }

        const result = await pool.query('SELECT * FROM todos WHERE id = $1;', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})