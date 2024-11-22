import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import Prescriptions from './pages/Prescriptions';
import LandingPage from './pages/LandingPage';
import ClinicView from './pages/ClinicView';
import KitchenView from './pages/KitchenView';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
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
              <ProtectedRoute allowedRoles={['clinic_staff']}>
                <ClinicView />
              </ProtectedRoute>
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
          <Route path="/users-list" element={<UserList />} />
          <Route path="/special-foods" element={<SpecialFoods />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
