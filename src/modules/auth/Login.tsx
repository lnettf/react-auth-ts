import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { RegisterI } from "./ts/Register";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // Estado local para almacenar los datos del formulario de inicio de sesión
  const [form, setForm] = useState<Partial<RegisterI>>({
    email: "",
    password: "",
  });

  // Acceso al estado y a la función de despacho de Redux
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Efecto para redirigir al usuario a la página de inicio si ya está autenticado
  useEffect(() => {
    if (auth.token) {
      navigate("/home");
    }
  }, [auth.token]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario de inicio de sesión
  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(login(form)); // Despachar la acción de inicio de sesión con los datos del formulario
  };

  return (
    <>
      <h1>Login</h1>
      {/* Mostrar mensaje de error si ocurrió un error de autenticación */}
      {auth.isError && <h1>Error</h1>}
      {/* Mostrar mensaje de carga si se está realizando una solicitud de autenticación */}
      {auth.isLoading && <h1>Loading</h1>}
      {/* Formulario de inicio de sesión */}
      <form>
        {/* Campos de entrada para email y contraseña */}
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        {/* Botón para enviar el formulario de inicio de sesión */}
        <button onClick={handleRegister}>login</button>
      </form>
    </>
  );
};
