import React, { useState } from 'react';
import './Todo.css';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const  addTodo = () => {
        if(inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(), 
                text: inputValue,
            }
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const editTodo = (id, text) => {
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === editId) {
                return {...todo, text:editValue}
            }
            return todo;
        });

        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
    };

  return (
    <div className="todo-container">
        <div className='header'>
            <h2>To-Do List</h2>
        </div>
        <input type='text' placeholder='Enter your Task' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        
        {
            editMode ? (
                <div>
                    <input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <button onClick={updateTodo}>UPDATE</button>
                </div>
             ) : (
                <button onClick={addTodo}>ADD</button>
             )
        }
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                {todo.text}
                <div>
                    <button onClick={() => deleteTodo(todo.id)}>DELETE</button>
                    <button onClick={() => editTodo(todo.id, todo.text)}>EDIT</button>
                </div>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Todo;
