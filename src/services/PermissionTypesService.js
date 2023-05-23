import axios from 'axios';

const API_BASE_URL = 'https://localhost:7295/api';


export const getPermissionTypes = () => {
  return axios.get(`${API_BASE_URL}/permissionType`);
};

export const createPermissionType = (permissionData) => {
  return axios.post(`${API_BASE_URL}/permissiontype`, permissionData);
};

export const updatePermissionType = (id, permissionData) => {
  return axios.put(`${API_BASE_URL}/permissionType/${id}`, permissionData);
};