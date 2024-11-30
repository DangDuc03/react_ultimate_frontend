
const TodoData = (props) => {
    const { todoList, deleteTodo } = props

    const handleDeleteTodo = (id) => {
        deleteTodo(id)
    }

    return (
        <div className="todo-data">
            {todoList.map((items, index) => {
                return (
                    <>
                        <div className={`todo-items`} key={items.id}>
                            <div>{items.name}</div>
                            <button
                                className="btn-delete"
                                onClick={() => handleDeleteTodo(items.id)}
                            >Delete</button>
                        </div>
                    </>
                )
            })}
        </div>
    )
}


export default TodoData;