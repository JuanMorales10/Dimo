import './App.css';
import RegistrationFormHost from './components/RegistrationForm/RegistrationFormHost';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm'


function App() {
  return (
    <div className="App">
      {/* <RegistrationForm />
      <RegistrationFormHost/> */}
      <LoginForm  />
    </div>
  );
}

export default App;
