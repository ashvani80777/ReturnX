import { BrowserRouter, useLocation } from "react-router-dom";

import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";


function Layout(){

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return(
    <>
      {!hideNavbar && <Navbar />}
      <AppRouter />
    </>
  );
}


function App(){

  return(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

}


export default App;