const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authMiddleware')
const {createTask,getTasks,getTaskById,updateTask,deleteTask} = require('../controllers/taskController');

// CRUD routes
router.post('/',authentication,createTask);
router.get('/',authentication,getTasks);
router.get('/:id',authentication, getTaskById);
router.put('/:id',authentication, updateTask);
router.delete('/:id',authentication,deleteTask);

module.exports = router;
