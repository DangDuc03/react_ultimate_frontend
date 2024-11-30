import { useState } from 'react'
import './todo.css'
import TodoData from './todoData'
import TodoNew from './todoNew'
import logo from '../../assets/react.svg'

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])

    const addNewTodo = (todo) => {
        const newTodo = {
            id: randomIntFromInterval(1, 99999),
            name: todo
        }

        setTodoList([...todoList, newTodo])
    }

    const deleteTodo = (id) => {
        const newTodo = todoList.filter(items => items.id !== id) // get all id different input id
        setTodoList(newTodo)
    }
    const randomIntFromInterval = (min, max) => { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return (
        <div className="todo-container">
            <div className="todo-title">
                <p>Todo list</p>
            </div>

            <TodoNew
                addNewTodo={addNewTodo}
            />

            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />
                :
                <div className='todo-logo'>
                    <img className='logo' src={logo} alt="" />
                </div>
            }
        </div>
    )
}

export default TodoApp;