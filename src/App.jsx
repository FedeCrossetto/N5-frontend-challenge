import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PermissionsTable from './components/PermissionsTable';
import PermissionTypesTable from './components/PermissionTypesTable';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/permissions-table" element={<PermissionsTable />} />
        <Route path="/permission-types-table" element={<PermissionTypesTable />} />
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App
