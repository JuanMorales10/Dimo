import './App.css';
import RegistrationFormHost from './components/RegistrationForm/RegistrationFormHost';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm'
import {BrowserRouter} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
   
    {/* <NavBar /> */}
    <RegistrationForm />
    {/* <RegistrationFormHost /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
