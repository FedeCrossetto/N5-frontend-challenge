import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import * as API from '../services/PermissionsService';
import * as APITYPES from '../services/PermissionTypesService';


const columns = [
  { field: 'id', label: 'Id' },
  { field: 'nombreEmpleado', label: 'Employee name' },
  { field: 'apellidoEmpleado', label: 'Employee last name' },
  { field: 'tipoPermiso', label: 'Permission type' },
  { field: 'fechaPermiso', label: 'Permission date' },
];

const PermissionsTable = () => {
  return (
    <Table
      columns={columns}
      getPermission={API.getPermissions}
      updatePermission={API.updatePermission}
      createPermission={API.createPermission}
      permissionTypes={APITYPES.getPermissionTypes}
    />
  )
}
export default PermissionsTable;
