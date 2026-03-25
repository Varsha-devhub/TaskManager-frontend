import { FaCalendarAlt,FaCog, FaHome, FaPlus, FaTasks, FaUser } from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
function Sidebar() {
    const navigate=useNavigate();
    const {logout}=useContext(AuthContext);
    const [collapsed,setCollapsed]=useState(false);
       const handleLogout=()=>{
    logout();
    navigate("/")
  }
    const menuItems=[
        {name:"Dashboard",path:"/dashboard",icon:<FaHome/>},
      
 
        {name:"Profile",path:"/profile",icon:<FaUser/>},
        {name:"Settings",path:"/settings",icon:<FaCog/>}
    ]
    return(
    
        <div className={`${collapsed? "w-20": "w-64"} bg-black/60 backdrop-blur-md text-white flex
                         flex-col  p-6`}>
                            <button onClick={()=>setCollapsed(!collapsed)}
                                    className="mb-6 text-gray=300 hover:text-white"
                                >
                               ☰ 
                            </button>
                            {/* Top section */}
                            <div>
                                {!collapsed &&(
                                <h2 className="text-xl font-bold mb-8">Task Manager</h2>)}
                                <nav className="space-y-4">
                                    {menuItems.map((item)=>(
                                        <NavLink
                                        key={item.name}
                                        to={item.path}
                                        className= {({isActive})=>` flex items-center ${collapsed? " justify-center ": " gap-3"} 
                                         p-2 rounded justify-start transition
                                         ${isActive?"bg-yellow-500 text-white":"hover:bg-white/10 text-gray-300"}`}
                                        >
                                         {item.icon}
                                         {!collapsed && item.name}   
                                        </NavLink>

                                    ))}

                                </nav>
                            </div>
                            {/* Bottom section */}
                            <button onClick={handleLogout} 
                            className="bg-red-800 p-2 rounded hover:bg-red-950 transition "> {!collapsed && "Logout"}</button>


        </div>
    )
}
export default Sidebar;