//React
import { useEffect } from "react";

//React router
import { useNavigate } from "react-router-dom";

//Context
import { AppProvider } from "../../context/App";

//Components
import Gamepad from "../Gamepad";
import RouteStack from "../../routes";


/**
 * App
 * 
 * Fő komponens
 * @returns 
 */
function App() {
  //Hooks
  const navigate = useNavigate();


  useEffect(() => {
    navigate('/');

    document.addEventListener('contextmenu', (e: any) => {
      e.preventDefault();
    });

    return () => {
      window.removeEventListener('contextmenu', () => { });
    }
    //eslint-disable-next-line
  }, []);


  return (
    <AppProvider>
      <RouteStack />
      <Gamepad />
    </AppProvider>
  );
}

export default App;
