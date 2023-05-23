import React, { useState, useEffect } from 'react';
import { Table as ChakraTable, Button, useToast, Box, Flex, Thead, Tr, Th, Tbody, Td, IconButton } from '@chakra-ui/react';
import { EditIcon, ViewIcon, AddIcon } from '@chakra-ui/icons';
import ModalComponent from './ModalComponent';

const Table = ({ columns, getPermission, updatePermission, createPermission, permissionTypes }) => {
  const [data, setData] = useState({
    tableData: [],
    typesOptions: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState('');
  const [formValues, setFormValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const toast = useToast();

  useEffect(() => {
    fetchData();
    fetchPermissionTypes();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getPermission();
      const data = response.data;
      setData((prevData) => ({
        ...prevData,
        tableData: data,
      }));
    } catch (error) {
      console.log('Error al obtener los datos de la tabla:', error);
    }
  };

  const fetchPermissionTypes = async () => {
    try {
      const response = await permissionTypes();
      const data = response.data;
      setData((prevData) => ({
        ...prevData,
        typesOptions: data,
      }));
    } catch (error) {
      console.log('Error al obtener los tipos de permisos:', error);
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setSelectedItem(item);
    setFormValues(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const title = modalMode === 'Add' ? 'Add Item' : modalMode === 'Edit' ? 'Edit Item' : 'View Item';

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const isAnyFieldEmpty = columns.some((column) => {
        return column.field !== 'id' && (!formValues[column.field] || /^\s*$/.test(formValues[column.field]));
      });

      if (isAnyFieldEmpty) {
        toast({
          title: 'Error',
          description: 'Please fill in all fields',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setIsSaving(true);

      if (modalMode === 'Edit') {
        await updatePermission(selectedItem.id, formValues);
        toast({
          title: 'Updated',
          description: 'Record has been successfully updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else if (modalMode === 'Add') {
        await createPermission(formValues);
        toast({
          title: 'Added',
          description: 'Record has been successfully added',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      closeModal();
      fetchData();
    } catch (error) {
      closeModal();
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box m='0 auto' mt='16' maxW='1200px'>
      <Flex justify='flex-end' mb='4'>
        <Button
          boxShadow="2xl"
          leftIcon={<AddIcon />}
          colorScheme="green.300"
          bg="green.300"
          size="xs"
          marginBottom={4}
          onClick={() => openModal('Add')}
          isLoading={isSaving}
          loadingText="Adding"
        >
          Add
        </Button>
      </Flex>
      <ChakraTable boxShadow='xl' variant='striped' colorScheme='gray' size='xs' marginTop={8}>
        <Thead>
          <Tr>
            {columns.map(({ field, label }) => (
              <Th paddingBottom={2} key={field} textAlign='center' fontSize='xs'>
                {label}
              </Th>
            ))}
            <Th paddingBottom={2} textAlign='center' fontSize='xs'>
              Actions
            </Th>
          </Tr>
        </Thead>
        {data.tableData.length === 0 ? (
          <Tbody>
            <Tr>
              <Td colSpan={columns.length + 1} textAlign="center" fontSize="sm" color="gray.500">
                Table empty
              </Td>
            </Tr>
          </Tbody>
        ) :
          <Tbody>

            {data.tableData.map((item) => (
              <Tr key={item.id} fontSize='xs'>
                {columns.map(({ field }) => (
                  <Td key={field} textAlign='center'>
                    {item[field]}
                  </Td>
                ))}
                <Td textAlign='center' verticalAlign='middle'>
                  <Flex justify='center' align='center' h='100%'>
                    <IconButton
                      aria-label='Editar'
                      icon={<EditIcon />}
                      size='xs'
                      colorScheme='purple.300'
                      bg='purple.300'
                      _hover={{ bg: 'purple.500' }}
                      onClick={() => openModal('Edit', item)}
                    />
                    <IconButton
                      aria-label='Ver'
                      icon={<ViewIcon />}
                      size='xs'
                      colorScheme='yellow.300'
                      bg='yellow.300'
                      m={2}
                      _hover={{ bg: 'yellow.500' }}
                      onClick={() => openModal('View', item)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>}
      </ChakraTable>

      <ModalComponent
        title={title}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        columns={columns}
        selectedItem={selectedItem}
        modalMode={modalMode}
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        typesOptions={data.typesOptions}
      />
    </Box>
  );
};

export default Table;
