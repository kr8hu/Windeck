//React
import { ReactNode, useEffect } from "react";

//Tauri
import {
  enable,
  isEnabled
} from '@tauri-apps/plugin-autostart';

//React router
import { useNavigate } from "react-router-dom";

//Context
import { AppProvider } from "../../context/App";

//Components
import RouteStack from "./Routes";
import InputLayout from "../../layouts/InputLayout";


/**
 * App
 * 
 * Fő komponens
 * @returns 
 */
function App(): ReactNode {
  /**
   * Hooks
   * 
   */
  const navigate = useNavigate();


  /**
   * checkAutostart
   */
  const checkAutostart = async (): Promise<void> => {
    const autoStart = await isEnabled();

    if (!autoStart) {
      await enable();
    }
  }


  /**
   * useEffect
   * 
   */
  useEffect(() => {
    //Navigálás a kezdőoldalra
    navigate('/');

    //Alkalmazás beállítása automatikus indításra
    checkAutostart();

    //Context menu listener
    document.addEventListener('contextmenu', (e: any) => {
      //e.preventDefault();
    });

    return () => {
      window.removeEventListener('contextmenu', () => { });
    }
    //eslint-disable-next-line
  }, []);


  return (
    <AppProvider>
      <RouteStack />
      <InputLayout />
    </AppProvider>
  );
}

export default App;
