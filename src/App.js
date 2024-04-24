import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Etusivu from "./pages/Etusivu";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Suosikit from "./pages/Suosikit";
import Ryhmät from "./pages/Ryhmät";
import Arvostelut from "./pages/Arvostelut";
import Näytökset from "./pages/Näytökset";
import Register from "./pages/Register";
import Haku from "./pages/Haku";
import OmaSivu from "./pages/OmaSivu";
import UusiArvostelu from "./pages/UusiArvostelu";
import UserProvider from "./context/UserProvider";
import PrivateRoute from "./pages/PrivateRoute";
import RyhmänOmaSivu from "./pages/RyhmänOmaSivu";
import UusiElokuvaRyhmään from "./pages/UusiElokuvaRyhmään";
import UusiArvosteluRyhmään from "./pages/UusiArvosteluRyhmään";

function App() {
  return (
    <UserProvider>
      <Navbar></Navbar>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Etusivu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/ryhmanomasivu/:idgroup/:groupname"
            element={<RyhmänOmaSivu />}
          />
          <Route
            path="/uusiarvostelu/:mediaType/:movieId/:title"
            element={<UusiArvostelu />}
          />
          <Route
            path="/uusiarvosteluryhmään/:idreviews"
            element={<UusiArvosteluRyhmään />}
          />
          <Route
            path="/Uusielokuvaryhmään/:mediaType/:movieId/:title"
            element={<UusiElokuvaRyhmään />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/suosikit" element={<Suosikit />} />
            <Route path="/omasivu" exact element={<OmaSivu />} />
          </Route>
          <Route path="/suosikit/:userid" element={<Suosikit />} />
          <Route path="/ryhmät" element={<Ryhmät />} />
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
