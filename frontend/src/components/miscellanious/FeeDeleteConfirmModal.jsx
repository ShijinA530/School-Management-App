import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFee } from '../../redux/features/feesSlice';

const FeeDeleteConfirmModal = ({ isOpen, onClose, fee }) => {
  const user = useSelector(state => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleDelete = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/fees/${fee._id}`, config);
      
      dispatch(deleteFee(fee._id))
      onClose();
    } catch (err) {
      console.error('Error deleting fee remark:', err);
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
    <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this fee remark? This action cannot be undone.</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>Delete</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeeDeleteConfirmModal;
