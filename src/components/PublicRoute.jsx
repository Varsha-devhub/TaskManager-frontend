import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function PublicRoute({children}) {
    const {isLoggedIn}=useContext(AuthContext);
    if(isLoggedIn){
        return <Navigate to="/dashboard"/>
    }
    return children;
}
export default PublicRoute;