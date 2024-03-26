import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
const [user, setUser] = useState(null)

  return (
    <>
    <Header></Header>
    <Navbar></Navbar>
    <div className='container'>
      <Routes>
        <Route path="/" exact element={<Login setUser={setUser}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About user={user}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
    <Footer></Footer>
    </>
  );
  
}

export default App;
