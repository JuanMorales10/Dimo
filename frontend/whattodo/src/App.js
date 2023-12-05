import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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



function App() {
  return (
    <UserProvider> 
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={RegisterOptions} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/create-service" component={CreateServiceForm} />
            <Route exact path="/register-normal" component={RegistrationForm} />
            <Route exact path="/register-host" component={RegistrationFormHost} />
            <Route exact path='/service/:id/detail' component={ServiceDetail} />
            <Route exact path='/user/profile' component={UserProfile} />
            <Route exact path='/user/editUser' component={EditUserProfile} />
            <Route exact path='/nosotros' component={AboutUs} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

