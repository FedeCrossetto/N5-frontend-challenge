import React, { useState, useEffect } from 'react';
import { ChakraProvider, Thead, Tbody, Tr, Th, Td, Box, Text, IconButton, VStack, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import Table from '../components/Table';
import * as API  from '../services/PermissionTypesService';

const columns = [
  { field: 'id', label: 'Id' },
  { field: 'descripcion', label: 'Description' },
];


const PermissionTypesTable = () => {

  return (
    <Table columns={columns} getPermission={API.getPermissionTypes} updatePermission={API.updatePermissionType} />
  )
}
export default PermissionTypesTable;
