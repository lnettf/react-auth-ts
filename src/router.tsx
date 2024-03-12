import { Outlet, createBrowserRouter } from "react-router-dom";
import { Login } from "./modules/auth/Login";
import { Dashboard } from "./modules/dashboard/Dashboard";
import { Register } from "./modules/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

// Layout de autenticación
export const AuthLayout = () => {
  // Obtener el token de autenticación del estado
  const token = useSelector((state: RootState) => state.auth.token);

  // Si no hay un token, mostrar un mensaje de falta de permisos
  if (!token) {
    return (
      <>
        <h1>No tienes permisos</h1>
      </>
    );
  }

  // Si hay un token, renderizar el contenido de la ruta actual
  return <Outlet />;
};

// Definición de las rutas de la aplicación
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />, // Layout de autenticación para todas las rutas principales
    children: [
      {
        path: "home",
        element: <Dashboard />, // Componente de dashboard
      },
    ],
  },
  {
    path: "login",
    element: <Login />, // Componente de inicio de sesión
  },
  {
    path: "/register",
    element: <Register />, // Componente de registro de usuario
  },
]);
