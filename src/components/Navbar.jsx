import {NavLink} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "./Navbar.css"
function Navbar() {
    const{isLoggedIn,user}=useContext(AuthContext);
    return(
        <nav className="navbar">
            {!isLoggedIn &&(
              <>
              <div className="nav-right">
             <NavLink to="/">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            </div>
              </>  
            )}
            {isLoggedIn &&(
                <div className="nav-right">
                <>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            {user && < span className="user-email">{user.email}</span>}
            </>
            </div>
            )}
            

        </nav>
    )
    
}
export default Navbar;