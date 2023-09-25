import React, { useState, useEffect } from 'react';

const taskCRUD = () => {
  const [completedTask, setIsCompletedTask] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddNewTodo = () => {
    let newTodoItem = {
      title: newTask,
      description: newDescription,
    };
    let updatedTodoArr = [...todos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewDescription('');
    setNewTask('');
    let updatedCompletedList = [...completedTask, newTodoItem];
    setIsCompletedTask(updatedCompletedList);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setIsCompletedTask(savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = (index) => {
    try {
      let reducedTodos = [...todos];
      reducedTodos.splice(index, 1);

      localStorage.setItem('todolist', JSON.stringify(reducedTodos));
      setTodos(reducedTodos);
    } catch (error) {
      console.log("task not found")

    }
  };

  const handleMoveToCompleted = (index) => {
    try {
      let updatedTodos = [...todos];
      let taskToMove = updatedTodos[index];
      updatedTodos.splice(index, 1);
  
      let updatedCompletedList = [...completedTask, taskToMove];
      setIsCompletedTask(updatedCompletedList);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));
  
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTaskEdit = (index, newTitle, newDescription) => {
    let updatedTodos = [...todos];
    updatedTodos[index].title = newTitle;
    updatedTodos[index].description = newDescription;
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

};

export { taskCRUD, handleAddNewTodo, handleMoveToCompleted, handleToDoDelete };
