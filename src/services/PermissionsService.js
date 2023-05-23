import axios from 'axios';

const API_BASE_URL = 'https://localhost:7295/api';

// Obtener todos los permisos
export const getPermissions = () => {
  return axios.get(`${API_BASE_URL}/permission`);
};

// Obtener un permiso por ID
export const getPermissionById = (id) => {
  return axios.get(`${API_BASE_URL}/permission/${id}`);
};

// Crear un permiso
export const createPermission = (permissionData) => {
  return axios.post(`${API_BASE_URL}/permission`, permissionData);
};

// Actualizar un permiso por ID
export const updatePermission = (id, permissionData) => {
  return axios.put(`${API_BASE_URL}/permission/${id}`, permissionData);
};