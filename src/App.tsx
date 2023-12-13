//React
import { useEffect } from "react";

//React router
import { useNavigate } from "react-router-dom";

//Context
import { AppProvider } from "./context/App";

//Shared
import RouteStack from "./routes";

//Styles
import "./App.css";


function App() {
  //React router
  const navigate = useNavigate();


  useEffect(() => {
    navigate('/');
    //eslint-disable-next-line
  }, []);


  return (
    <AppProvider>
      <RouteStack />
    </AppProvider>
  );
}

export default App;
