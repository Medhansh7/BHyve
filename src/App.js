import './App.css';
import NavBar from './components/NavBar';
import Routes from './Routes';
import { BrowserRouter as Router } from "react-router-dom";



function App() {
  return (
    <div >
      <Router>
        <NavBar />
        <Routes />
      </Router>

    </div>
  );
}

export default App;
