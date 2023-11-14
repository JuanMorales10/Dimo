import './App.css';
import RegistrationFormHost from './components/RegistrationForm/RegistrationFormHost';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm'
import Carousel from 'react-multi-carousel';
import {BrowserRouter} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
   
    <NavBar />
    {/* <RegistrationForm /> */}
    {/* <RegistrationFormHost /> */}
     {/* <div className='cor' > */}
    {/* </div> */}
    <Cards />
    </div>
    </BrowserRouter>
  );
}

export default App;
