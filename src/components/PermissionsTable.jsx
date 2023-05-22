import React, { useState, useEffect } from 'react';
import { ChakraProvider, Thead, Tbody, Tr, Th, Td, Box, Text, IconButton, VStack, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { EditIcon, ViewIcon, AddIcon } from '@chakra-ui/icons';
import * as API from '../services/PermissionsService';
import Table from '../components/Table';

const columns = [
  { field: 'id', label: 'Id' },
  { field: 'nombreEmpleado', label: 'Employee name' },
  { field: 'apellidoEmpleado', label: 'Employee last name' },
  { field: 'tipoPermiso', label: 'Permission type' },
  { field: 'fechaPermiso', label: 'Permission date' },
];



const PermissionsTable = () => {
  const [permissions, setPermissions] = useState([]);

  // useEffect(() => {
  //   fetchPermissions();
  // }, []);

  // const fetchPermissions = async () => {
  //   try {
  //     const response = await getPermissions();
  //     const data = response.data;
  //     setPermissions(data);
  //   } catch (error) {
  //     console.log('Error al obtener los permisos:', error);
  //   }
  // };

  return (
    <Table columns={columns} fetchFn={API.getPermissions} />
  )
}
export default PermissionsTable;
