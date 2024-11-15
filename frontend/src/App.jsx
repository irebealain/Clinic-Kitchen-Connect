import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import Prescriptions from './pages/Prescriptions';
import LandingPage from './pages/LandingPage';
import ClinicView from './pages/ClinicView';
import KitchenView from './pages/KitchenView';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign_up' element={<SignUp/>}/>
        <Route path='/dashboard' element = {<ClinicView/>} />
        <Route path='/kitchen-dashboard' element = {<KitchenView/>} />
        <Route path= '/users-list' element = {<UserList/>} />
        <Route path= '/prescriptions' element = {<Prescriptions/>} />
      </Routes>
    </Router>
    
  )
}

export default App
