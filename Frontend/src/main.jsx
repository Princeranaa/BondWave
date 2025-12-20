import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import { BASE_URL } from "./utils/Constant.js";
console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

console.log("localcodeURL", BASE_URL)

createRoot(document.getElementById("root")).render(
  
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>

);
