import {useState} from "react";

import { FaEye,FaEyeSlash } from "react-icons/fa";
import { checkStrength } from "./utils/passwordStrength";
function PasswordInput({name,value,onChange,onBlur,className,error,showStrength=false,placeholder="Password"}){
    const [show,setShow]=useState(false);
    const [strength,setStrength]=useState("");
    const [isFocused, setIsFocused] = useState(false);
    const handleChange=(e)=>{
        const val=e.target.value;
        onChange(e);
        
        if(showStrength){
            setStrength(checkStrength(val))
        }
    }
    return(
        <div className="mb-4 w-full">
            <div className="relative">
                <input type= {show ? "text" : "password"}
                name={name}
                value={value}
                onChange={handleChange}
                onFocus={()=>setIsFocused(true)}
                onBlur={(e)=>{
                    setIsFocused(false);
                    onBlur && onBlur(e);
                }}
                placeholder={placeholder}
                className={`w-full px-4 h-12 rounded-xl bg-black/60 text-white 
                    placeholder-gray-400 ${isFocused || value ? "pr-10" :"pr-4"}
                     hover:border-gray-400 transition
                border ${
                    error ? "border-red-500 focus:ring-blue-500"
                    :"border-gray-600  focus:ring-blue-500 focus:ring-offset-1 hover:border-white/40"
                }
                focus:outline-none focus:ring-2 transition duration-200
                `}
                
                />
                    {error && (
                        <p className="text-red-500 text-sm mt-1 ">
                        {error}
                        </p>
                    )}
                  {(isFocused || value) && (
                    <span
                        onMouseDown={(e) => e.preventDefault()} // prevents blur
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex-items-center 
                         cursor-pointer text-gray-400 hover:text-white"
                    >
                        {show ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    )}
        </div>

       {showStrength && value && (
        <div className="mt-2"> 
            <div className="w-full h-2 bg-gray-700 rounded">
                <div className={`h-2 rounded-full transition-all duration-300
                    ${
                        strength==="Weak" ?"w-1/3 bg-red-500"
                        :strength==="Medium"? "w-2/3 bg-yellow-400"
                        :"w-full bg-green-500"
                    }
                    `}>

                </div>

            </div>
            <p className={`text-sm mt-1
                ${strength==="Weak"?"text-red-400"
                    :strength==="Medium" ? "text-yellow-400"
                    :"text-green-400"
                }
                `}>
                    {strength} password
            </p>

        </div>
       )}

        </div>
    )
}
export default  PasswordInput;