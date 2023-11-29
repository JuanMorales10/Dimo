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

function App() {
  return (
    <UserProvider> 
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegisterOptions} />
            <Route path="/login" component={LoginForm} />
            <Route path="/create-service" component={CreateServiceForm} />
            <Route path="/register-normal" component={RegistrationForm} />
            <Route path="/register-host" component={RegistrationFormHost} />
            <Route path='/service/:id/detail' component={ServiceDetail} />
            <Route path='/user/profile' component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

