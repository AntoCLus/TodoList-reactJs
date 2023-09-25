import { AiOutlineDelete, BsCheckLg } from 'react-icons/all';
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Background, { changeBackground } from './Background';
import { taskCRUD, handleAddNewTodo, handleCompletedTodoDelete, handleToDoDelete } from './tasksCRUD';
function App() {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setIsCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [error, setError] = useState(null);
  const [toDoDelete, setTodoDelete] = useState("");

  useEffect(() => {
    changeBackground();
    taskCRUD();
  }, []);

  const handleComplete = useCallback((index) => {
    try {
      const date = new Date();
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      let hh = date.getHours();
      let minutes = date.getMinutes();
      let ss = date.getSeconds();
      let finalDate =
        dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

      let filteredTodo = {
        ...todos[index],
        completedOn: finalDate,
      };
    } catch (error) {
      setError(error);
    }
  }, []);

  const handleTodoClick = useCallback(() => {
    setIsCompletedScreen(false);
  }, []);

  const handleCompletedClick = useCallback(() => {
    setIsCompletedScreen(true);
  }, []);

  if (error) {
    setError(null); // Reset the error state to null
    return (
      <div className="App">
        <h1>Error</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>My todo list</label>
            <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder='Please enter the task title: ' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder='What is the task about:' />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddNewTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`} onClick={handleTodoClick}>Todo</button>
          <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`} onClick={handleCompletedClick}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompletedScreen === false &&
            todos.map((item) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;



