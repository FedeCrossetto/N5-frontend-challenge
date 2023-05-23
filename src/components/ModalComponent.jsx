import React from 'react';
import {
    Grid,
    Divider,
    Text,
    Input,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';

const ModalComponent = ({
    title,
    isModalOpen,
    closeModal,
    columns,
    selectedItem,
    modalMode,
    formValues,
    handleInputChange,
    handleSave,
    typesOptions,
}) => {
    const formatDate = (date) => {
        if (!date) return '';
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    return (
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
                                        isDisabled={column.field === 'id' && modalMode === 'Edit' || modalMode === 'Add'}
                                    />
                                ) : column.field === 'tipoPermiso' ? (
                                    <Select
                                        rounded='lg'
                                        id={column.field}
                                        size='sm'
                                        placeholder={column.label}
                                        onChange={(e) => handleInputChange(column.field, e.target.value)}
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
                                onClick={handleSave}
                            >
                                {modalMode === 'Edit' ? 'Save' : 'Add'}
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
