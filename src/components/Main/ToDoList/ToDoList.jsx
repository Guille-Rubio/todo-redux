import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import ToDoCard from '../ToDoCard/ToDoCard';
import { addNewTask, addManyTasks, deleteTask, deleteAllTasks } from '../../../redux/slices/taskListSlice';



const ToDoList = () => {

  const taskList = useSelector((state) => state.taskList.tasks);
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  const newTaskInput = useRef(null);

  //let draggedItem;


  useEffect(() => {
    //TO DO: Disable strict mode double fetch to print cards save in mongo db
    //disable where no user is logged (using redux)
  
      const fetchTasks = async () => {
        const request = await axios({
          method: 'get',
          url: 'http://localhost:5000/tasks',
          withCredentials: true
        });
        console.log(request.data)
        dispatch(addManyTasks(request.data));
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
        url: 'http://localhost:5000/tasks',
        withCredentials: true,
        data: {
          title: taskInput,
          position: "",
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
        url: 'http://localhost:5000/tasks',
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
        url: 'http://localhost:5000/tasks/all',
      });
      dispatch(deleteAllTasks());
    } catch (error) {
      console.log(error.message);
      alert('Task deletion failed');
    }
  };


  const handleDragEnter = (event) => {
    event.preventDefault();
    console.log("YOU CAN DROP HERE");

  };

  const setDraggedItem = (item) => {
    // draggedItem = item;
    //TODO check whether this works or state should be used
  }

  const printCards = () => taskList.map((task, i) => <ToDoCard key={uuidv1()} task={task} index={i} delete={() => deleteCard(i, task.id)} setDraggedItem={setDraggedItem} />);

  return <section className="todolist">
    <h2>To do list</h2>
    <form className="todolist__form">
      <input type="text" ref={newTaskInput} placeholder="Add a new task"></input>
      <button className="button1" type="submit" onClick={addItem}>Add</button>
    </form>
    <p>{user}</p>
    {taskList.length > 0 ? <h3>Task List</h3> : ""}
    <section
      id="list"
      className="todolist__container"
      onDragEnter={handleDragEnter}>

      {printCards()}

    </section>
    {taskList.length > 1 ? <button className="button1" onClick={deleteAllCards}>Delete List</button> : ""}

  </section>;
};

export default ToDoList;
