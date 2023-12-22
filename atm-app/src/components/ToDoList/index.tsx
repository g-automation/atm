import React, { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [inputTodo, setInputTodo] = useState<string>("");

  const [isButtonMarked, setIsButtonMarked] = useState<boolean>(false);

  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { text: inputTodo as string, completed: !isButtonMarked },
    ]);
    setInputTodo("");
  };

  const handleCompleteTodo = (todoIndex: number) => {
    setTodos(
      todos.map((todo, i) => {
        return i === todoIndex ? { ...todo, completed: !todo.completed } : todo;
      }),
    );
  };

  const handleRemoveTodo = (todoIndex: number) => {
    setTodos(todos.filter((todo, i) => i !== todoIndex));
  };

  return (
    <div>
      <h1>Personal Task List</h1>
      <input
        type="text"
        placeholder="Add a task"
        onChange={e => setInputTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i} className={todo.completed ? "completed" : ""}>
            {todo.text}
            <button onClick={() => handleCompleteTodo(i)}>
              {todo.completed ? "Mark" : "Cutting"}
            </button>
            <button onClick={() => handleRemoveTodo(i)} title="Delete">
              <i className="fas fa-trash">Delete</i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
