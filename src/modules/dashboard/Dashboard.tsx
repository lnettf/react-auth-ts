import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { logOut } from "../auth/authSlice";

export interface Product {
  created_at: string;
  detail: string;
  id: number;
  name: string;
  updated_at: string;
}

export const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        // Realizar la solicitud GET al servidor para obtener los productos(axios envia el token del usuario)
        const response = await axios.get("http://localhost:8000/api/products");
        // Establecer el estado de los productos con los datos recibidos del servidor
        setProducts(response.data.data);
      } catch (error) {
        // Manejar errores de la solicitud GET
        console.error("Error fetching products:", error);
      }
    };
    // Llamar a la función para obtener los productos al cargar el componente
    getProducts();
  }, []);

  const handleClose = async () => {
    await dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleClose}>cerrar sesión</button>
      {products.map((product) => {
        return (
          <p key={product.id}>
            {product.id} - {product.name}
          </p>
        );
      })}
    </>
  );
};
