import "./App.css";
import { useState, useEffect } from "react";
import { Task } from "./Task";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event) => setNewTask(event.target.value);

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList(task.taskName !== "" ? [...todoList, task] : todoList);
    setNewTask("");
  };

  const deleteTask = (id) => setTodoList(todoList.filter((task) => task.id !== id));

  const completeTask = (id) =>
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

  const editTask = (id, newName) =>
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, taskName: newName } : task
      )
    );

  return (
    <>
   
      <header className="banner">📝 To Do List</header>
      <div className="App">
        <div className="container">
          <div className="addTask">
            <input
              value={newTask}
              onChange={handleChange}
              placeholder="Enter a new task..."
            />
            <button onClick={addTask}>Add</button>
          </div>

          <div className="list">
            {todoList.map((task) => (
              <Task
                key={task.id}
                taskName={task.taskName}
                id={task.id}
                completed={task.completed}
                deleteTask={deleteTask}
                completeTask={completeTask}
                editTask={editTask}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
