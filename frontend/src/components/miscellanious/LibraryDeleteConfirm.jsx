import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRecord } from '../../redux/features/librarySlice';

const LibraryDeleteConfirm = ({ isOpen, onClose, record }) => {
  const user = useSelector(state => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      // Make DELETE request to remove the library record by its _id
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/library/${record._id}`, config);
      
      dispatch(deleteRecord(record._id))
      onClose();
    } catch (error) {
      console.error('Error deleting record:', error)
      toast({
        title: 'Error Occured',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Show a confirmation message including the book name */}
          <Text>
            Are you sure you want to delete this library record?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LibraryDeleteConfirm;
