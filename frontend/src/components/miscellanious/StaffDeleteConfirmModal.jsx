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
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaff } from '../../redux/features/staffSlice';
import axios from 'axios'

const StaffDeleteConfirmModal = ({ isOpen, onClose, staff }) => {
  const user = useSelector(state => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/staff/${id}`, config);
      dispatch(deleteStaff(id))
      onClose();
    } catch (err) {
      console.error('Error deleting staff member:', err)
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
        <ModalHeader>Delete Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete the account for <strong>{staff.name}</strong>?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={() => handleDelete(staff._id)}>
            Delete
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StaffDeleteConfirmModal;
