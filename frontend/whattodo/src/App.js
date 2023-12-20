import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationFormHost from './components/RegistrationForm/RegistrationFormHost';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './pages/user/Home';
import CreateServiceForm from './pages/service/CreateService';
import RegisterOptions from './components/RegisterOptions/RegisterOptions';
import { UserProvider } from './components/UserContext/UserContext'; 
import ServiceDetail from './components/ServiceDetail/ServiceDetail';
import UserProfile from './components/UserProfile/UserProfile';
import NotFoundPage from './pages/user/NotFound/NotFoundPage';
import EditUserProfile from './pages/user/EditUserProfile/EditUserProfile';
import AboutUs from './components/AboutUs/AboutUs';
import ReservaPage from './pages/service/ReservaPage/ReservaPage';
import ServiceListView from './pages/service/ServiceListView/ServiceListView';
import Dashboard from './components/Dashboard/Dashboard';
import EditServicePage from './pages/service/EditServicePage/EditServicePage';

function App() {
  return (
    <UserProvider> 
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterOptions />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/create-service" element={<CreateServiceForm />} />
            <Route path="/register-normal" element={<RegistrationForm />} />
            <Route path="/register-host" element={<RegistrationFormHost />} />
            <Route path='/service/:id/detail' element={<ServiceDetail />} />
            <Route path="/search-results" element={<ServiceListView />} />
            <Route path='/user/profile' element={<UserProfile />} />
            <Route path='/user/editUser' element={<EditUserProfile />} />
            <Route path='/nosotros' element={<AboutUs />} />
            <Route path="/edit-service/:serviceId" element={<EditServicePage />} />
            <Route path="/reserva/:serviceId" element={<ReservaPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

