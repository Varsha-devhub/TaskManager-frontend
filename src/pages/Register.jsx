import {  useState } from "react"
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import "./Register.css"
import PasswordInput from "../components/PasswordInput";
function Register()  {
  const [serverError,setServerError]=useState("");
  const [errors,setErrors]=useState({})
  const [touched,setTouched]=useState({})
 const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setServerError("");
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
    // setErrors(validateForm())
  }
  const handleBlur=(e)=>{
    const {name}=e.target;
    setTouched(prev=>({
      ...prev,
      [name]:true
    }))
    
  }
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateForm=()=>{
    let newErrors={};
    if(!formData.name){
      newErrors.name="Name is required";
    }
    
    if(!formData.email){
      newErrors.email="Email is required";
    }else if(!emailRegex.test(formData.email)){
      newErrors.email="Invalid email format"
    }
    if(!formData.password){
      newErrors.password="Password is required";
    }else if(formData.password.length<6){
      newErrors.password="Password must be atleast 6 charecters";
    }
    if(!formData.confirmPassword){
      newErrors.confirmPassword="Confirm your password";
    }else if(formData.password !== formData.confirmPassword){
      newErrors.confirmPassword="Password do not match";
    }
    // setErrors(newErrors);
    return newErrors;
  }
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setServerError("");
    // const newErrors=validateForm();
    const newErrors=validateForm();
    setErrors(newErrors);
    setTouched({
      name:true,
      email:true,
      password:true,
      confirmPassword:true
    });
    
    if(Object.keys(newErrors).length>0){
      return;
    }
    setLoading(true);
    try{
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formData);
      
      localStorage.setItem("token",response.data.token);
      setServerError("");
     setMessage("Registration successful. Please login.");
      
   
    }catch(error){
      if(error.response && error.response.status === 401){
        setServerError("User already exists")
      }else{
        setServerError("Registration failed");
      }
    }finally{
      setLoading(false);
    }
  }
  const isDisabled =!formData.name ||
                    !formData.email ||
                    !formData.password ||
                    !formData.confirmPassword ||
   Object.keys(errors).length > 0;
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] ">
      <div className="bg-gray-950/70 backdrop-blur-lg p-8 rounded-2xl
       shadow-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)]
       w-96 border border-gray-800">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Register</h2>
      {message ? (
  <div className="text-center">
    <p className="text-green-400 mb-4">
      {message}
    </p>

    <button
      onClick={() => navigate("/")}
      className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
    >
      Go to Login
    </button>
  </div>
) : (
      <form onSubmit={handleSubmit}>
        <input
        className={`w-full border bg-black/60  p-3 rounded-lg mb-4 
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2
         focus:ring-blue-500
          hover:border-gray-400 transition 
         ${
      touched.name && !formData.name.trim()
        ? "border-red-500"
        : "border-gray-600"
    }
                 focus:outline-none focus:ring-2 focus:ring-blue-500`} 
             type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              
        />
              {touched.name && !formData.name.trim() && (
                <p className="text-red-500 text-sm mb-2">
                  Name is required
                </p>
              )}
        <input className= {`w-full border bg-black/60  p-3 rounded-lg mb-4 
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2
         focus:ring-blue-500
          hover:border-gray-400 transition 
          ${
          touched.email &&
          (!formData.email || !emailRegex.test(formData.email))
          ? "border-red-500"
          : "border-gray-600"
            } `} 
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {/* Required */}
              {touched.email && !formData.email && (
                <p className="text-red-500 text-sm mb-2">
                  Email is required
                </p>
              )}

                {/* Invalid format */}
                {touched.email &&
                formData.email &&
                !emailRegex.test(formData.email) && (
                <p className="text-red-400 text-sm mb-2">
                Invalid email format
                </p>
                )}
        
        <div className="password-wrapper">
        <PasswordInput 
                
                name="password"
                placeholder="Password"
                value={formData.password}
               onChange={handleChange}
               onBlur={handleBlur}
               showStrength={true}
               error={
                  touched.password && !formData.password
                ? "Password is required"
                : formData.password && formData.password.length < 6
                ? "Password must be at least 6 characters"
                : ""
                }
               
               
        />
        
       </div>
         

        <div className="password-wrapper">
        <PasswordInput  
                
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && !formData.confirmPassword
                      ?"Confirm your password"
                      :formData.confirmPassword && formData.password !==formData.confirmPassword
                      ?"Password do not match"
                      :""
                  
                }
         />
        
         </div>
        
        <button
        type="submit"
        disabled={isDisabled}
        className= {`w-full bg-gradient-to-br from-black-400 to-gray-400 
        hover:from-blue-500 hover:to-green-500 
        text-white p-2 rounded-lg font-semibold py-3
        hover:scale-[1.02] transition duration-200 active:scale-95
        ${isDisabled? "opacity-50 cursor-not-allowed":"hover:scale-[1.02] hover:shadow-lg"}
        
        `}
        >
         {loading ?  
           "Registering...":"Register"} 
          
        </button>
      </form>
)}
        <p className="text-sm text-gray-300 text-center mt-4">
                      Already have an account?{" "}
                    <Link
                      to="/"
                      className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium"
        >
           Login
        </Link>
      </p>
      </div>
    </div>
  )
}

export default Register
