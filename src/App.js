import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Etusivu from './pages/Etusivu';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Suosikit from './pages/Suosikit';
import Ryhmät from './pages/Ryhmät';
import Arvostelut from './pages/Arvostelut';
import Näytökset from './pages/Näytökset';
import Register from './pages/Register';
import Haku from './pages/Haku';
import UserProvider from './context/UserProvider';
import PrivateRoute from './pages/PrivateRoute';


function App() {

  return (
    <UserProvider>
    <Header></Header>
    <Navbar></Navbar>
    <div className='container'>
      <Routes>
        <Route path="/" exact element={<Etusivu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<PrivateRoute />}>
          <Route path="/ryhmät" element={<Ryhmät />} />
          <Route path="/suosikit" element={<Suosikit />} />
        </Route>
        <Route path="/arvostelut" exact element={<Arvostelut />} />
        <Route path="/näytökset" exact element={<Näytökset />} />
        <Route path="/haku" exact element={<Haku />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
    <Footer></Footer>
    </UserProvider>
  );
  
}

export default App;
