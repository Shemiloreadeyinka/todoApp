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
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
    const{id}=req.params
  try {
    const task = await Task.findById(id)
      .populate('user', 'name email')
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
