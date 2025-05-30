import React, { useEffect, useState } from 'react';
import { TodoDto } from '../Dtos/TodoDto';
import { addTodo, deleteTodo, editTodo, getTodos } from '../Services/TodoService';
import Grid from './GridComponent';
import { Button } from 'react-bootstrap';

const Todo: React.FC = () => {
    const [todoList, setTodoList] = useState<TodoDto[]>([]);
    const [todo, setTodo] = useState<TodoDto>({
        todoActivity: '',
        isCompleted: false,
        deadline: new Date().toISOString(),
    });
    const [error, setError] = useState("");
    useEffect(() => {
        loadTodoList();
    }, []);

    async function loadTodoList() {
        try {
            const data = await getTodos();
            console.log("data recieved:", data);
            setTodoList(data);
        } catch (err) {
            console.error("Error loading todos", err);
        }
    }

    async function addCick() {
        const newTodo: TodoDto = {
            todoActivity: todo.todoActivity,
            isCompleted: false,
            deadline: todo.deadline,
        };
        try {
            await addTodo(newTodo);
            await loadTodoList();
            setTodo({
                todoActivity: '',
                isCompleted: false,
                deadline: '',
            });
        } catch (err) {
            console.error("Error adding todo", err);
        }
    }

    async function deleteClick(id: number) {
        try {
            await deleteTodo(id);
            await loadTodoList();
        } catch (err) {
            console.error("Error deleting todo", err);
        }
    }

    async function editClick(id: number) {
        try {
            await editTodo(id);
            await loadTodoList();
        } catch (err) {
            console.error("Error deleting todo", err);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodo(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'todoActivity' && value && value.length <= 10) {
            setError("Activity should be more than 10 characters long !");
        }
        else {
            setError("");
        }

    };

    return (
        <div className="App">
            <h1 className='main-Heading'>todos</h1>
            <div>
                <p>Please enter an Activity &nbsp;
                    <input name="todoActivity" type="text" value={todo.todoActivity} onChange={handleChange}></input>
                    &nbsp; Please enter a Deadline &nbsp;
                    <input name="deadline" type="date" value={todo.deadline} onChange={handleChange}></input>
                    &nbsp;
                    <Button disabled={error !== '' ? true : false} onClick={() => addCick()}>Add Task</Button>
                </p>
                {error && <p style={{ color: "red" }}>{error}</p>}

            </div>
            <div className="container mt-4">
                <h1>Todo Activity List</h1>
                <Grid data={todoList} onMarkCompleteButtonClick={id => editClick(id)} onDeleteButtonClick={id => deleteClick(id)} />
            </div>
        </div>
    );
};

export default Todo;
