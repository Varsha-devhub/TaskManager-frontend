import { Routes,Route } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ResetPassword from './components/ResetPassword';

function App() {
  

  return (
    <>
      <div className='min-h-screen  bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950 bg-fixed'>
       
          <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route index element={
               < PublicRoute>
                <Login/>
                </PublicRoute>
                }/>
              <Route path='register' element={
                <PublicRoute>
                <Register/>
                </PublicRoute>
                }/>
              <Route path='dashboard' element={
                <ProtectedRoute>
                <Dashboard/>
                </ProtectedRoute>
                }/>
                <Route path='profile' element={
                  <ProtectedRoute><Profile/>
                  </ProtectedRoute>
                }/>
                <Route path='settings' element={
                  <ProtectedRoute><Settings/>
                  </ProtectedRoute>
                }/>
                <Route path='reset-password/:resetToken' element={
                  <ResetPassword/>
                  
                }/>


            </Route>
          </Routes>

      </div>
      
    </>
  )
}

export default App
