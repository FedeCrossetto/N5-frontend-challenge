import React, { useState, useEffect } from 'react';
import {
  Table as ChakraTable,
  Grid,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack
} from '@chakra-ui/react';
import { EditIcon, ViewIcon, AddIcon } from '@chakra-ui/icons';

const Table = ({ columns, fetchFn }) => {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchFn();
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.log('Error al obtener los datos de la tabla:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box m='0 auto' mt='16' maxW='1200px'>
        <Flex justify='flex-end' mb='4'>
          <Button
            boxShadow='2xl'
            leftIcon={<AddIcon />}
            colorScheme='green.300'
            bg='green.300'
            size='xs'
            marginBottom={4}
            onClick={openModal} // Abrir el modal al hacer clic en el botón "Add"
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
                    />
                    <IconButton
                      aria-label='See permission'
                      icon={<ViewIcon />}
                      size='xs'
                      colorScheme='yellow.300'
                      bg='yellow.300'
                      m={2}
                      _hover={{ bg: 'yellow.500' }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>

        {/* Modal */}
              <Modal isOpen={isModalOpen} onClose={closeModal} size='xl' isCentered>
                  <ModalOverlay />
                  <ModalContent>
                      <ModalHeader>Add Item</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                              {columns.map((column) => (
                                  <React.Fragment key={column.field}>
                                      <Text fontWeight="bold">{column.label}:</Text>
                                      <Input size="sm" placeholder={`Enter ${column.label}`} />
                                  </React.Fragment>
                              ))}
                          </Grid>
                      </ModalBody>
                      <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={closeModal}>
                              Close
                          </Button>
                          <Button colorScheme='green'>Add</Button>
                      </ModalFooter>
                  </ModalContent>
              </Modal>
      </Box>
    </>
  );
};

export default Table;
