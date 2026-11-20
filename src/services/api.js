import axios from 'axios';

// En desarrollo, Vite proxy redirige /api a localhost:8080
const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 1. Verificar si es contribuyente del SRI
 * @param {string} identificacion - Cédula (10 dígitos) o RUC (13 dígitos)
 */
export const verificarContribuyente = async (identificacion) => {
  const { data } = await api.get('/contribuyente/verificar', {
    params: { identificacion },
  });
  return data;
};

/**
 * 2. Obtener datos de la persona natural
 * @param {string} identificacion - Cédula o RUC
 */
export const obtenerContribuyente = async (identificacion) => {
  const { data } = await api.get('/contribuyente/info', {
    params: { identificacion },
  });
  return data;
};

/**
 * 3. Obtener datos del vehículo por placa
 * @param {string} placa - Placa del vehículo
 */
export const obtenerVehiculo = async (placa) => {
  const { data } = await api.get('/vehiculo', {
    params: { placa },
  });
  return data;
};

/**
 * 4. Consultar puntos de licencia (con caché)
 * @param {string} cedula - Cédula de 10 dígitos
 * @param {string} placa - Placa del vehículo
 */
export const consultarPuntos = async (cedula, placa) => {
  const { data } = await api.get('/puntos', {
    params: { cedula, placa },
  });
  return data;
};

export default api;
