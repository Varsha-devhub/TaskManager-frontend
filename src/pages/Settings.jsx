import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import PasswordInput from "../components/PasswordInput";
function Settings() {
  const navigate =useNavigate();
   const { logout } = useContext(AuthContext);
  const [darkMode,setDarkMode]=useState(localStorage.getItem("theme")!=="light");
  const [currentPassword,setCurrentPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const[ConfirmPassword,setConfirmPassword]=useState("");
  const[showPassword,setShowPassword]=useState({
    current:false,
    new:false,
    confirm:false
  });
  const [focusedFieled,setFocusedFieled]=useState(null);
  const [errorMsg,setErrorMsg]=useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const togglePassword=(field)=>{
    setShowPassword(prev=>({
      ...prev,[field]:!prev[field]
    }))
  }
  const handleChangePassword=async()=>{
    setErrorMsg("");
  setSuccessMsg("");

    if(!currentPassword || !newPassword || !ConfirmPassword){
      setErrorMsg("All fields are required");
      return;
    }
    if(currentPassword === newPassword) {
      setErrorMsg("New password must be different from current password");
      return;
    }
    if(newPassword !==ConfirmPassword){
      setErrorMsg("Passwords do not match")
      return;
    }
    try{
      const token=localStorage.getItem("token");
      const res=await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/change-password`,
        {currentPassword,newPassword},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      setSuccessMsg(res.data.message || "Password updated successfully");
      setErrorMsg("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }catch(error){
      setErrorMsg(error.response?.data?.message || "Password update failed");
       setSuccessMsg("")
    }
   
  }
 
      const handleLogout=()=>{
    logout();
    navigate("/")
      }
  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme","dark")
    }else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","light")
    }
  },[darkMode]);
  const isDisabled=!currentPassword || !newPassword || !ConfirmPassword || successMsg;
    

  
  return (
  <div className="min-h-screen flex bg-gradient-to-br 
  from-gray-900 via-gray-800 to-gray-900 ">

  {/* LEFT - FORM */}
  <div className="w-full md:w-1/2 flex items-center justify-center px-6
  border-r border-white/10 min-h-screen 
  ">
    {/* your settings card goes here */}
<div className="w-full max-w-lg text-white space-y-6">

      <h1 className="text-3xl font-bold  mb-8 tracking-wide">Settings</h1>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 
      backdrop-blur-md shadow-xl space-y-6">

        {/* Change password section */}
       
          <h2 className="text-lg font-semibold text-gray-300 mb-3">Change Password</h2>
          {errorMsg && (
            <p className="text-red-400 text-sm mb-3">
             {errorMsg}
            </p>
)         }

          {successMsg && (
            <p className="text-green-400 text-sm mb-3">
              {successMsg}
            </p>
          )}
            <div className="space-y-3">
                <div className="relative mb-6">
                 <PasswordInput
                 name="currentPassword"
                  type={showPassword.current?"text":"password"}
                  placeholder="Enter current password"
                  onFocus={()=>setFocusedFieled("current")}
                  onBlur={()=>setFocusedFieled(null)}
                   value={currentPassword}
                   
                  onChange={(e)=>setCurrentPassword(e.target.value)}
                  
                />
                  
                </div>
                  <div className="relative mb-4">
                    <PasswordInput
                      name="newPasswrod"
                      type={showPassword.new?"text":"password"}
                      placeholder="Create a strong password"
                      onFocus={()=>setFocusedFieled("new")}
                      onBlur={()=>setFocusedFieled(null)}
                      value={newPassword}
                      showStrength={true}
                      onChange={(e)=>setNewPassword(e.target.value)}
                      
                    />
                   
                </div>

                <div className="relative mb-4">
                      <PasswordInput
                      name="confirmPassword"
                        type={showPassword.confirm?"text":"password"}
                        placeholder="Confirm new password"
                        onFocus={()=>setFocusedFieled("confirm")}
                        onBlur={()=>setFocusedFieled(null)}
                        value={ConfirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                     
                      />
                      
       
                </div>
                <button 
                  type="submit"
                  onClick={handleChangePassword}
                  disabled={isDisabled}
                  className= {`w-full bg-gradient-to-r from-yellow-400 to-yellow-600 
                    hover:from-yellow-500 hover:to-yellow-600 
                    text-white p-2 rounded-lg font-semibold py-3
                    hover:scale-[1.02] transition duration-200 active:scale-95
                    ${isDisabled ? "opacity-50 cursor-not-allowed" 
                      : "hover:scale-[1.02] hover:shadow-lg  hover:shadow-yellow-500/30 active:scale-95"}`}
                >
                  Change password
                </button>
            </div>
        </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 
                flex justify-between items-center">

                <span className="text-gray-400">Theme</span>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="bg-white px-4 py-1 rounded text-black hover:bg-gray-600 transition"
                >
                  {darkMode ? "Dark" : "Light"}
                </button>

              </div>

        {/* Logout section */}
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10
                     flex justify-between items-center">

                      <span className="text-gray-400">Logout</span>

                        <button
                          onClick={handleLogout}
                          className="bg-red-800 px-4 py-2 rounded hover:bg-red-950 transition"
                        >
                          Logout
                        </button>

                    </div>
        

      </div>
      

    </div>
  

  {/* RIGHT - VISUAL */}
  <div className="hidden md:flex w-1/2 items-center justify-center
    bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
    
    <div className="text-center text-white px-10">
      <h2 className="text-4xl font-bold mb-4">
        Secure Your Account 🔐
      </h2>
      <p className="text-lg text-white/80">
        Update your password and keep your account safe.
      </p>
    </div>

  </div>

</div>


    
    
  );
}

export default Settings;