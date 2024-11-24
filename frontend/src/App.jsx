import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserList from './pages/UserList';
import Prescriptions from './pages/Prescriptions';
import LandingPage from './pages/LandingPage';
import ClinicView from './pages/ClinicView';
import KitchenView from './pages/KitchenView';
import Charts from './components/Charts';
import SpecialFoods from './pages/SpecialFoods';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/charts" element={<Charts />} />
          <Route
            path="/dashboard"
            element={
              <ClinicView />
            }
          />
          <Route
            path="/kitchen-dashboard"
            element={
              <ProtectedRoute allowedRoles={['kitchen_staff']}>
                <KitchenView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prescriptions"
            element={
              <ProtectedRoute allowedRoles={['clinic_staff']}>
                <Prescriptions />
              </ProtectedRoute>
            }
          />
          <Route path="/users-list" element={<UserList />}/>
          <Route path="/special-foods" element={<SpecialFoods />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
