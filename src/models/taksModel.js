const connection = require('./connection')

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks')
    return tasks
}

const createTask = async (task) => {
    const { title, runtime } = task

    const query = 'INSERT INTO tasks(title, runtime, status) VALUES (?, ?, ?)'

    const [createdTask] = await connection.execute(query, [title, runtime, 'pendente'])

    return { insertId: createdTask.insertId }
}

const deleteTask = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?'

    const [removedTask] = await connection.execute(query, [id])

    return removedTask
}

const updateTask = async ({ id, task }) => {
    const { title, runtime, status } = task

    const query = 'UPDATE tasks SET title = ?, runtime = ?, status = ? WHERE id = ?'

    const [updatedTask] = await connection.execute(query, [title, runtime, status, id])

    return updatedTask
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
}