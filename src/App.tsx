//React
import { useEffect } from "react";

//React router
import { useNavigate } from "react-router-dom";

//Context
import { AppProvider } from "./context/App";
import { RouteProvider } from "./context/Route";
import { GamepadProvider } from "./context/Gamepad";

//Shared
import RouteStack from "./routes";

//Styles
import "./App.css";
import Gamepad from "./Gamepad";


function App() {
  //React router
  const navigate = useNavigate();


  useEffect(() => {
    navigate('/');
    //eslint-disable-next-line
  }, []);


  return (
    <AppProvider>
      <GamepadProvider>
        <Gamepad>
          <RouteProvider>
              <RouteStack />
          </RouteProvider>
        </Gamepad>
      </GamepadProvider>
    </AppProvider>
  );
}

export default App;
