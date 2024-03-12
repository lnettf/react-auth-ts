import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { RegisterI } from "./ts/Register";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  // Estado local para almacenar los datos del formulario
  const [form, setForm] = useState<RegisterI>({
    name: "",
    email: "",
    password: "",
    c_password: "",
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

  // Manejar el envío del formulario de registro
  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(register(form)); // Despachar la acción de registro con los datos del formulario
  };

  return (
    <>
      <h1>Register</h1>
      {/* Mostrar mensaje de error si ocurrió un error de autenticación */}
      {auth.isError && <h1>Error</h1>}
      {/* Mostrar mensaje de carga si se está realizando una solicitud de autenticación */}
      {auth.isLoading && <h1>Loading</h1>}
      {/* Formulario de registro */}
      <form>
        {/* Campos de entrada para nombre, email, contraseña y confirmación de contraseña */}
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
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
        <input
          type="text"
          name="c_password"
          placeholder="c_password"
          onChange={handleChange}
        />
        {/* Botón para enviar el formulario de registro */}
        <button onClick={handleRegister}>register</button>
      </form>
    </>
  );
};
