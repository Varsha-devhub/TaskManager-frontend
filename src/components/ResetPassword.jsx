import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import PasswordInput from "./PasswordInput";
function ResetPassword() {
    const {resetToken}=useParams();
    const [password,setPassword]=useState("");
    const [confirm,setConfirm]=useState("")
    
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    const [touched, setTouched] = useState({
                            password: false,
                             confirm: false
                            });
    
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setErrorMsg("");
        setMessage("");
        
        
        if(!password || !confirm){
            setErrorMsg("All fields required");
            return;
        }
        if(password!==confirm){
            setErrorMsg("Password do not match");
            return;

        }
        try{
            setLoading(true);
            const res=await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${resetToken}`,
                {password}
            );
            
            setMessage(res.data.message);
            setPassword("");
            setConfirm("");
            setTouched({
                password:false,
                confirm:false
            })
        
        }catch(error){
            setErrorMsg(error.response?.data?.message || "Something went wrong")
        }
        finally{
            setLoading(false);
        }
        
    }
     const handleChangePassword=(e)=>{
        setPassword(e.target.value);
        }
    const handleChangeConfirmPassword=(e)=>{
    setConfirm(e.target.value);
     }
     const isDisabled =
                loading ||
                !password ||
                !confirm ||
                 password !== confirm;
 return (
        <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-black via-gray-900 to-gray-900">
            <form 
            
             onSubmit={handleSubmit}
            className="bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl w-96
                shadow-2xl border border-gray-700"
            >
                 <h2 className="text-white text-2xl font-semibold mb-6 text-center">Reset Password</h2>
                 
                    {!message && (
                        <>
                        {errorMsg &&(
                            <p className="text-red-500 text-sm mb-3">
                            {errorMsg}
                        </p>
                        )}
                       
                   
            <div className="relative mb-4">
                <PasswordInput
                    name="password"
                    
                    placeholder="New password"
                    value={password}
                    showStrength={true}
                    onBlur={() =>
                            setTouched((prev) => ({ ...prev, password: true }))}            
                    onChange={handleChangePassword}
                     error={
                        touched.password && !password
                            ? "Password is required"
                            : ""
                        }
                    />
            </div>
            <div className="relative mb-4">
                    <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirm password"
                   
                    value={confirm}
                    onChange={handleChangeConfirmPassword}
                    onBlur={() =>
                        setTouched((prev) => ({ ...prev, confirm: true }))
                        }
                    error={
                        touched.confirm && !confirm
                        ? "Confirm your password"
                        : confirm && password !== confirm
                        ? "Passwords do not match"
                        : ""
                        }
                     
                />
            </div>
               
              
               
                <button 
                type="submit"
                disabled={isDisabled}
                className= {`w-full p-2 rounded text-white transition
                    ${isDisabled 
                        ?"bg-gray-500  opacity-50 cursor-not-allowed"
                        :" bg-green-500 hover:scale-[1.02] hover:shadow-lg"}`}
                >
                    {loading? "Processing":"Set password"}
                </button>
                </>
                 )}

                 {message &&(
                <div>
                <p className="text-green-400 text-sm mb-2">
                    {message}
                </p>
                <button onClick={()=>navigate("/")}
                    className="w-full bg-blue-500 mt-2 p-3 
                    rounded text-white hover:bg-green-600"
                    >
                Go to Login
                </button>
                </div>
               )}
               
                <p className="text-gray-500 text-xs text-center mt-4">
                    Make sure your password is Strong 🔐
                </p>
                

            </form>

        </div>

    )
}
export default ResetPassword;