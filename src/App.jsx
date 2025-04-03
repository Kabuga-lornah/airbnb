import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyList from './components/Property';
import Booking from './components/Booking';
import Review from './components/Review';
import Search from './components/Search';
import Authentication from './components/Authentication';
import Admin from './components/Admin';
import { Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;