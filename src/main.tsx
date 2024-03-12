import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import axios from "axios";

// Intercepta las solicitudes antes de ser enviadas y modifica la configuración de la solicitud
axios.interceptors.request.use(config => {
  // Obtiene el token de autenticación almacenado en el localStorage del navegador
  const authToken = localStorage.getItem('token');

  // Verifica si hay un token de autenticación
  if (authToken) {
    // Si hay un token, agrega el encabezado de autorización a la configuración de la solicitud
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  // Devuelve la configuración de la solicitud modificada
  return config;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
