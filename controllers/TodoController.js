const TodoModel = require('../models/todoModel');

module.exports.getToDo = async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.send(todos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.createToDo = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).send('Text field is required');
        }

        const todo = await TodoModel.create({ text });

        console.log('Added successfully');
        console.info(todo);

        res.send(todo);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send(error.message);
        }
        res.status(500).send('Internal Server Error');
    }
};

module.exports.updateTodo = async (req, res) => {
    try {
        const { _id, text } = req.body;

        if (!_id || !text) {
            return res.status(400).send('Both _id and text fields are required');
        }

        await TodoModel.findByIdAndUpdate(_id, { text });

        res.send('Updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.deleteTodo = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).send('_id field is required');
        }

        await TodoModel.findByIdAndDelete(_id);

        res.send('Deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
