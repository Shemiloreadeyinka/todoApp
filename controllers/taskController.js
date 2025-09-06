const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    const{id}=req.user
    const{name,description,category,deadline,isImportant}=req.body
  try {


    const task = new Task({
      user: id,   
      name,
      description,
      category,
      deadline,
      isImportant,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
    const{id}= req.user
  try {

    const tasks = await Task.find({user:id})
      .populate('category', 'name');
      if(tasks.length===0) return res.status(404).json({message:"No Tasks Available"})
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
    const{id}=req.params
  try {
    const task = await Task.findById(id)
      .populate('user', 'username email')
      .populate('category', 'name');

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
    const{id}=req.params
  try {
    const updatedTask = await Task.findByIdAndUpdate(
     id,
      req.body,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.completeTask = async (req, res) => {
    const {id}=req.params
  try {
    const completedTask = await Task.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!completedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(completedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.reverseCompleteTask = async (req, res) => {
    const {id}=req.params
  try {
    const completedTask = await Task.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );

    if (!completedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(completedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompletedTasks = async (req, res) => {
    const{id}=req.user
  try {
    const completedTasks = await Task.find({ user: id, completed: true }).populate('category', 'name');
    if (!completedTasks) return res.status(404).json({ message: 'No Completed Tasks' });
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getIncompleteTasks = async (req, res) => {
  const{id}=req.user
  try{ 
     const getIncompleteTasks=await Task.find({user:id,completed:false}).populate('category','name')
     if (!getIncompleteTasks) return res.status(404).json({ message: 'No Incomplete Tasks' });
     res.status(200).json(getIncompleteTasks)
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}
exports.deleteTask = async (req, res) => {
    const {id}=req.params
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
