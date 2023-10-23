import React, { createRef, useEffect, useState } from 'react';
import './App.css';
import { Tasklist } from './pages/tasklist';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [data,setdata] = useState([]);
  const input = createRef();
  const [updatetaskId,setUpdateTaskId]=useState(0);
  const [updatetaskdata,setUpdateTaskData] = useState({});
  const [isEdit,setEdit]=useState(false);
  const [totalTask,setTotalTask]= useState(0);
  const [completedTask,setCompletedTask] = useState(0);
  const [pendingTask,setPendingTask] = useState(0);
  const [filter,setFilter] = useState("All");
  useEffect(()=>{
    fetchdata();
  },[]);
  useEffect(()=>{
    handleCalculate();
  },[data])

  // Calculate the number of task, completed task, pendingTask
  const handleCalculate =()=>{
    setCompletedTask(0);
    setTotalTask(0)
    setPendingTask(0)
    data.map((task)=>{
      if (task.completed === true){
        setCompletedTask(prev => prev+1);
        setTotalTask(prev => prev+1)
      }else{
        setPendingTask(prev => prev+1)
        setTotalTask(prev => prev+1)
      }
    })
  }

  // Fetch data from API
  const fetchdata = async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setdata(data);
  }

  // function to add task
  const handleAddTask = async()=>{
    if (input.current.value === '') {
      toast("Task Cannot be Empty!");
      return;
    }
    let newData = {
      "userId":1,
      "id": new Date().getTime(),
      "title": input.current.value,
      "completed": false
    };
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const addedTask = await response.json();
      setdata((prevTasks) => [addedTask,...prevTasks]);
      clearInput();
      toast.success("Task Added Successfully !");
    }catch (error) {
      console.log('Error adding task:', error);
      toast.error("SomeThing Went Wrong!");
    }

  }

  //function to delete task
  const handleDelete = async(id)=>{
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      const deletedData = await response.json();
      let newData = data.filter((task)=> task.id !== id);
      setdata(newData);
      toast.success("Task Deleted Successfully !");
    }catch(error){
      console.log('Error updating task:', error);
      toast.error("SomeThing Went Wrong!");
    }
  }

  //function for checkbox to check task completed or not
  const handleCheckbox = (id)=>{
    setdata((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  //function to handle edit task function
  const handleEdit= (id)=>{
    setEdit(true);
    let index = data.findIndex((task)=> task.id===id);
    input.current.value = data[index].title;
    setUpdateTaskData(data[index]);
    setUpdateTaskId(id);
  }

  // function to update the value of task
  const handleUpdateTask = async(id,newvalue)=>{
    if(input.current.value=""){
      toast.error("Task Cannot be Empty!");
      return;
    }
    const updatedTask = {...updatetaskdata,title:newvalue};

    //Temperory function for the task which we add, Because we cant have access to make change in API server.
    if(updatetaskdata.id > 200){
      setdata((prevTasks)=> prevTasks.map((task)=> task.id===id ? {...task,title:newvalue}:task));
      clearInput();
      setEdit(false);
      toast.success("Task Updated Successfully !");
      return;
    }

    //main logic, we dont require the above function, if we have access to make the change in server data
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const updatedTaskData = await response.json();
      setdata((prevTasks)=> prevTasks.map((task)=> task.id===id ? {...task,title:updatedTaskData.title}:task));
      clearInput();
      setEdit(false);
      toast.success("Task Updated Successfully !");
    } catch (error) {
      console.log('Error updating task:', error);
      toast.error("SomeThing Went Wrong!");
    }
  }

  //function to clear input value
  const clearInput = ()=>{
    input.current.value='';
  }

  return (
    <div className="App">
      <h1>TodoList</h1> 
      <div className='search-container'>
        <div className='search-bar'><input type="text" ref={input} placeholder='Add a task' autoFocus/>
        {isEdit?<button className='update' onClick={()=>handleUpdateTask(updatetaskId,input.current.value)}>Update</button>:<button className='add' onClick={handleAddTask}>Add</button>}
        </div>
        <div className='filter'>
          <span className={filter==="All" && "active"} onClick={()=> setFilter("All")}>Totaltask:{totalTask} </span>
          <span className={filter==="Complete" && "active"} onClick={()=> setFilter("Complete")}>Completed: {completedTask}</span>
          <span className={filter==="pending" && "active"} onClick={()=> setFilter("pending")}>Pending: {pendingTask}</span>
          </div>
      </div>
      <div className='task-container'>
        <Tasklist data={data} 
                  isEdit={isEdit} 
                  filter={filter}
                  handleDelete={handleDelete}
                  handleCheckbox={handleCheckbox}
                  handleEdit={handleEdit}/>
      </div>
    </div>
  );
}

export default App;
