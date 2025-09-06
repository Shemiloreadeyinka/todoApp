const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authMiddleware')
const {createTask,getTasks,getTaskById,updateTask,deleteTask,completeTask,getCompletedTasks,reverseCompleteTask,getIncompleteTasks} = require('../controllers/taskController');

router.post('/',authentication,createTask);
router.get('/',authentication,getTasks);
router.get('/completed', authentication, getCompletedTasks);
router.get('/incompleted', authentication, getIncompleteTasks);
router.get('/:id',authentication, getTaskById);
router.patch('/:id',authentication, updateTask);
router.delete('/:id',authentication,deleteTask);
router.patch('/:id/complete', authentication, completeTask);
router.patch('/:id/reversecomplete', authentication, reverseCompleteTask);

module.exports = router;
