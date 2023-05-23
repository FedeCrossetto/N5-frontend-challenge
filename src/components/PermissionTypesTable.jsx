import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import * as API from '../services/PermissionTypesService';

const columns = [
  { field: 'id', label: 'Id' },
  { field: 'descripcion', label: 'Description' },
];

const PermissionTypesTable = () => {

  return (
    <Table
      columns={columns}
      getPermission={API.getPermissionTypes}
      updatePermission={API.updatePermissionType}
      createPermission={API.createPermissionType}
    />
  )
}
export default PermissionTypesTable;
