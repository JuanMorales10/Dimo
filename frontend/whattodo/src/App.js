import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationFormHost from './components/RegistrationForm/RegistrationFormHost';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm'
import Home from './pages/user/Home';
import CreateServiceForm from './pages/service/CreateService';
import RegisterOptions from './components/RegisterOptions/RegisterOptions';



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={RegisterOptions} />
          <Route path="/login" component={LoginForm} />
          <Route path="/create-service" component={CreateServiceForm} />
          <Route path="/register-normal" component={RegistrationForm} />
          <Route path="/register-host" component={RegistrationFormHost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
