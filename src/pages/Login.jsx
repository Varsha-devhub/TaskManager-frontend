import { useState,useContext,useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
  import "./Login.css";
import { FaEye,FaEyeSlash } from "react-icons/fa";

function Login() {
 const navigate =useNavigate(); 
 const {login}=useContext(AuthContext);
 const [serverError,setServerError]=useState("");
 const[showPassword,setShowPassword]=useState(false);
 const [loading,setLoading]=useState(false);
 const [errors,setErrors]=useState({})
 const [message,setMessage]=useState("")
  const [touched,setTouched]=useState({})
const [formData,setFormData]=useState({
  email:"",
  password:""
});
const [showForgot,setShowForgot]=useState(false);
const [email,setEmail]=useState("");

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setServerError("");
    setMessage("")
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  const handleBlur=(e)=>{
    const {name}=e.target;
    setTouched(prev=>({
      ...prev,
      [name]:true
    }))
  }
const validateForm=()=>{
      let newErrors = {};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!formData.email) {
  newErrors.email = "Email is required";
} else if (!emailRegex.test(formData.email)) {
  newErrors.email = "Invalid email format";
}

if (!formData.password) {
  newErrors.password = "Password is required";
}

setErrors(newErrors);
return newErrors;
  }

useEffect(()=>{
  validateForm();
},[formData])

  

const handleSubmit= async(e)=>{
  e.preventDefault();
  setServerError("");
  setTouched({
        email:true,
        password:true,
      });
      const newErrors=validateForm()
      if(Object.keys(newErrors).length>0){
        return;
      }
  
  
  setLoading(true);
   try{
    
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,formData);
      console.log("success :",response)
      login(response.data.token);
      
      navigate("/dashboard");
    }catch(error){
      
const serverMessage=error.response?.data?.message;
    if(serverMessage ){
      setServerError(serverMessage)
    }else{
      setServerError("Something went wrong .Try again.")
    }
    }finally{
      setLoading(false);
    }
}
const handleForgot=async()=>{
  try{
    setLoading(true);
    setMessage("");
    setServerError("");
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
      {email}
    );
    setMessage("Reset link sent to your email ");
      setServerError("");
  }catch(error){
    setServerError("Error in sending email");
    setMessage("")
  }finally{
    setLoading(false);
  }
}

return (
  
    <div className="  flex items-center justify-center min-h-[calc(100vh-60px)] ">
      
      <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl
       shadow-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)]
       w-96 border border-gray-700">
      <p className="text-center text-sm text-gray-300 mb-2">Welcome back </p>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Login</h2>
        
      <form  onSubmit={handleSubmit} noValidate>
        <input className= {`w-full border  p-3 rounded-lg mb-4 
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2
         focus:ring-blue-500
          hover:border-gray-400 transition 
        ${touched.email && errors.email ? "border-red-500" : "border-gray-300" } `} 
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
        />
        {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1 mb-3">{errors.email}</p>
)}
        <div className="password-wrapper">
        <input className={`w-full border  p-3 rounded-lg mb-4 
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2
         focus:ring-blue-500
          hover:border-gray-400 transition 
        ${touched.email && errors.email ? "border-red-500" : "border-gray-300" } `}  type={showPassword?"text":"password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
        />
        <span className="eye-icon"
              onClick={()=>setShowPassword(!showPassword)}
        >
              {showPassword?<FaEyeSlash/>:<FaEye/>}
        </span>
        </div>
        {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1 mb-3">{errors.password}</p>
)}
{serverError && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {serverError}
          </p>
        )}
        <button className="w-full bg-gradient-to-br from-black-400 to-gray-400 
        hover:from-blue-500 hover:to-green-500 
        text-white p-2 rounded-lg font-semibold py-3
        hover:scale-[1.02] transition duration-200 active:scale-95" type="submit"
        disabled={loading}>
         {loading?"Logging in...":"Login"} 
          </button>
      </form>
      <p className="text-sm text-gray-300 text-center mt-4">
                Don't have an account?{" "}
              <Link
                to="/register"
                className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
  >
                   Register
              </Link>
      </p>
        <p className="text-sm text-blue-400 cursor-pointer text-center  mt-2"
            onClick={()=>setShowForgot(true)}
        >
          Forgot Password?  

        </p>
       { showForgot && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-80 relative">
            {/* close button */}
            <button
              className="absolute top-2 right-2 text-white"
              onClick={()=>setShowForgot(false)}
            >
               ✖
            </button>
            <h2
            className="text-white text-lg mb-4"
            >Forgot Password</h2>
            <input 
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border
              border-gray-600 mb-3"
            />
            <button className="w-full bg-green-500 p-2 rounded text-white"
                    disabled={loading}
                   
                    onClick={handleForgot}
            >
               {loading ? "Sending..." : "Send Reset Link"}
              
            </button>
            {message && (
          <p className="text-green-400 text-sm mb-3 text-center">
            {message}
          </p>
        )}
        

          </div>

        </div>
       )}
     
    </div>
  </div>
  )
}

export default Login
