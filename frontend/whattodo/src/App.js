import './App.css';
import RegistrationFormHost from './components/RegistrationForm/RegistrationFormHost';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm'
import Carousel from 'react-multi-carousel';
import {BrowserRouter} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import Home from './pages/user/Home';
import CreateServiceForm from './pages/service/CreateService';

// Importar Leaflet CSS
import 'leaflet/dist/leaflet.css';
// Importar Leaflet y configurar las imágenes de los marcadores
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


function App() {
  return (
    <BrowserRouter>
    <div className="App">
   <CreateServiceForm />
    </div>
    </BrowserRouter>
  );
}

export default App;
