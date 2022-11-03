import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editTask, toggleTaskCompleted } from "../../../redux/slices/taskListSlice";
import dragIcon from '../../../assets/icons/drag.png';
import axios from "axios";

//{index, task, delete }
const ToDoCard = (props) => {
  const dispatch = useDispatch();
  const taskText = useSelector((state) => state.taskList.tasks[props.index].title);
  const completed = useSelector((state) => state.taskList.tasks[props.index].completed);

  const [taskInput, setTaskInput] = useState(taskText);


  const updateTask = async (event) => {
    event.preventDefault();
    setTaskInput(event.target.value);

  };

  const updateTitle = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: 'put',
        url: 'http://localhost:5000/tasks',
        data: {
          title: event.target.value,
          id: props.task.id //puede borrar mas de uno en Strict Mode
        }
      });
      dispatch(editTask({ index: props.index, updatedTask: taskInput }))
    } catch (error) {
      console.log(error.message);
      alert("Task update failed");
    }
  };


  const toggleCompletion = async (event) => {
    try {
      event.preventDefault();
      const status = event.target.checked;
      console.log(status);

      const edit = await axios({
        method: 'put',
        url: 'http://localhost:5000/tasks',
        data: { id: props.task.id, completed: status }
      });
      console.log(completed);
      console.log(edit);
      console.log(status);
      dispatch(toggleTaskCompleted({ status: status, index: props.index }));
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };




  return <form

    className={`todocard${completed ? "__completed" : ""}`}
    draggable="true"
    onDragStart={(event) => props.handleDragStart(event, props.task.position)}
    onDragEnd={props.handleDragEnd}
    onDragEnter={(event) => props.handleDragEnter(event, props.task.position)}
  >


    <div className="todocard__element" ><img src={dragIcon} alt="drag icon" className="todocard__drag-icon" /></div>
    <input type="checkbox" /* defaultChecked={completed} */ onChange={toggleCompletion} checked={completed} />
    <input type="text" value={taskInput} onChange={updateTask} onBlur={updateTitle}></input>
    <button className="button-remove-task" onClick={props.delete}>X</button>
  </form >
};



export default ToDoCard;
