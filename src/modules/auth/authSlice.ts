import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterI } from "./ts/Register";

export interface User {
  name: string;
  email: string;
  id: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
}

// Estado inicial de autenticación
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null, // Obtener el token del almacenamiento local
  isLoading: false,
  isError: false,
};

// Acción asíncrona para registrar un usuario
export const register = createAsyncThunk(
  "auth/register",
  async (userRegister: RegisterI, thunkApi) => {
    // Realizar la solicitud de registro al servidor
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register",
      userRegister
    );

    // Verificar si se recibió un token en la respuesta
    if (response.data?.data?.token) {
      const { token, user } = response.data.data;

      // Almacenar el token en el almacenamiento local
      localStorage.setItem("token", token);

      // Devolver el token y el usuario registrado
      return {
        token,
        user,
      };
    }

    // Devolver un error si no se recibió un token en la respuesta
    return thunkApi.rejectWithValue("error");
  }
);

// Acción asíncrona para iniciar sesión
export const login = createAsyncThunk(
  "auth/login",
  async (userLogin: Partial<RegisterI>, thunkApi) => {
    // Realizar la solicitud de inicio de sesión al servidor
    const response = await axios.post(
      "http://127.0.0.1:8000/api/login",
      userLogin
    );

    // Verificar si se recibió un token en la respuesta
    if (response.data.data.token) {
      const { token, user } = response.data.data;

      // Almacenar el token en el almacenamiento local
      localStorage.setItem("token", token);

      // Devolver el token y el usuario autenticado
      return {
        token,
        user,
      };
    }

    // Devolver un error si no se recibió un token en la respuesta
    return thunkApi.rejectWithValue("error");
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      state.isLoading = false;
    });

    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      state.isLoading = false;
    });

    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
