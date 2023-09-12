import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {MovieProvider} from "./context/MovieContext.jsx";
import { Toaster } from 'sonner'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <MovieProvider> {/* Wrap your app with MovieProvider */}
     <Toaster richColors />
      <App />
    </MovieProvider>
  </React.StrictMode>,
);
