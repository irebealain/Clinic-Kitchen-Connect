import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import UserList from './pages/UserList';
import Prescriptions from './pages/Prescriptions';
import LandingPage from './pages/LandingPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign_up' element={<SignUp/>}/>
        <Route path='/dashboard' element = {<Dashboard/>} />
        <Route path='/profile' element = {<Profile/>} />
        <Route path= '/users-list' element = {<UserList/>} />
        <Route path= '/prescriptions' element = {<Prescriptions/>} />
      </Routes>
    </Router>
    
  )
}

export default App
