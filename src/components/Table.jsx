import React, { useState, useEffect } from 'react';
import {
  Table as ChakraTable,
  Grid,
  Divider,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  IconButton,
  Input,
  Flex,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  VStack
} from '@chakra-ui/react';
import { EditIcon, ViewIcon, AddIcon } from '@chakra-ui/icons';

const Table = ({ columns, getPermission, updatePermission, permissionTypes }) => {
  const [tableData, setTableData] = useState([]);
  const [typesOptions, setTypesOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState('');
  const [formValues, setFormValues] = useState({}); // Agregar el estado formValues aquí

  const toast = useToast();

  useEffect(() => {
    fetchData();
    fetchPermissionTypes();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getPermission();
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.log('Error al obtener los datos de la tabla:', error);
    }
  };

  const fetchPermissionTypes = async () => {
    try {
      const response = await permissionTypes();
      const data = response.data;
      setTypesOptions(data);
    } catch (error) {
      console.log('Error al obtener los tipos de permisos:', error);
    }
  };

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setFormValues(item); // Actualizar el estado formValues con los valores de selectedItem
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

  const handleEdit = async () => {
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

      // Llamar al servicio de actualización del permiso
      await updatePermission(selectedItem.id, formValues);

      // Cerrar el modal y actualizar los datos de la tabla
      closeModal();
      fetchData();

      toast({
        title: 'Updated',
        description: 'Record has been successfully updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      closeModal();
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };


  return (
    <Box m='0 auto' mt='16' maxW='1200px'>
      <Flex justify='flex-end' mb='4'>
        <Button
          boxShadow='2xl'
          leftIcon={<AddIcon />}
          colorScheme='green.300'
          bg='green.300'
          size='xs'
          marginBottom={4}
          onClick={() => openModal('Add')}
        >
          Add
        </Button>
      </Flex>
      <ChakraTable boxShadow='xl' variant='striped' colorScheme='gray' size='xs' marginTop={8}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th paddingBottom={2} key={column.field} textAlign='center' fontSize='xs'>
                {column.label}
              </Th>
            ))}
            <Th paddingBottom={2} textAlign='center' fontSize='xs'>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item) => (
            <Tr key={item.id} fontSize='xs'>
              {columns.map((column) => (
                <Td key={column.field} textAlign='center'>
                  {item[column.field]}
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
        </Tbody>
      </ChakraTable>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              {columns.map((column) => (
                <React.Fragment key={column.field}>
                  <Text fontWeight="bold">{column.label}:</Text>
                  {column.field === 'id' ? (
                    <Input
                      rounded='lg'
                      id={column.field}
                      size='sm'
                      placeholder={column.label}
                      value={formValues[column.field] || (selectedItem ? selectedItem[column.field] : '')}
                      onChange={(e) => handleInputChange(column.field, e.target.value)}
                      isReadOnly={modalMode === 'View'}
                      isDisabled={column.field === 'id' && modalMode === 'Edit'}
                    />

                  ) : column.field === 'tipoPermiso' ? (
                    <Select
                      rounded='lg'
                      id={column.field}
                      size='sm'
                      placeholder={column.label}
                      defaultValue={selectedItem ? selectedItem[column.field] : ''}
                      isReadOnly={modalMode === 'View'}
                    >
                      {typesOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.descripcion}
                        </option>
                      ))}
                    </Select>
                  ) : column.field === 'fechaPermiso' ? (
                    <Input
                      rounded='lg'
                      id={column.field}
                      size='sm'
                      type='date'
                      placeholder={`Enter ${column.label}`}
                      defaultValue={selectedItem ? formatDate(selectedItem[column.field]) : ''}
                      onChange={(e) => handleInputChange(column.field, e.target.value)}
                      isReadOnly={modalMode === 'View'}
                    />
                  ) : (
                    <Input
                      rounded='lg'
                      id={column.field}
                      size='sm'
                      placeholder={`Enter ${column.label}`}
                      value={formValues[column.field] || ''}
                      onChange={(e) => handleInputChange(column.field, e.target.value)}
                      isReadOnly={modalMode === 'View'}
                    />
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </ModalBody>

          <ModalFooter>
            {(modalMode === 'Edit' || modalMode === 'Add') && (
              <>
                <Button
                  colorScheme="green.300"
                  bg="green.300"
                  size="sm"
                  onClick={handleEdit}
                >
                  {modalMode === 'Edit' ? 'Save' : 'Add'}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Table;
