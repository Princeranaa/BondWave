import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import { Toaster } from "react-hot-toast";

console.log("BASE_URL:", import.meta.env.VITE_API_URL);

createRoot(document.getElementById("root")).render(
  
    <Provider store={appStore}>
       <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>

);
