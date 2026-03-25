
import { useState ,useEffect,useRef} from "react";
import {FaBell,FaSearch} from "react-icons/fa"
 
function Topbar({user,search,setSearch,tasks}) {
    const notificationRef=useRef(null);
    const [showNotifications,setShowNotifications]=useState(false);
    const pendingTasks=tasks.filter(task=>!task.completed)||[];
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(notificationRef.current && !notificationRef.current.contains(event.target)){
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown",handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[]);
    
    return(
        
        <div className="bg-black/40 border border-white/10 backdrop-blur-md 
                    rounded-xl px-6 py-4 flex items-center justify-between mb-6 shadow-xl shadow-black/30">
            <div className="relative max-w-md w-full">
                <FaSearch className="absolute left-3 top-3 text-gray-400"/>
            <input 
                type="text" 
                placeholder="Search tasks..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full bg-black/40 
                border border-white/10 text-white 
                rounded-lg pl-10 pr-4 py-2 focus:outline-none"
            />
        </div>
        <div className="flex items-center gap-6 " >
             <div className="relative" ref={notificationRef}>
            <FaBell className="text-xl text-gray-300 cursor-pointer"
            onClick={()=>setShowNotifications(prev=>!prev)}
            />
           {pendingTasks.length> 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white px-1 rounded-full">
                    {pendingTasks.length}
                     </span>
                    )}
                    </div>
            {showNotifications && (
                <div className="absolute right-10   top-8 w-64
                bg-black/80 backdrop-blur-md border border-white/10 rounded-lg
                shadow-lg p-4 z-[9999]">
                   
                    {pendingTasks.length===0?(
                        <p>No Pending tasks</p>
                    ):(
                        pendingTasks.map(task=>(
                            <div key={task._id}
                            className="text-sm text-gray-400 mb-1"
                            >
                            • Task "{task.title}" is Pending
                            </div>
                            
                        ))
                    )}
                </div>
            )}
            
            <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex 
                items-center justify-center text-white font-bold">
    {user?.email?.charAt(0).toUpperCase()}
  </div>
                <span className="text-white font-medium">
                    Welcome back, {user?.email?.split("@")[0] || "User"}
                </span>
            </div>

        </div>

        </div>
    )
}
export default Topbar;