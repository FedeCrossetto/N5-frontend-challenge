import React, { useState, useEffect } from 'react';
import * as API from '../services/PermissionsService';
import Table from '../components/Table';
import * as APITYPES from '../services/PermissionTypesService';


const columns = [
  { field: 'id', label: 'Id' },
  { field: 'nombreEmpleado', label: 'Employee name' },
  { field: 'apellidoEmpleado', label: 'Employee last name' },
  { field: 'tipoPermiso', label: 'Permission type' },
  { field: 'fechaPermiso', label: 'Permission date' },
];

const PermissionsTable = () => {
  const [permissions, setPermissions] = useState([]);

  return (
    <Table columns={columns} getPermission={API.getPermissions} updatePermission={API.updatePermission} permissionTypes={APITYPES.getPermissionTypes} />
  )
}
export default PermissionsTable;
