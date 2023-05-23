import axios from 'axios';

const API_BASE_URL = 'https://localhost:7295/api';

// Obtener todos los tipos de permiso
export const getPermissionTypes = () => {
  return axios.get(`${API_BASE_URL}/permissionType`);
};

// Actualizar un tipo de permiso por ID
export const updatePermissionType = (id, permissionData) => {
  return axios.put(`${API_BASE_URL}/permissionType/${id}`, permissionData);
};