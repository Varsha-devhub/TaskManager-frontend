import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function MainLayout() {
   return(
    <>
    <div className="min-h-screen flex flex-col">
    <Navbar/>
    <div className="container">
        <Outlet/>
    </div>
    <footer 
    className="w-full mt-10 py-4 text-center text-gray-400 text-sm border-t border-white/10 bg-black/30 backdrop-blur-sm">
                 © 2026 Task Manager • Built with ❤️ by Varsha
    </footer>
    </div>
    </>
   ) 
}
export default MainLayout;