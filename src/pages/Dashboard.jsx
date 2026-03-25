
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState,useRef } from "react";
import axios from "axios";

import "./Dashboard.css"
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaTasks } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

function Dashboard() {
  
  const [search,setSearch]=useState("");
  const[taskInput,setTaskInput]=useState("");
  const [tasks,setTasks]=useState([]);
  const [editId,setEditId]=useState(null);
  const [editText,setEditText]=useState("");
  
  
  const {loading,user}=useContext(AuthContext);
  const inputRef=useRef(null);





  function formatDate(dateString) {
    const taskDate=new Date(dateString);
    const today=new Date();
    const diffTime=today-taskDate;
    const diffDays=Math.floor(diffTime/(1000*60*60*24));
    if(diffDays===0) return "Today";
    if(diffDays===1) return "Yesterday";
    return taskDate.toLocaleDateString();
  }

    useEffect(()=>{
      
    const fetchTasks=async()=>{
      try{
        const token=localStorage.getItem("token");
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )
        
        setTasks(res.data || []);
        console.log("FETCHING TASKS");
        console.log(res.data);
      }catch(error){
        console.error(error);
      }
    }
    fetchTasks();
  },[]);

  const handleAddTask=async()=>{
    if(!taskInput.trim()) return;
    try{
      const token=localStorage.getItem("token");
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`,
        {title:taskInput},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      setTasks(prev=>[res.data,...prev]);
      setTaskInput("");
      inputRef.current.focus();
    }catch(error){
      console.error("Error adding task",error);
    }
  
    
  }
  const handleDeleteTask=async(id)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this task?");
    if(!confirmDelete) return;
    try{
      const token=localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
       setTasks(prev=>prev.filter(task=>task._id !==id))
    }catch(error){
      console.error("Delete error",error);
    }
   
  }
  const startEditing=(task)=>{
    setEditId(task._id);
    setEditText(task.title)
  }
  const saveEdit=async(id)=>{
    try{
      const token=localStorage.getItem("token");
      const res=await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {title:editText},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      setTasks(prev=>prev.map(task=>
        task._id===id?
        res.data:task));
    setEditId(null);
    }catch(error){
      console.error("Edit error",error);
    }
    
  }
  const cancelEdit=()=>{
    setEditId(null)
  }
   const toggleTaskStatus=async(task)=>{
    try{
      const token=localStorage.getItem("token");
      const res=await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
        {completed: !task.completed},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      setTasks(prev=>prev.map(item=>item._id===task._id?
      res.data:item
    ))
    }catch(error){
      console.error("Toggle error",error);
    }
    
   }
   const totalTasks=tasks.length;
   const completedTasks=tasks.filter(task=>task.completed).length;
   const pendingTasks=tasks.filter(task=>!task.completed).length;
   const progress=totalTasks===0 ? 0 : Math.round((completedTasks/totalTasks)*100);
   const filterdTask=tasks.filter(task=>task.title.toLowerCase().includes(search.toLowerCase()))
   .sort((a,b)=>new Date(b.date)-new Date(a.date))
     
 if(loading){
  return (
    <div className="spinner-container">
      <div className="spinner">

      </div>
    </div>
  )
 }
  return (
    <div className=" min-h-screen flex  bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Sidebar/>
      <div className="flex-1 p-8 max-w-6xl mx-auto" >
    
      <h2 className="text-white text-3xl font-bold mb-4">Dashboard</h2>
      
      <div >
         <Topbar user={user} search={search} setSearch={setSearch} tasks={tasks}/>
         </div>
       <div className="grid grid-cols-4 gap-8 mt-8 ">
          <div className="bg-black/40 p-6 rounded-xl text-white border border-white/10
                          backdrop-blur-md flex items-center justify-between shadow-lg
                          hover:bg-black/50 transition-all duration-300 hover:-translate-y-1">
            <div className="leading-tight">
            <p className="text-gray-400 text-sm whitespace-nowrap">
                Total Tasks
            </p>
            <h3 className="text-3xl font-bold">{totalTasks}</h3>
            </div>
            <FaTasks className="text-4xl text-blue-500"/>
          </div>

          <div className="bg-black/40 p-6 rounded-xl text-emerald-400 border border-white/10
                          backdrop-blur-md flex  items-center justify-between shadow-lg
                          hover:bg-black/50 transition-all duration-300 hover:-translate-y-1">
          <div className="leading-tight">
            <p className="text-gray-400 text-sm whitespace-nowrap">
                Completed
            </p>
            <h3 className="text-3xl font-bold">{completedTasks}</h3>
          </div>
            <FaCheckCircle className="text-4xl text-emerald-600"/>
          </div>

          <div className="bg-black/40 p-6 rounded-xl text-orange-400 border border-white/10
                          backdrop-blur-md flex items-center justify-between shadow-lg
                          hover:bg-black/50 transition-all duration-300 hover:-translate-y-1">
          <div className="leading-tight">
            <p className="text-gray-400 text-sm whitespace-nowrap">
                Pending
            </p>
            <h3 className="text-3xl font-bold ">{pendingTasks}</h3>
          </div>
            <FaClock className="text-4xl text-orange-600"/>
          </div>

          <div className="bg-black/40 p-6 rounded-xl text-white border border-white/10
                          backdrop-blur-md  flex items-center justify-between shadow-lg
                          hover:bg-black/50 transition-all duration-300 hover:-translate-y-1">
          <div className="leading-tight">
            <p className="text-gray-400 text-sm whitespace-nowrap">
                Progress
            </p>
            
           <div className="w-18 h-18 flex items-center justify-center">
            <CircularProgressbar value={progress} text={`${progress}% `}
                                  styles={{
                                    path:{stroke:"#22c55e"},
                                    text:{fill:"#ffffff",fontSize:"20px"},
                                    trail:{stroke:"#374151"}
                                  }}
            />
            
  
           </div>
          </div>
              
 
  
          </div>

       </div>

      <div className="mt-8 bg-black/40 backdrop-blur-sm p-6 rounded-xl">
      <h3 className="text-white text-xl mb-4">Add New Task</h3>
      <div className="flex gap-3">
        <input
              ref={inputRef}
               type="text"
                placeholder="Write a task..."
                value={taskInput}
                onChange={(e)=>setTaskInput(e.target.value)}
                onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    handleAddTask();
                  }
                }}
                className="flex-1 p-3 rounded-lg  text-white placeholder-gray-400
                border border-gray-300 focus:outline-none"
         />
        
         <button
         onClick={handleAddTask}
         className="bg-yellow-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-900"
         >Add</button>

      </div>

      </div>
        <div className="mt-6 bg-black/40 p-6 rounded-lg   hover:bg-black/50 transition ">
        <h3 className="text-white text-xl mb-4">Your Tasks</h3>
        {tasks.length===0 ? (<p className="text-gray-300">No tasks yet !!!</p>):search && filterdTask.length===0?(
          <p className="text-gray-300">No tasks found</p>):(
          filterdTask
          .map((task)=>(
            <div
            key={task._id}
            className="bg-black/30 p-4 rounded-lg mb-3 
                      flex items-center justify-between gap-4 text-white"
            >
              <div className="flex items-center gap-4 ">
                <button
                onClick={()=>toggleTaskStatus(task)}
                className={`w-6 h-6 rounded-full border-2 
                  flex items-center justify-center transition-all duration-200 ${task.completed ? 
                    "bg-yellow-400 border-yellow-400 shadow-md shadow-yellow-400/40":"border-gray-400 hover:border-yellow-400"}`}
                >
                  {task.completed && (
                    <span className="text-black text-sm font-bold">
                      ✓
                    </span>
                  )}
                </button>
                {editId===task._id ?(
                  <input
                  autoFocus 
                    type="text"
                    value={editText}
                    onChange={(e)=>setEditText(e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.key==="Enter")saveEdit(task._id);
                      if(e.key==="Escape") cancelEdit();
                      
                    }}
                    onBlur={()=>saveEdit(task._id)}
                      className="bg-black/40 border border-gray-600 rounded px-2 py-1 
                      text-white ring-1 ring-yellow-500"
                    />
                  ):(

                  <span className="text-white whitespace-nowrap">{task.title}</span>
                )}

              </div>
              <div className="flex items-center gap-5 ">
                <span className="text-xs text-gray-400 w-16 text-center">{formatDate(task.createdAt)}</span>
                {task.completed?(
                  <span className="text-xs bg-emerald-400/20 text-emerald-400 px-3 py-1 rounded-full min-w-[90px] text-center">
                    Completed
                  </span>
                ):(
                  <span  className="text-xs bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full  min-w-[90px] text-center">
                    Pending
                  </span>
                )}

              <button 
              onClick={()=>startEditing(task)}
              >
                <FaEdit size={18} className="text-yellow-400 cursor-pointer"/>
              </button>
              
              <button
              onClick={()=>handleDeleteTask(task._id)}
               className="text-red-400 hover:text-red-500">
                <FaTrash size={18} className="text-red-400 cursor-pointer"/>
              </button>
              </div>

            </div>

          ))
        )}

      </div>
      
    </div>
      </div>
  )
}

export default Dashboard
