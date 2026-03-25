import { createContext,useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
export const AuthContext=createContext();
function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem("token"));
    const navigate=useNavigate();
    
      useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        
        const token=localStorage.getItem("token");
        if(!token){
          setLoading(false);
          return;
        }
                  
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`,
          
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        )
        setUser(res.data)
        
      }catch(error){
        if(error.response && error.response.status===401){
          localStorage.removeItem("token");
          logout();
    navigate("/")
        }
      }finally{
        setLoading(false);
      }
    }
    fetchProfile();
  },[]);
    const login=async(token)=>{
        localStorage.setItem("token",token);
       const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
       }) 
       setUser(res.data)
        setIsLoggedIn(true);
 
        
    }
    const logout=()=>{
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{isLoggedIn,login,logout,user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;