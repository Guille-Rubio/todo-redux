import React, { useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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
      const savedTasks = await axios({
        method: 'get',
        url: 'http://localhost:5000',
      })
      const position = savedTasks.data.length;

      const request = await axios({
        method: 'post',
        url: 'http://localhost:5000',
        data: {
          task: taskInput,
          position: position
        }
      });



      console.log("Added item ", request.data);
      dispatch(addNewTask(taskInput));
      newTaskInput.current.value = "";
    } catch (error) {
      console.log(error.message);
      alert("Task saving failed");
    }

  };

  const deleteCard = (i) => {
    try {
      console.log("delete item ", i)
      axios({
        method: 'delete',
        url: 'http://localhost:5000',
        data: { position: i }

      });
      dispatch(deleteTask(i))
    } catch (error) {
      console.log(error.message);
      alert('Task deletion failed');
    }

  };

  const deleteAllCards = () => { dispatch(deleteAllTasks()) };
  const printCards = () => taskList.map((task, i) => <ToDoCard key={uuidv4()} data={task} index={i} delete={() => deleteCard(i)} />);

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
