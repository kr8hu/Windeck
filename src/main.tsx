import ReactDOM from "react-dom/client";

//React router
import { BrowserRouter } from "react-router-dom";

//Components
import App from "./components/App/App";

//Styles
import "./styles.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
