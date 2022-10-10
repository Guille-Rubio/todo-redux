import React, { useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import ToDoCard from '../ToDoCard/ToDoCard';
import { addNewTask, addManyTasks, deleteTask, deleteAllTasks } from '../../../redux/slices/taskListSlice';
import { useEffect } from "react";


const ToDoList = () => {

  const taskList = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();
  const newTaskInput = useRef(null);

  useEffect(() => {
    //TO DO: Disable double fetch to print cards save in mongo db
    const fetchTasks = async () => {
      const request = await axios({
        method: 'get',
        url: 'http://localhost:5000'
      });
      console.log(request.data)
      dispatch(addManyTasks(request.data));
      //SET TASKLIST EQUAL TO FETCH RESULT
    }
    fetchTasks();
    // eslint-disable-next-line
  }, [])

  const addItem = async (event) => {
    event.preventDefault();
    const taskInput = newTaskInput.current.value;
    try {

      //Position should be replaced by a serial number to order
      const request = await axios({
        method: 'post',
        url: 'http://localhost:5000',
        data: {
          title: taskInput,
          position: ""
        }
      });

      console.log("Added item ", request.data.id);
      dispatch(addNewTask({ title: taskInput, id: request.data.id }));
      newTaskInput.current.value = "";

    } catch (error) {
      console.log(error.message);
      alert("Task saving failed");
    }

  };

  const deleteCard = async (i, id) => {
    try {
      console.log("delete item ", i)
      await axios({
        method: 'delete',
        url: 'http://localhost:5000',
        data: { id: id }

      });
      dispatch(deleteTask(i));
    } catch (error) {
      console.log(error.message);
      alert('Task deletion failed');
    }

  };

  const deleteAllCards = async () => {
    try {
      await axios({
        method: 'delete',
        url: 'http://localhost:5000/all',
      });
      dispatch(deleteAllTasks());
    } catch (error) {
      console.log(error.message);
      alert('Task deletion failed');
    }


  };
  const printCards = () => taskList.map((task, i) => <ToDoCard key={uuidv1()} task={task} index={i} delete={() => deleteCard(i, task.id)} />);

  return <section className="todolist">
    <h2>To do list</h2>
    <form className="todolist__form">
      <input type="text" ref={newTaskInput} placeholder="Add a new task"></input>
      <button className="button1" type="submit" onClick={addItem}>Add to list</button>
    </form>
    {taskList.length > 0 ? <h3>Task List</h3> : ""}
    <section id="list" className="todolist__container">

      {printCards()}

    </section>
    {taskList.length > 1 ? <button className="button1" onClick={deleteAllCards}>Delete List</button> : ""}

  </section>;
};

export default ToDoList;
