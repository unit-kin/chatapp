
import './App.css';
import { SignUp } from './pages/SignUp';
import{Login} from './pages/Login';
import {Home} from './pages/Home';
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser} =useContext(AuthContext)

  const ProtectedRoute =({children}) =>{
    if(!currentUser){
      return <Navigate to='/Login'/>
    }
    return children
  };
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/'>
      <Route index element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/> 
      <Route path='Login' element={<Login/>}/>
      <Route path='Sign-Up' element={<SignUp/>}/>
      
      </Route>
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
